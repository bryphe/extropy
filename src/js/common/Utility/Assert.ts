 function assertNullOrUndefined(val: any) {
    assert(val === null || typeof val === "undefined");
}

 function assertNotNullOrUndefined(val: any, msg?: string) {
    assert(val !== null && typeof val !== "undefined", msg);
}

 function assertValue(val: any, msg?: string) {
    assertNotNullOrUndefined(val, msg);
}

 function assertAbstract() {
    assert(false, "Abstract method");
}

 function assert(condition: boolean, message?: string) {
    if (!condition) {
        console.error("Assert failed: " + message);
        debugger;
    }
}
