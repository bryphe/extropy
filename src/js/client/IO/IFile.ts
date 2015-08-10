/// <reference path="../_references.ts" />

module Extropy {

    export interface IFile {

        readTextAsync(): Q.Promise<string>;

        readArrayBufferAsync(): Q.Promise<ArrayBuffer>;
    }
}
