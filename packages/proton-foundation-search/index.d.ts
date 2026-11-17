// Leptiq stub typings: permissive, the engine is unavailable at runtime.
/* eslint-disable @typescript-eslint/no-explicit-any */
// Any member: callable with or without type arguments, or used as a value.
declare class Stub {
    constructor(...args: any[]);
    [key: string]: any;
    // Results the apps iterate with typed callbacks.
    rank(...args: any[]): any[];
    attribute(...args: any[]): any[];
}

export default function init(...args: any[]): Promise<any>;
export declare function initSync(...args: any[]): any;
export declare function setPanicHook(): void;
export declare function enableTracing(...args: any[]): void;

export declare class Engine extends Stub {
    static [key: string]: any;
}
export declare class Document extends Stub {
    static [key: string]: any;
}
export declare class Value extends Stub {
    static [key: string]: any;
}
export declare class Expression extends Stub {
    static [key: string]: any;
}
export declare class Func extends Stub {
    static [key: string]: any;
}
export declare class TermValue extends Stub {
    static [key: string]: any;
}
export declare class Query extends Stub {
    static [key: string]: any;
}
export declare class SerDes extends Stub {
    static [key: string]: any;
}
export declare class Cached extends Stub {
    static [key: string]: any;
}
export declare class Cleanup extends Stub {
    static [key: string]: any;
}
export declare class Write extends Stub {
    static [key: string]: any;
}
export declare class Execution extends Stub {
    static [key: string]: any;
}
export declare class TextIndex extends Stub {
    static [key: string]: any;
}
export declare class TrigramCache extends Stub {
    static [key: string]: any;
}
export declare class ProcessorConfig extends Stub {
    static [key: string]: any;
}

export declare const CleanupEventKind: any;
export type CleanupEventKind = any;
export declare const ExportEventKind: any;
export type ExportEventKind = any;
export declare const QueryEventKind: any;
export type QueryEventKind = any;
export declare const WriteEventKind: any;
export type WriteEventKind = any;

export declare class CleanupEvent extends Stub {
    static [key: string]: any;
}
export declare class ExportEvent extends Stub {
    static [key: string]: any;
}
export declare class QueryEvent extends Stub {
    static [key: string]: any;
}
export declare class WriteEvent extends Stub {
    static [key: string]: any;
}
export declare class Entry extends Stub {
    static [key: string]: any;
}
export declare class FoundEntry extends Stub {
    static [key: string]: any;
}
export declare class InitOutput extends Stub {
    static [key: string]: any;
}
export declare class CollectionStats extends Stub {
    static [key: string]: any;
}
