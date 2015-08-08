interface EventCallback<T> {
    (T: any): void;
}

interface IEvent<T> {
    addListener(listener: EventCallback<T>);
}

class EventObject<T> implements IDisposable {
    
    private _listeners: EventCallback<T>[] = [];

    public addListener(listener: EventCallback<T>): IDisposable {
        this._listeners.push(listener);

        var that = this;

        return {
            dispose: () => {
                var idx = that._listeners.indexOf(listener);

                if (idx > -1)
                    that._listeners.splice(idx, 1);

                that = null;
            }
        }
    }

    public dispatchEvent(obj: T) {
        for (var i = 0, len = this._listeners.length; i < len; i++)
            this._listeners[i](obj);
    }

    public dispose(): void {
        this._listeners = null;
    }

}