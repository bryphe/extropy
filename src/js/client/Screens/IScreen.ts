module Extropy {
    export interface IScreen extends IDisposable {

        element: HTMLElement;

        unscaledElement: HTMLElement;

        // TODO: Return promise for loading
        initialize(): void;

        update(): void;

        render(): void;
    }
}