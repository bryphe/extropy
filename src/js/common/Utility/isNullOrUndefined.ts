

function isNullOrUndefined(val: any): boolean {
    if (typeof val === "undefined" || val === null)
        return true;
    else
        return false;
}