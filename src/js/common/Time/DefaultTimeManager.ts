module Extropy {

    export class DefaultTimeManager implements ITimeManager {

        private _startTimeInTicks: number;
        private _fixedUpdateRate: number;
        private _totalFixedUpdateTime: number;
        private _lastRenderFrameTicks: number;
        private _deltaRenderTime: number;

        public get realTimeSinceStartup(): number {
            return this._millisecondsToSeconds(new Date().getTime() - this._startTimeInTicks);
        }

        public get gameTimeSinceStartup(): number {
            return this._totalFixedUpdateTime;
        }

        public get deltaFixedUpdateTime(): number {
            return this._fixedUpdateRate;
        }

        public get deltaRenderTime(): number {
            return this._deltaRenderTime;
        }

        constructor() {
            this.reset();
        }

        public notifyFixedUpdateFrameStart(): void {

        }

        public notifyFixedUpdateFrameEnd(): void {
            this._totalFixedUpdateTime += this._fixedUpdateRate;
        }

        public notifyRenderFrameStart(): void {
            this._deltaRenderTime = this._millisecondsToSeconds(new Date().getTime() - this._lastRenderFrameTicks);
        }

        public notifyRenderFrameEnd(): void {
            this._lastRenderFrameTicks = new Date().getTime();
        }

        public reset(): void {
            this._startTimeInTicks = new Date().getTime();
            this._totalFixedUpdateTime = 0;
            this._lastRenderFrameTicks = 0;
        }

        public setFixedUpdateRate(fixedUpdateRate: number) {
            this._fixedUpdateRate = fixedUpdateRate;
        }

        private _millisecondsToSeconds(value: number): number {
            return value / 1000;
        }
    }
}