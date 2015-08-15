/// <reference path="../_references.ts" />
/// <reference path="IScreenModel.ts" />

module Extropy.Model {
    export interface IGameModel {
        initialScreen: IScreenModel;
        screens: IScreenModel[];
    }

    export class GameModel {
    
        public static parse(json: string): IGameModel {
            return null;
        }
    }
}
