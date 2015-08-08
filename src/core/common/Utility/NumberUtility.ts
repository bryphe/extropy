module Extropy.NumberUtility {
    export function ensureNumber(val: any): number {
        if (isNullOrUndefined(val) || isNaN(val))
            return 0;
        else
            return <number>val;
    }

    export function ensureNonZero(val: any, valIfZero?: number): number {
        var num = ensureNumber(val);

        if (num === 0)
            return valIfZero;
        else
            return num;
    }
}