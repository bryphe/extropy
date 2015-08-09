/// <reference path="_references.ts" />
/// <reference path="Assets/IAssetManager.ts" />
/// <reference path="Input/IKeyboard.ts" />
/// <reference path="Input/IPointer.ts" />
/// <reference path="Viewport/IViewportManager.ts" />

// Various dependencies for the Extropy framework
// These could be potentially mocked or replaced down the road by other strategies

module Extropy {
    export var AssetManager: Extropy.IAssetManager;
    export var TimeManager: Extropy.ITimeManager;

    export function isEditMode(): boolean {
        return !!(Extropy && Extropy["IDE"] && Extropy["IDE"].getContext);
    }
}

// Input handling
module Input {
    export var Keyboard: Extropy.Input.IKeyboard;
    export var Pointer: Extropy.Input.IPointer;
}

var Entity: Extropy.Entity.IEntityFactory;
var Time: Extropy.ITime;
var Viewport: Extropy.IViewportManager;

Extropy.TimeManager = new Extropy.DefaultTimeManager();

