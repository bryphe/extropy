/// <reference path="../_references.ts" />
/// <reference path="IEntityModel.ts" />

module Extropy.Model {
    export interface IScreenModel {
        entities: IEntityModel[];
    }

    export interface IScreenModelJsonDefinition {
        name: string;
        resolution: string;

        entities: any;

    }

    export class ScreenModel {

        public get entities(): IEntityModel[] {
            return [];
        }
    
        public static parse(screenModelData: IScreenModelJsonDefinition): Q.Promise<IScreenModel> {
            return Q.when(new ScreenModel());
        }
    }
}
