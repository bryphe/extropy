

function createFromConstructorFunction<T>(constructorFunction: string): T {
    return <T>eval("new " + constructorFunction + "()");
}