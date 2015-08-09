/// <reference path="IComponentModel.ts" />

module Extropy.Model {
    export interface IEntityModel {
        id: string;
        parentId: string;
        name: string;

        components: IComponentModel[];
    }
}
