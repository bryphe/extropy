/// <reference path="../_references.ts" />

module Extropy.Model {
    export interface IComponentModel {
        constructorFunction: string;
        properties: HashTable<string>;
    }
}
