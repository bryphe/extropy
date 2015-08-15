/// <reference path="../_references.ts" />
/// <reference path="IScreenModel.ts" />

module Extropy.Model {
    export interface IGameModel {
        initialScreen: IScreenModel;
        screens: IScreenModel[];
    }

    export interface IGameJsonDefinition {

        name: string;
        startScreen: string;

        screens: string[];
    }

    export class GameModel {

        private _screens: IScreenModel[];
        private _initialScreen: IScreenModel;

        public get screens(): IScreenModel[] {
            return this._screens;
        }

        public get initialScreen(): IScreenModel {
            return this._initialScreen;
        }

        public static parse(json: string): Q.Promise<IGameModel> {
            var gameModel = new GameModel();
            var data = <IGameJsonDefinition>JSON.parse(json);

            return GameModel._parseScreens(data)
                    .then((screenModelManager: ScreenModelManager) => {
                                gameModel._screens = screenModelManager.screens;
                                gameModel._initialScreen = screenModelManager.getScreenByName(data.startScreen);
                            })
                    .then(() => gameModel);
            // ret.screens = GameModel._parseScreens(data);

        }

        private static _parseScreens(data: IGameJsonDefinition): Q.Promise<ScreenModelManager> {
            var ret = new ScreenModelManager();
            return Q.when(ret);
        }
    }

    export class ScreenModelManager {
    
        private _pathToScreen: HashTable<IScreenModel>;
        private _screens: IScreenModel[];
        public get screens(): IScreenModel[] {
            return this._screens;
        }

        constructor() {
            this._pathToScreen = HashTable.create<IScreenModel>();
            this._screens = [];
        }

        public addScreen(path: string, screenModel: IScreenModel) {
            this._pathToScreen[path] = screenModel;
            this._screens.push(screenModel);
        }

        public getScreenByName(path: string): IScreenModel {
            return this._pathToScreen[path];
        }
    
    }
}
