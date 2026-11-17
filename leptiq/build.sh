#!/usr/bin/env bash
# Builds the Leptiq web clients for your domain.
#
#   DOMAIN=example.com leptiq/build.sh                        # account, pass, pass-extension
#   DOMAIN=example.com APPS="account pass drive" leptiq/build.sh
#   DOMAIN=example.com APPS=pass-extension BUILD_TARGET=firefox leptiq/build.sh
#   DOMAIN=example.test:8443 leptiq/build.sh                  # local setup with a port
#
# Apps: account (login/signup; every other app needs it), pass, pass-extension,
# authenticator, drive, lumo. Each is built into applications/<app>/dist.
set -euo pipefail

: "${DOMAIN:?set DOMAIN, e.g. DOMAIN=example.com}"
cd "$(dirname "$0")/.."
TARGET="${BUILD_TARGET:-chrome}"
APPS="${APPS:-account pass pass-extension}"
PNPM="npx -y pnpm@$(sed -n 's/.*"packageManager": "pnpm@\([^"]*\)".*/\1/p' package.json)"

filters=()
for app in $APPS; do
    case "$app" in
        account) filters+=(--filter 'proton-account...') ;;
        pass) filters+=(--filter 'proton-pass...') ;;
        pass-extension) filters+=(--filter 'proton-pass-extension...') ;;
        authenticator) filters+=(--filter 'proton-authenticator...') ;;
        drive) filters+=(--filter 'proton-drive...') ;;
        lumo) filters+=(--filter 'proton-lumo...') ;;
        *) echo "unknown app: $app" >&2; exit 1 ;;
    esac
done
CI=true $PNPM install --frozen-lockfile "${filters[@]}"

export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=8192}" NODE_ENV=production

# Web apps are served at <app>.$DOMAIN with the API on the same origin (/api).
web_build() {
    (cd "applications/$1" && TS_NODE_PROJECT=../../tsconfig.webpack.json \
        npx proton-pack build --appMode=sso --api=/api "${@:2}")
}

for app in $APPS; do
    case "$app" in
        account) web_build account ;;
        pass) web_build pass --noLogicalScss ;;
        drive) web_build drive ;;
        lumo) web_build lumo ;;
        authenticator)
            (cd applications/authenticator && API_ENV="$DOMAIN" npx webpack --config webpack.config.ts) ;;
        pass-extension)
            (
                cd applications/pass-extension
                rm -rf dist
                API_ENV="$DOMAIN" BUILD_TARGET="$TARGET" npx webpack --config webpack.config.ts
                # Manifest match patterns may not contain ports.
                case "$DOMAIN" in
                    *:*) sed -i "s#${DOMAIN//./\\.}/\\*#${DOMAIN%%:*}/*#g" dist/manifest.json ;;
                esac
            ) ;;
    esac
    echo "built $app: applications/$app/dist"
done
