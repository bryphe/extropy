/// <reference path="../_references.ts" />
/// <reference path="IViewportManager.ts" />
/// <reference path="ViewBox.ts" />

module Extropy {

    export class ViewportManager implements IViewportManager, IDisposable {
        public width;
        public height;
        public element: HTMLElement;

        public get unscaledElement(): HTMLElement {
            return this._unscaledElement;
        }

        private _unscaledElement: HTMLElement;

        private _viewBox: any;

        constructor(width: number, height: number, parentElement: HTMLElement) {

            var element = document.createElement("div");
            var outerElement = document.createElement("div");

            PropertyUtility.createReadProperty(this, "width", width);
            PropertyUtility.createReadProperty(this, "height", height);
            PropertyUtility.createReadProperty(this, "element", element);

            element.style.width = width.toString() + "px";
            element.style.height = height.toString() + "px";

            outerElement.appendChild(element);
            parentElement.appendChild(outerElement);

            this._unscaledElement = document.createElement("div");
            this._unscaledElement.style.position = "absolute";

            parentElement.appendChild(this._unscaledElement);


            this._viewBox = new ViewBox(outerElement);

            window.addEventListener("resize",() => {
                this._updateSizes();
            });

            window.setTimeout(() => this._updateSizes(), 0);
        }

        private _updateSizes(): void {
            this._viewBox.forceLayout();

            var clientRect = this.element.getBoundingClientRect();

            this._unscaledElement.style.top = clientRect.top + "px";
            this._unscaledElement.style.left = clientRect.left + "px";
            this._unscaledElement.style.width = clientRect.width + "px";
            this._unscaledElement.style.height = clientRect.height + "px";
        }

        public dispose() {

        }
    }
}

