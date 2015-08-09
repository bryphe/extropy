module Extropy.Input {
    export class Key {
        public A = new Key("a");
        public B = new Key("b");
        public C = new Key("c");

        public Up = new Key("{uparrow}"); 

        constructor(value: string) {
        }
    }
}