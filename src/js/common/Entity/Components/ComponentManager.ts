/// <reference path="Component.ts"/>

module Extropy.Entity {

    export class ComponentManager<T extends Component> extends Component
    {
        private _managedComponents: T[] = [];

        public managesComponent(component: IComponent): boolean {
            return false;
        }

        /* internal */ onComponentAdded(entity: Entity, component: T) {
            this._managedComponents.push(component);
        }
        /* internal */ onComponentRemoved(entity: Entity, component: T) {
            this._managedComponents.splice(this._managedComponents.indexOf(component), 1);
        }
    }
}

