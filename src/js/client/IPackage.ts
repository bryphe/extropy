/// <reference path="_references.ts" />
/// <reference path="IO/IFile.ts" />

module Extropy {

    /*
     * General abstraction for a package
     */
    export interface IPackage {

        getFileNames(): string[];

        getFile(fileName: string): Q.Promise<IFile>
    }
}
