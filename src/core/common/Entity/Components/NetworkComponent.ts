/// <reference path="Component.ts" />

module Extropy.Entity {

    /**
    * Component to add to an entity to give it network serialization / deserialization capabilities
    */
    export class NetworkEntityComponent extends Component {

        private _networkVariables: HashTable<NetworkVariable> = HashTable.create<NetworkVariable>();

        public /* override */ initialize(): void {
            this.entity.addFunction("addNetworkVariable", this.addNetworkVariable.bind(this));
            this.entity.addVariable("entityType", "unknown");
            this.entity.addNetworkVariable("serverId", this.entity.id);
            this.entity.addNetworkVariable("net_parentId", null);

            if (isServer()) {
                this.entity.addVariable("net_scope", null);
            }
        }

        public addNetworkVariable(name: string, initialValue: any, owner?: any, options?: EntityVariableOptions): void {
            this.entity.addVariable(name, initialValue, owner, options);

            if (!isNullOrUndefined(initialValue))
                this.entity[name] = initialValue;

            this._networkVariables[name] = new NetworkVariable();
        }

        public update(): void {
            if (isServer() && this.entity.parent) {
                this.entity["net_parentId"] = this.entity.parent.id;
            } 
        }

        public serialize(): NetworkEntityState {
            var entityState = new NetworkEntityState(this.entity.id, this.entity.entityType);

            // Save all variables to the entity state
            for (var key in this._networkVariables) {
                var val = this._networkVariables[key];

                var varState = new NetworkVariableState();
                varState.name = key
                varState.value = this.entity[key];
                varState.version = val.version;
                entityState.variables[key] = varState;

            }

            return entityState;
        }

    }
}

