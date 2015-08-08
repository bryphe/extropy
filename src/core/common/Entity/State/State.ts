module Extropy.Entity {


    // State encapsulates the state of a set of entities for a particular frame
    export class State {
        public id: number;
        public tick: number;
        private _idToEntity: HashTable<EntityState> = Object.create(null);
        private _entities: EntityState[] = [];

        public get entities(): EntityState[] {
            return this._entities;
        }

        public containsEntity(id: string): boolean {
            return !!this._idToEntity[id];
        }

        public pushEntityData(state: EntityState) {
            var id = state.id;
            if (this._idToEntity[id])
                throw "This case isn't handled yet.";

            this._idToEntity[id] = state;
            this._entities.push(state);
        }
    }
}

