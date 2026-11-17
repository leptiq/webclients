// Leptiq stub: Proton's search engine (@proton/proton-foundation-search) is
// only on Proton's internal registry. Everything that would start the engine
// throws, so the apps' search features report themselves unavailable.
const unavailable = () => {
    throw new Error('Local search is not available in Leptiq builds');
};

class Stub {
    constructor() {
        unavailable();
    }
    static __leptiqStub = true;
}

const handler = { get: (_t, prop) => (prop === '__esModule' ? true : String(prop)) };
const enumStub = () => new Proxy({}, handler);

export default function init() {
    return Promise.reject(new Error('Local search is not available in Leptiq builds'));
}
export const initSync = unavailable;
export const setPanicHook = () => {};
export const enableTracing = () => {};

export class Engine extends Stub {
    static builder() {
        return unavailable();
    }
    static restore() {
        return unavailable();
    }
}
export class Document extends Stub {}
export class Value extends Stub {}
export class Expression extends Stub {}
export class Func extends Stub {}
export class TermValue extends Stub {}
export class Query extends Stub {}
export class SerDes extends Stub {}
export class Cached extends Stub {}
export class Cleanup extends Stub {}
export class Write extends Stub {}
export class Execution extends Stub {}
export class TextIndex extends Stub {}
export class TrigramCache extends Stub {}
export class ProcessorConfig extends Stub {}

export const CleanupEventKind = enumStub();
export const ExportEventKind = enumStub();
export const QueryEventKind = enumStub();
export const WriteEventKind = enumStub();
