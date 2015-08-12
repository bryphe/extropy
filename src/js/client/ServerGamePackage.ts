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
            var promise = Q.defer<Model.IGameModel>();
            xhr("get", "game.json", function(data){
                alert("data");
            });
            return promise.promise;
        }
    }
}
