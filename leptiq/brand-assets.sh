#!/usr/bin/env bash
# Replaces Proton's app icons in a WebClients checkout with the Leptiq mark.
# Needs rsvg-convert and ImageMagick (`magick`).
#
#   leptiq/brand-assets.sh .
set -euo pipefail
WC="${1:?path to WebClients checkout}"
HERE="$(cd "$(dirname "$0")" && pwd)"
MARK="$HERE/assets/leptiq-mark-cropped.svg"
GRAY="$HERE/assets/leptiq-mark-gray.svg"

png() { rsvg-convert -w "$2" -h "$2" "$1" -o "$3"; }

# Web app favicons (built into all icon sizes by proton-pack).
for app in account pass drive lumo; do
    cp "$MARK" "$WC/applications/$app/src/favicon.svg"
done
for app in account drive; do
    # Maskable icon: the mark on a dark square with padding.
    cat > "$WC/applications/$app/src/icon-maskable.svg" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#1B1340"/><image href="data:image/svg+xml;base64,$(base64 -w0 "$MARK")" x="96" y="96" width="320" height="320"/></svg>
SVG
done
png "$MARK" 512 "$WC/applications/lumo/public/favicon.png"
[ -f "$WC/applications/lumo/public/favicon.svg" ] && cp "$MARK" "$WC/applications/lumo/public/favicon.svg"

# Browser extension toolbar and in-page icons.
EXT="$WC/applications/pass-extension/public/assets"
for s in 16 32 48 128; do
    png "$MARK" "$s" "$EXT/protonpass-icon-$s.png"
    png "$MARK" "$s" "$EXT/protonpass-beta-icon-$s.png"
done
for s in 16 32; do
    for state in disabled locked offline; do png "$GRAY" "$s" "$EXT/protonpass-icon-$s-$state.png"; done
done
for f in protonpass-icon.svg protonpass-icon-active.svg protonpass-icon-24.svg protonpass-logo.svg; do
    cp "$MARK" "$EXT/$f"
done
for f in protonpass-icon-disabled.svg protonpass-icon-locked.svg protonpass-icon-locked-dropdown.svg protonpass-icon-locked-dropdown-light.svg; do
    cp "$GRAY" "$EXT/$f"
done

# Shared images (Pass lobby icon...).
cp "$MARK" "$WC/packages/styles/assets/img/pass/protonpass-icon.svg"

# Lumo ("Leptiq Assistant") logos: glyph-only files get the mark, wordmarks get
# the mark plus "Leptiq Assistant" (white text in the -dark variants).
LUMO="$WC/packages/styles/assets/img/lumo"
python3 - "$MARK" "$LUMO" <<'PY'
import re, sys, os
mark, lumo = sys.argv[1], sys.argv[2]
src = open(mark).read()
inner = re.search(r'<svg[^>]*>(.*)</svg>', src, re.S).group(1)
glyph = lambda x, y, size: f'<svg x="{x}" y="{y}" width="{size}" height="{size}" viewBox="328 344 540 540">{inner}</svg>'
def wordmark(color):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 64" width="300" height="64">'
            + glyph(0, 0, 64)
            + f'<text x="74" y="42" fill="{color}" font-family="Inter, system-ui, sans-serif" font-size="30">'
            + '<tspan font-weight="700">Leptiq</tspan><tspan font-weight="400"> Assistant</tspan></text></svg>')
for name in os.listdir(lumo):
    path = os.path.join(lumo, name)
    if not name.endswith('.svg'):
        continue
    if name in ('lumo-cat-icon.svg', 'lumo-cat-logo-v5.svg', 'lumo-cat-main.svg') or re.match(r'lumo-logo-v\d', name, re.I):
        open(path, 'w').write(src)
    elif name.startswith(('lumo-logo-wordmark', 'lumo-logo-full', 'lumo-business-logo')):
        open(path, 'w').write(wordmark('#FFFFFF' if 'dark' in name else '#1B1340'))
PY

# Authenticator desktop (Tauri) icons.
ICONS="$WC/applications/authenticator/src-tauri/icons"
if [ -d "$ICONS" ]; then
    for f in "$ICONS"/*.png; do
        n=$(basename "$f"); size=$(magick identify -format '%w' "$f")
        png "$MARK" "$size" "$f"
    done
    tmp=$(mktemp -d)
    for s in 16 32 48 64 128 256; do png "$MARK" "$s" "$tmp/$s.png"; done
    magick "$tmp"/16.png "$tmp"/32.png "$tmp"/48.png "$tmp"/64.png "$tmp"/128.png "$tmp"/256.png "$ICONS/icon.ico"
    png "$MARK" 1024 "$tmp/1024.png"
    magick "$tmp/1024.png" "$ICONS/icon.icns" 2>/dev/null || cp "$tmp/1024.png" "$ICONS/icon.png"
    rm -rf "$tmp"
fi
echo "Leptiq icons applied to $WC"
