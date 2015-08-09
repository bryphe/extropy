module Extropy.Entity {

    export class EntityState {
        private _id: string;

        public get id(): string {
            return this._id;
        }

        public variables: HashTable<VariableState> = {};
        
        constructor(id: string) {
            this._id = id;
        }
    }
}

