/// <reference path="_references.ts" />

module Extropy {

    export interface IGamePackage {

        load(): Q.Promise<Model.IGameModel>;
    }
}
