module Extropy {


    export class GameRunner {



        private static UPDATE_RATE = 10;
        private static MILLISECONDS_TO_SECONDS = 1 / 1000;

        private _hasStarted: boolean;

        private _lastTick: number;
        private _accumulatedUpdateTimeInSeconds: number;
        private _screenManager: IScreenManager;
        private _timeManager: ITimeManager;

        constructor(screenManager: IScreenManager, timeManager: ITimeManager) {
            this._screenManager = screenManager;
            this._timeManager = timeManager;

            
        }

        public start() {

            if (!screen)
                throw "'screen' must not be null.";
            
            if(this._hasStarted)
                throw "GameRunner is already running a game.";

            this._hasStarted = true;

            this._timeManager.reset();
            this._timeManager.setFixedUpdateRate(1.0 / 30.0);

            this._lastTick = new Date().getTime();
            this._accumulatedUpdateTimeInSeconds = 0;

            this._screenManager.initialize();
            //Extropy.Input.Keyboard.initialize();
            //Extropy.Input.Pointer.initialize();

            window.setInterval(() => {
                var currentTime = new Date().getTime();
                var deltaTime = currentTime - this._lastTick;
                var deltaTimeInSeconds = deltaTime * GameRunner.MILLISECONDS_TO_SECONDS;

                this._accumulatedUpdateTimeInSeconds += deltaTimeInSeconds;

                while (this._accumulatedUpdateTimeInSeconds >= this._timeManager.deltaFixedUpdateTime) {
                    this._timeManager.notifyFixedUpdateFrameStart();
   
                    this._screenManager.update();
                    this._accumulatedUpdateTimeInSeconds -= this._timeManager.deltaFixedUpdateTime;
                    this._timeManager.notifyFixedUpdateFrameEnd();
                }

                //Input.Keyboard.update();
                //Input.Pointer.update();

                this._lastTick = new Date().getTime();

            }, GameRunner.UPDATE_RATE);

            var renderFunc = () => {
                window.requestAnimationFrame(renderFunc);

                this._timeManager.notifyRenderFrameStart();
                this._screenManager.render();
                this._timeManager.notifyRenderFrameEnd();
            }
            renderFunc();
        }
    }
}