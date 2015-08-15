/// <reference path="_references.ts" />
/// <reference path="Screens/IScreenManager.ts" />
/// <reference path="Screens/DefaultScreenManager" />
/// <reference path="GameRunner.ts" />
/// <reference path="Model/IGameModel.ts" />

module Extropy {
    export class ServerGamePackage {
        constructor() {
        
        }

        public load(): Q.Promise<Model.IGameModel> {
            return xhr("game.json")
                .then((data) => Model.GameModel.parse(data));
        }
    }
}
