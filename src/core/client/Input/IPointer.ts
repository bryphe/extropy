module Extropy.Input {
    export interface IPointer extends IComponent {
        // Mouse position
        pointerX: number;
        pointerY: number;

        position: Vector2d;

        isPointerDown: boolean;
        isPointerJustDown: boolean;
    }
}