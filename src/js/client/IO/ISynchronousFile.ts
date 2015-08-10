/// <reference path="../_references.ts" />
/// <reference path="IFile.ts" />

module Extropy {

    export interface ISynchronousFile extends IFile {

        readTextSync(): string;

        readArrayBufferSync(): ArrayBuffer;
    }
}
