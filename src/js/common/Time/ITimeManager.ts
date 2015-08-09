module Extropy {

    export interface ITimeManager extends ITime {
        reset(): void;
        setFixedUpdateRate(updateRate: number);

        notifyFixedUpdateFrameStart();
        notifyFixedUpdateFrameEnd();

        notifyRenderFrameStart();
        notifyRenderFrameEnd();
    }
}

