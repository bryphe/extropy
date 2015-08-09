/// <reference path="../_references.ts" />

module Extropy.Entity {

    export class EntityManager extends BaseEntityManager {

        private _entityElement: HTMLElement = null;

        public get element(): HTMLElement {
            return this._entityElement;
        }

        public get unscaledElement(): HTMLElement {
            return Viewport.unscaledElement;
        }

        constructor(element: HTMLElement) {
            super(); 

            this._entityElement = element;
        }

    }
}

