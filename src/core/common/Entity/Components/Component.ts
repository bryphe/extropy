module Extropy.Entity {

    export class Component {

        private _entity: Entity;

        public get entity(): Entity {
            return this._entity;
        }

        public set entity(val: Entity) {
            this._entity = val;
        }

        // TODO: Rename to type
        public get componentManager(): Function {
            return null;
        }

        public initialize(): void {
        }

        public update(): void {
        }

        public postUpdate(): void {

        }

        public render(): void {
            
        }

        public onDestroy(): void {
            
        }

        public registerDependency(variableName: string, dependencyType: Function) {
            this[variableName] = this.entity.getFirstComponentByTypeInAncestors(dependencyType);
        }
    }
}

