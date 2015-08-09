
module Extropy.Entity {

    export interface IEntityDefinitionInstantiator {

        createEntityByType(entityManager: Extropy.Entity.BaseEntityManager, entityType: string, parent?: Extropy.Entity.Entity): Extropy.Entity.Entity;
    }


    export class EntityDefinitionInstantiator implements IEntityDefinitionInstantiator {

        private _typeToEntity: HashTable<Extropy.Entity.IEntityDefinition> = Object.create(null);

        public createEntityByType(entityManager: Extropy.Entity.BaseEntityManager, entityType: string, parent?: Extropy.Entity.Entity): Extropy.Entity.Entity {
            var ent = entityManager.createEntity("entity");

            if(parent)
                ent.parent = parent;

            var definition = this._typeToEntity[entityType];
            this._populateEntityFromDefinition(ent, definition);

            return ent;
        }

        public createEntityByDefinition(entityManager: Extropy.Entity.BaseEntityManager, definition: Extropy.Entity.IEntityDefinition, parent?: Extropy.Entity.Entity): Extropy.Entity.Entity {
            var ent = entityManager.createEntity("entity");

            if (parent)
                ent.parent = parent;

            this._populateEntityFromDefinition(ent, definition);

            return ent;
        }


        public registerDefinition(entityDefinition: Extropy.Entity.IEntityDefinition): void {
            assert(!this._typeToEntity[entityDefinition.entityType]);

            this._typeToEntity[entityDefinition.entityType] = entityDefinition;
        }

        private _populateEntityFromDefinition(entity: Extropy.Entity.Entity, definition: Extropy.Entity.IEntityDefinition): void {

            if (!definition)
                return;

            this._addComponentsToEntity(entity, this.getComponentsForEntity(entity, definition));

        }

        private _addComponentsToEntity(entity: Extropy.Entity.Entity, components: Extropy.Entity.IComponentDefinition[]): void {

            components.forEach((componentDefinition) => {
                var component = <Extropy.Entity.Component>createFromConstructorFunction(componentDefinition.name);
                entity.addComponent(component);
            });
        }

        protected /* abstract */ getComponentsForEntity(entity: Extropy.Entity.Entity, definition: Extropy.Entity.IEntityDefinition): Extropy.Entity.IComponentDefinition[] {
            assertAbstract();
            return null;
        }
    }

    export class ServerEntityDefinitionInstantiator extends EntityDefinitionInstantiator {
        protected /* override */ getComponentsForEntity(entity: Extropy.Entity.Entity, definition: Extropy.Entity.IEntityDefinition): Extropy.Entity.IComponentDefinition[] {
            return definition.commonComponents.concat(definition.serverComponents);
        }
    }

    export class ClientEntityDefinitionInstantiator extends EntityDefinitionInstantiator {
        protected /* override */ getComponentsForEntity(entity: Extropy.Entity.Entity, definition: Extropy.Entity.IEntityDefinition): Extropy.Entity.IComponentDefinition[] {
            return definition.commonComponents.concat(definition.clientComponents);
        }
    }
}
