
module Extropy.Entity {
    export interface IEntityDefinition {
        entityType: string;
        commonComponents: IComponentDefinition[];
        serverComponents: IComponentDefinition[];
        clientComponents: IComponentDefinition[];

    }

    export interface IComponentDefinition {
        name: string;

    }
}