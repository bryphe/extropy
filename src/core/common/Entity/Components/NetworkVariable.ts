module Extropy.Entity {


    export class NetworkVariable {
        private _version: number;
        private _latestValue: any;

        public get version(): number {
            return this._version;
        }

        public get latestValue(): any {
            return this._latestValue;
        }

        public set latestValue(val: any) {
            if (this._latestValue !== val)
                this._version++;

            this._latestValue = val;
        }

        constructor() {
            this._version = 0;
        }
    }
}

