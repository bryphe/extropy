interface IEventSource {
    addEventListener(eventName: string, handlerFunction: Function, useCapture?: boolean);
    removeEventListener(eventName: string, handlerFunction: Function, useCapture?: boolean);
}