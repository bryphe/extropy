/// <reference path="../_references.ts" />
/// <reference path="IPointer.ts" />
/// <reference path="PointerButtonTracker.ts" />

module Extropy.Input {

    export class DefaultPointer extends EventTracker implements IPointer {

        private _wasDown: boolean = false;
        private _wasUp: boolean;
        private _pointerX: number = 0;
        private _pointerY: number = 0;
        private _element: HTMLElement;
        private _leftPointerButtonTracker: PointerButtonTracker = new PointerButtonTracker();

        public get pointerX(): number {
            return this._pointerX;
        }

        public get pointerY(): number {
            return this._pointerY;
        }

        public get position(): Vector2d {
            return { x: this._pointerX, y: this._pointerY };
        }

        public get isPointerDown(): boolean {
            return this._leftPointerButtonTracker.isPointerDown;
        }

        public get isPointerJustDown(): boolean {
            return this._leftPointerButtonTracker.isPointerJustDown;
        }

        constructor(element: HTMLElement) {
            super();
            this._element = element;
            this._initialize();
        }

        private _initialize() {
            this.trackEvent(document.body, "mousedown", this.onMouseDown, this, true);
            this.trackEvent(document.body, "mouseup", this.onMouseUp, this, true);
            this.trackEvent(document.body, "mousemove", this.onMouseMove, this, true);
            this.trackEvent(document.body, "contextmenu", this._onContextMenu, this, true);
        }

        public update() {
            this._leftPointerButtonTracker.update();
        }

        private onMouseDown(evt: MouseEvent) {
            this._leftPointerButtonTracker.notifyPointerDown();
        }

        private onMouseUp(evt: MouseEvent) {
            this._leftPointerButtonTracker.notifyPointerUp();
        }

        private onMouseMove(evt: MouseEvent) {
            var element = this._element;

            // TODO: Cache the params that trigger layout to improve perf
            var offsetWidth = element.offsetWidth;
            var offsetHeight = element.offsetHeight;

            var rect = element.getBoundingClientRect();

            // Map mouseX, mouseY to the screen space
            this._pointerX = ((evt.pageX - rect.left) / rect.width) * offsetWidth;
            this._pointerY = ((evt.pageY - rect.top) / rect.height) * offsetHeight;
        }

        private _onContextMenu(evt: MouseEvent) {
            evt.preventDefault();
        }
    }
}
