module Extropy {

    export class Vector2 {
        public x: number;
        public y: number;
    }

    export interface IAxisAlignedBoundingBox {
        topLeft: Vector2;
        bottomRight: Vector2;

        intersectsBox(bbox: IAxisAlignedBoundingBox): boolean;
        intersectsPoint(point: Vector2): boolean;
    }

    export class AxisAlignedBoundingBox {
        public topLeft: Vector2;
        public bottomRight: Vector2;

        public get width(): number {
            return this.bottomRight.x - this.topLeft.x;
        }

        public get height(): number {
            return this.bottomRight.y - this.topLeft.y;
        }

        public intersectsBox(bbox: AxisAlignedBoundingBox): boolean {

            if (this.intersectsPoint(bbox.topLeft)
                || this.intersectsPoint({ x: bbox.topLeft.x, y: bbox.bottomRight.y })
                || this.intersectsPoint({ x: bbox.bottomRight.x, y: bbox.topLeft.y })
                || this.intersectsPoint(bbox.bottomRight))
                return true;

            return false;
        }

        public intersectsPoint(point: Vector2) {

            if (point.x >= this.topLeft.x
                && point.y >= this.topLeft.y
                && point.x <= this.bottomRight.x
                && point.y <= this.bottomRight.y) {
                return true;
            }

            return false;
        }


    }
}

