/// <reference path="../_references.ts" />
/// <reference path="IScreenModel.ts" />

module Extropy.Model {
    export interface IGameModel {
        initialScreen: IScreenModel;
        screens: IScreenModel[];
    }
}
