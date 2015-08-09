/// <reference path="IScreen.ts" />
/// <reference path="IScreenManager.ts" />
/// <reference path="Screen.ts" />
/// <reference path="../Settings/IResolution.ts"/>

module Extropy {
 
    export class DefaultScreenManager implements IScreenManager {

        private static GameElementId = "extropy-game";

        private static DefaultResolutionWidth = 1280;
        private static DefaultResolutionHeight = 1024;
        private static DefaultBackgroundColor = "red";

        private _activeScreen: IScreen;
        private _initialBackgroundColor = "transparent";
        private _rootElement: HTMLElement;
        private _resolutionWidth = DefaultScreenManager.DefaultResolutionWidth;
        private _resolutionHeight = DefaultScreenManager.DefaultResolutionHeight;

        public get rootElement(): HTMLElement {
            return this._rootElement;
        }

        public get resolution(): IResolution {
            return { width: this._resolutionWidth, height: this._resolutionHeight };
        }
        public set resolution(val: IResolution) {
            this._resolutionWidth = val.width;
            this._resolutionWidth = val.height;
            
            // TODO: actually reset resolution
        }

        public get activeScreen(): IScreen {
            return this._activeScreen;
        }

        public set backgroundColor(color: string) {
            if(this._rootElement) 
                this._rootElement.style.backgroundColor = color;

            this._initialBackgroundColor = color;
        }
        public get backgroundColor(): string {
            return this._rootElement.style.backgroundColor;
        }

        constructor() {

        }

        public initialize(): void {

            var existingElement = document.getElementById(DefaultScreenManager.GameElementId);
            assert(!existingElement);

            var gameElement = document.createElement("div");
            gameElement.id = DefaultScreenManager.GameElementId;
            gameElement.style.width = "100%";
            gameElement.style.height = "100%";
            gameElement.style.overflow = "hidden";
            this._rootElement = gameElement;
            this.backgroundColor = this._initialBackgroundColor;

            document.body.appendChild(gameElement);
        }

        public update(): void {
            if (this._activeScreen)
                this._activeScreen.update();
        }

        public render(): void {
            if (this._activeScreen)
                this._activeScreen.render();
        }

        public showScreen(screenModel: Model.IScreenModel): void {
            if (this._activeScreen) {
                this.rootElement.removeChild(this._activeScreen.element);
            }

            var newScreen = new Screen(screenModel);

            this.rootElement.appendChild(newScreen.element);
            this.rootElement.appendChild(newScreen.unscaledElement);
            newScreen.initialize();
            this._activeScreen = newScreen;
        }

        public dispose(): void {
        }
    }
}
