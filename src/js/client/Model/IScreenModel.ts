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

        private _entities: IEntityModel[] = [];

        public get entities(): IEntityModel[] {
            return this._entities;
        }

    
        public static parse(screenModelData: IScreenModelJsonDefinition): Q.Promise<IScreenModel> {
            var id = 0;
            var ret = new ScreenModel();

            var entities = [];
            for(var prop in screenModelData.entities) {
                if(screenModelData.entities.hasOwnProperty(prop)) {

                    var ent: IEntityModel = {
                        id: id.toString(),
                        parentId: null,
                        name: prop,
                        components: []
                    }
                    entities.push(ent);
                    id++;
                }
            }
            ret._entities = entities;

            return Q.when(ret);
        }
    }
}
