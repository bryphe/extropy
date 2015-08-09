/// <reference path="../_references.ts" />
/// <reference path="IScreen.ts" />
/// <reference path="../Entity/EntityInstantiator.ts" />
/// <reference path="../Entity/EntityManager.ts" />
/// <reference path="../Viewport/ViewportManager.ts" />
/// <reference path="../Input/DefaultPointer.ts" />

module Extropy {
    export class Screen implements IScreen {

        private _element: HTMLElement;
        private _entityManager: Extropy.Entity.EntityManager;
        private _entityInstantiator: EntityInstantiator;
        private _unscaledElement: HTMLElement;

        private _viewportManager: ViewportManager;

        public get element(): HTMLElement {
            return this._element;
        }

        public get unscaledElement(): HTMLElement {
            return this._viewportManager.unscaledElement;
        }

        constructor(screenModel: Model.IScreenModel) {
            this._element = document.createElement("div");
            this._element.style.width = "100%";
            this._element.style.height = "100%";

            var entities = screenModel.entities;

            // Initialize singletons
            window["Viewport"] = this._viewportManager = new ViewportManager(1024, 768, this._element);
            window["Input"].Pointer = new Extropy.Input.DefaultPointer(this._viewportManager.element);

            this.initializeEntities(entities);
        }

        public initialize(): void {
        }

        public update(): void {
            window["Input"].Pointer.update();
            this._entityManager.update();
        }

        public render(): void {
            this._entityManager.render();
        }

        public dispose(): void {
            this._element = null;
        }


        public addEntity(modelTemplate: Model.IEntityModel) {
            // TODO: Remove this?
            this._entityInstantiator.createEntityFromModel(modelTemplate, null);
        }

        public updateEntityComponents(modelTemplate: Model.IEntityModel) {
            assertValue(modelTemplate);
            assertValue(this._entityManager);


            var existingEntity = this._entityManager.getEntityById(modelTemplate.id);
            assertValue(existingEntity);
            this._entityManager.deleteEntity(existingEntity);

            this._entityInstantiator.createEntityFromModel(modelTemplate, null);
            this._remapOldParents(existingEntity, this._entityManager.getEntityById(modelTemplate.id));
        }

        private initializeEntities(entities: Model.IEntityModel[]) {

            var entityManager = new Extropy.Entity.EntityManager(this._viewportManager.element);
            this._entityManager = entityManager;
            this._entityInstantiator = new EntityInstantiator(entityManager, true);

            this._entityInstantiator.createEntityFromModels(entities, null);

            entityManager.update();
            entityManager.render();
        }

        private _remapOldParents(oldParentEntity: Extropy.Entity.Entity, newParentEntity: Extropy.Entity.Entity) {
            var entitiesToRemap = this._entityManager.getEntities((ent) => {
            return ent.parent == oldParentEntity;
            });

            for (var i = 0; i < entitiesToRemap.length; i++) {
                entitiesToRemap[i].parent = newParentEntity;
            }
        }
    }
}
