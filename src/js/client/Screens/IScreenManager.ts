/// <reference path="../_references.ts" />
/// <reference path="IScreen.ts" />
/// <reference path="../Settings/IResolution.ts" />

module Extropy {
    export interface IScreenManager extends IDisposable {

        backgroundColor: string;
        resolution: IResolution;
        rootElement: HTMLElement;

        activeScreen: IScreen;

        // Initialize is called when the game is started
        initialize();

        // Update is called each frame
        render();
        update();

        showScreen(startScreen: Model.IScreenModel);
    }
}
