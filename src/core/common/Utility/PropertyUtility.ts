module PropertyUtility {
    

    export function createReadProperty(obj: any, propertyName: string, defaultValue?: any) {
        Object.defineProperty(obj, propertyName, {
            configurable: false,
            enumerable: true,
            value: defaultValue,
            writable: false
        });
    }

    export function createReadWriteProperty(obj: any, propertyName: string, defaultValue?: any) {
        Object.defineProperty(obj, propertyName, {
            configurable: false,
            enumerable: true,
            value: defaultValue,
            writable: true
        });
    }
}