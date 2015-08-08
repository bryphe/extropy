module Extropy {

    export interface ITime {
        realTimeSinceStartup: number;
        gameTimeSinceStartup: number;

        deltaFixedUpdateTime: number
        deltaRenderTime: number;
    }
}

