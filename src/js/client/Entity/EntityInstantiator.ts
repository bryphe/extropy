/// <reference path="../_references.ts" />
/// <reference path="EntityManager.ts" />
/// <reference path="../Model/IEntityModel.ts" />

module Extropy {

    export class EntityInstantiator {

        constructor(entityManager: Extropy.Entity.EntityManager, useExistingIds?: boolean) {
            this._useExistingIds = !!useExistingIds;
            this._entityManager = entityManager;
        }

        private _entityManager: Extropy.Entity.EntityManager;
        private _useExistingIds: boolean;
        private _idMappings: HashTable<string> = Object.create(null);

        public createEntityFromModel(entity: Model.IEntityModel, parentEntity: Entity.Entity): Entity.Entity {
            
            return this.createEntityFromModels([entity], parentEntity);
        }

        public createEntityFromModels(entities: Model.IEntityModel[], parentEntity: Entity.Entity): Entity.Entity {

            var ret;
            // Create entities
            for (var i = 0; i < entities.length; i++) {
                var ent = this._createEntityFromModel(entities[i]);

                if (i === 0)
                    ret = ent;
            }

            // Set parent relationships
            for (i = 0; i < entities.length; i++) {
                this._setParentRelationship(entities[i], parentEntity);
            }

            // Set components
            for (i = 0; i < entities.length; i++) {
                this._initializeComponents(entities[i]);
            }

            return ret;
        }

        private _createEntityFromModel(entModel: Model.IEntityModel) {

            var ent;
            if (this._useExistingIds) {
                ent = this._entityManager.createEntity(entModel.name, entModel.id);
                assert(ent.id == entModel.id);
            } else {
                ent = this._entityManager.createEntity(entModel.name);
            }

            this._idMappings[entModel.id] = ent.id;
            return ent;
        }

        private _setParentRelationship(entModel: Model.IEntityModel, defaultParentEnt: Entity.Entity) {

            var mappedId = this._idMappings[entModel.id];
            var entity = this._entityManager.getEntityById(mappedId);

            if (!isNullOrUndefined(entModel.parentId)) {

                var mappedParentId = this._idMappings[entModel.parentId];
                var parentEnt = this._entityManager.getEntityById(mappedParentId);
                entity.parent = parentEnt;
            } else {
                entity.parent = defaultParentEnt;
            }
        }

        private _initializeComponents(entModel: Model.IEntityModel) {

            var mappedId = this._idMappings[entModel.id];
            var ent = this._entityManager.getEntityById(mappedId);

            for (var c = 0; c < entModel.components.length; c++) {
                var componentModel = entModel.components[c];

                var component = createFromConstructorFunction<Extropy.Entity.Component>(componentModel.constructorFunction);

                for (var propName in componentModel.properties) {
                    var propValue = componentModel.properties[propName];
                    component[propName] = propValue;
                }

                ent.addComponent(component);

            }
        }
    }
}
