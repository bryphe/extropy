module Extropy.Entity {

    export class EntityImplementation implements Entity {

        private _id: string;
        private _entityManager: BaseEntityManager;
        private _components: Component[] = [];
        public _variables: HashTable<Variable> = HashTable.create<Variable>();
        private _functions: HashTable<() => any> = HashTable.create<() => any>();
        private _name: string;


        private _currentlyUpdatingComponent: Component;

        public get id(): string {
            return this._id;
        }

        public get name(): string {
            return this._name;
        }

        public set name(val: string) {
            this._name = val;
        }

        public get parent(): Entity {

            var parentId = this["parentId"];

            if (isNullOrUndefined(parentId))
                return null;
            else
                return this._entityManager.getEntityById(parentId);
        }

        public set parent(ent: Entity) {

            if (this._anyCircularReferencesInParentChain(ent)) {
                throw "Circular reference in parents detected";
            }


            if (isNullOrUndefined(ent)) {
                this["parentId"] = null;
            } else {
                this["parentId"] = ent.id;
            }
        }

        public get entityManager(): BaseEntityManager {
            return this._entityManager;
        }

        constructor(id: string, entityManager: BaseEntityManager) {
            this._id = id;
            this._entityManager = entityManager;


            this.addVariable("name", "Entity" + id);
            this.addVariable("parentId", null);
        }

        public addComponent(component: Component): void {
            this._components.push(component);

            component.entity = this;
            component.initialize();
            if (component.componentManager) {
                var ancestorComponent = <Extropy.Entity.ComponentManager<any>>this.getFirstComponentByTypeInAncestors(component.componentManager);

                if (!ancestorComponent)
                    throw new Error("Required component manager in ancestor not found: " + component.componentManager.toString());

                ancestorComponent.onComponentAdded(this, component);
            }
        }

        public addVariable(name: string, initialValue: any, owner?: any, options?: EntityVariableOptions) {
            if (this._variables[name]) {
                throw "Variable: " + name + " was already defined by another component.";
            }

            options = options || {
                settable: true
            };

            var variable = new Variable();
            variable.name = name;
            variable.value = initialValue;
            variable.owner = owner;
            this._variables[name] = variable;

            Object.defineProperty(this, variable.name, {
                enumerable: true,
                configurable: false,
                set: val => {
                    if (options.settable) {
                        this.setVariableValue(variable.name, val);
                    } else {
                        throw "Variable " + variable.name + " is not settable";
                    }
                },
                get: () => this.getVariableValue(variable.name)
            });

        }

        public addFunction(name: string, func: () => any): void {
            if (this._functions[name])
                throw "Function: " + name + " was already defined by another component.";

            this._functions[name] = func;

            Object.defineProperty(this, name, {
                enumerable: true,
                configurable: false,
                set: val => {
                    throw "Function '" + name + "' is already set";
                },
                get: () => this._functions[name]
            });
        }

        public getVariableValue(variableName: string): any {
            return this._variables[variableName].value;
        }

        public setVariableOwner(variableName: string, owner: any) {
            var variable = this._variables[variableName];

            if (!variable)
                throw "Variable " + variableName + " not defined.";

            if (variable.owner)
                throw "Variable " + variableName + " already has an owner.";

            variable.owner = owner;
        }

        public _onDestroy(): void {
            for (var i = 0; i < this._components.length; i++) {
                if (isFunction(this._components[i].onDestroy))
                    this._components[i].onDestroy();
            }
        }

        public setVariableValue(variableName: string, value: any) {
            var variable = this._variables[variableName];

            if (variable.owner && variable.owner !== this._currentlyUpdatingComponent) {
                throw "Cannot update variable: " + variableName + ". Not registered as owner of variable.";
            }

            var oldValue = variable.value;
            variable.value = value;
            this.onVariableChanged(variableName, oldValue, value);
        }

        protected /* virtual */ onVariableChanged(variableName: string, oldValue: any, newValue: any) {

        }

        public update(): void {

            for (var i = 0, len = this._components.length; i < len; i++) {
                this._currentlyUpdatingComponent = this._components[i];
                this._components[i].update();
                this._currentlyUpdatingComponent = null;
            }
        }

        public postUpdate(): void {
            for (var i = 0, len = this._components.length; i < len; i++) {
                this._currentlyUpdatingComponent = this._components[i];
                this._components[i].postUpdate();
                this._currentlyUpdatingComponent = null;
            }
        }

        public render(): void {
            for (var i = 0, len = this._components.length; i < len; i++) {
                this._components[i].render();
            }
        }


        public getComponentByType(type: Function): Component {
            for (var i = 0, len = this._components.length; i < len; i++) {
                if (this._components[i] instanceof type)
                    return this._components[i];
            }

            return null;
        }

        public getComponentsInChildren(type: Function): Component[] {
            var ret = [];

            var children = this.entityManager.getEntities((ent) => ent.parent === this);
            
            children.forEach((childEnt) => {                
                var component = childEnt.getComponentByType(type);
                if (component) {
                    ret.push(component);
                }
            });

            return ret;
        }

        public getFirstComponentByTypeInAncestors(type: Function): Component {

            var currentEnt = this;
            while (currentEnt.parent != null) {
                var component = currentEnt.parent.getComponentByType(type);

                if (component)
                    return component;

                currentEnt = <EntityImplementation>currentEnt.parent;
            }

            return null;
        }

        public sendMessage(message: string, data: any): void {
            for (var i = 0, len = this._components.length; i < len; i++) {
                if (typeof this._components[i][message] === "function") {
                    this._components[i][message](data);
                }
            }
        }

        private _anyCircularReferencesInParentChain(ent: Entity): boolean {

            if (isNullOrUndefined(ent))
                return false;

            var visitedEntities = [];
            visitedEntities.push(this);

            var currentParent = ent.parent;
            while (currentParent != null) {
                if (visitedEntities.indexOf(currentParent) >= 0)
                    return true;

                visitedEntities.push(currentParent);
                currentParent = currentParent.parent;
            }

            return false;
        }

    }
}

