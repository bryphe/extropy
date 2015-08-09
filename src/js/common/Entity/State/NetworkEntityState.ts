/// <reference path="Entitystate.ts" />

module Extropy.Entity {

    export class NetworkEntityState extends EntityState {
        private _type: string;


        public variables: HashTable<NetworkVariableState> = HashTable.create<NetworkVariableState>();

        public get entityType(): string {
            return this._type;
        }

        constructor(id: string, entityType: string) {
            super(id);

            this._type = entityType;
        }
    }
}

