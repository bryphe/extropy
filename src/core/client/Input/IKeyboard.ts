/// <reference path="../_references.ts" />
/// <reference path="Key.ts" />

module Extropy.Input {
    export interface IKeyboard extends IComponent {
        // Key helpers
        isKeyDown(key: Key): boolean;
        isKeyUp(key: Key): boolean;
    }
}
