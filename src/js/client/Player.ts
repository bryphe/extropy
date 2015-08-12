/// <reference path="_references.ts" />
/// <reference path="Screens/IScreenManager.ts" />
/// <reference path="Screens/DefaultScreenManager" />
/// <reference path="GameRunner.ts" />
/// <reference path="Model/IGameModel.ts" />
/// <reference path="ServerGamePackage.ts" />

module Extropy {
    export class Player {
        private _parentElement: HTMLElement;


        private _timeManager: ITimeManager;
        private _screenManager: IScreenManager;
        private _gameRunner: GameRunner;

        constructor(parentElement: HTMLElement) {
            this._parentElement = parentElement;

            this._screenManager = new DefaultScreenManager();
            this._timeManager = new DefaultTimeManager();
            this._gameRunner = new GameRunner(this._screenManager, this._timeManager);
            window["ScreenManager"] = this._screenManager;

            this._gameRunner.start();
        }

        public startGameFromJson(gameJsonPath: string) {
            alert("Trying to start game");
            var gamePackage = new ServerGamePackage();
            gamePackage.load()
                .then((gameModel: Model.IGameModel) => {
                        this._screenManager.showScreen(gameModel.initialScreen);
                });
        }


        // public startGameFromZip(zipFile: jszip.JSZip) {
        //     var manifestContents = zipFile.file("manifest.json").asText();
        //     var gameModel = new Extropy.Model.GameModel();
        //     gameModel.deserializeFromJson(manifestContents);

        //     var startScreenFile = gameModel.fileSystem.getFileFromPath(gameModel.initialScreen);
        //     startScreenFile.getContentsAsString().then((screenJson: string) => {

        //         var startScreen = new Model.ScreenModel();
        //         startScreen.deserializeFromJson(screenJson);

        //         assertValue(startScreen);

        //         this.startScreen(startScreen, gameModel.fileSystem, true);
        //     });
        // }

        // public startScreen(startScreen: Model.ScreenModel, fileSystem: Model.FileSystemModel, shouldLoadFileSystem?: boolean) {
        //     this._screenManager.showScreen(startScreen, fileSystem, shouldLoadFileSystem);
        // }
    }
}
