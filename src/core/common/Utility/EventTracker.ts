module Extropy {

    class EventInfo {
        target: EventTarget;
        name: string;
        listenerFunction: Function;
        useCapture: boolean;
    }

    export class EventTracker implements IDisposable {

        private _trackedEvents: EventInfo[] = [];

        public trackEvent(target: EventTarget, name: string, listenerFunction: Function, listener: any, useCapture?: boolean) {

            if (typeof useCapture === "undefined")
                useCapture = false;

            var eventInfo = new EventInfo();
            eventInfo.target = target;
            eventInfo.name = name;
            eventInfo.listenerFunction = listenerFunction.bind(listener);
            eventInfo.useCapture = useCapture;

            target.addEventListener(name, <EventListener>eventInfo.listenerFunction, useCapture);
            this._trackedEvents.push(eventInfo);
        }

        public dispose(): void {
            for (var i = 0, len = this._trackedEvents.length; i < len; i++) {
                var eventInfo = this._trackedEvents[i];
                eventInfo.target.removeEventListener(eventInfo.name, <EventListener>eventInfo.listenerFunction, eventInfo.useCapture);
            }

            this._trackedEvents = null;
        }

    }
}