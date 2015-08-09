module Extropy.Entity {

    export interface IEntityFactory {
        create(name: string, parentEntity?: Entity): IEntityCreateResult;
        createFromPrefab(prefabName: string, name: string, parentEntity?: Entity): IEntityCreateResult;
    }
}

