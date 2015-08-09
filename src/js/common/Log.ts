class Log {
    
    public static verbose(logArea: string, text: string) {

    }

    public static log(text: string) {
        console.log("[EXTROPY]:" + text);
    }

    public static logError(text: string) {
        throw text;
        console.error("[EXTROPY]:" + text);
    }
}