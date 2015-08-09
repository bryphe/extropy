/// <reference path="../_references.ts" />
/// <reference path="IPropertyModel.ts" />

module Extropy.Model {
    export interface IComponentModel {
        constructorFunction: string;
        properties: HashTable<IPropertyModel>;
    }
}
