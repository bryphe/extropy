/// <reference path="Component.ts"/>

module Extropy.Entity {

    export class CustomComponent extends Component {

        public ConstructorFunction: string;

        private _nestedComponent: Component;
        private _initializedSuccessfully = false;

        public initialize(): void {

            try {
                this._nestedComponent = <Component>createFromConstructorFunction(this.ConstructorFunction);
                this._nestedComponent.entity = this.entity;
                this._nestedComponent.initialize();
            } catch (ex) {

            } finally {

            }
        }

        public update(): void {
            if(this._nestedComponent && this._nestedComponent.update)
            this._nestedComponent.update();
        }

        public render(): void {
            if(this._nestedComponent && this._nestedComponent.render)
            this._nestedComponent.render();
        }
    }
}

