module Extropy.Input {
    export class DefaultKeyboard implements IKeyboard {

        public initialize() {
            document.body.addEventListener("keydown", this.onKeyDown, true);
            document.body.addEventListener("keyup", this.onKeyUp, true);
        }

        public update() {
        }

        public dispose() {
            // todo
        }

        public isKeyDown(key: Key): boolean {
            return false;
        }

        public isKeyUp(key: Key): boolean {
            return false;
        }

        private onKeyDown(evt: KeyboardEvent) {
        }

        private onKeyUp(evt: KeyboardEvent) {
        }
    }
}