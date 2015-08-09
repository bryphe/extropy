module Extropy.Input {

    export class PointerButtonTracker {
        private _wasDown: boolean = false;
        private _wasUp: boolean;
        private _wasJustDown: number = 2;

        public get isPointerDown(): boolean {
            return this._wasDown;
        }

        public get isPointerJustDown(): boolean {
            return this._wasJustDown <= 1;
        }

        public update(): void {
            if (this._wasUp) {
                this._wasDown = false;
                this._wasUp = false;
            }

            if(this._wasJustDown <= 1)
                this._wasJustDown++;
        }

        public notifyPointerDown(): void {
            this._wasDown = true;
            this._wasJustDown = 0;
            this._wasUp = false;
        }

        public notifyPointerUp(): void {
            this._wasUp = true;
        }

    }
}