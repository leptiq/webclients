// Leptiq stub typings: permissive, the engine is unavailable at runtime.
/* eslint-disable @typescript-eslint/no-explicit-any */
declare class Stub {
    constructor(...args: any[]);
    [key: string]: any;
    static [key: string]: any;
}

export default function init(...args: any[]): Promise<any>;
export declare function initSync(...args: any[]): any;
export declare function setPanicHook(): void;
export declare function enableTracing(...args: any[]): void;

export declare class Engine extends Stub {}
export declare class Document extends Stub {}
export declare class Value extends Stub {}
export declare class Expression extends Stub {}
export declare class Func extends Stub {}
export declare class TermValue extends Stub {}
export declare class Query extends Stub {}
export declare class SerDes extends Stub {}
export declare class Cached extends Stub {}
export declare class Cleanup extends Stub {}
export declare class Write extends Stub {}
export declare class Execution extends Stub {}
export declare class TextIndex extends Stub {}
export declare class TrigramCache extends Stub {}
export declare class ProcessorConfig extends Stub {}

export declare const CleanupEventKind: any;
export type CleanupEventKind = any;
export declare const ExportEventKind: any;
export type ExportEventKind = any;
export declare const QueryEventKind: any;
export type QueryEventKind = any;
export declare const WriteEventKind: any;
export type WriteEventKind = any;

export type CleanupEvent = any;
export type ExportEvent = any;
export type QueryEvent = any;
export type WriteEvent = any;
export type Entry = any;
export type FoundEntry = any;
export type InitOutput = any;
export type CollectionStats = any;
