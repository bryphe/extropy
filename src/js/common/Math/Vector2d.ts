class Vector2d {
    x: number = 0;
    y: number = 0;
}


class Vector2dHelper {
    public static subtract(v1: Vector2d, v2: Vector2d): Vector2d {
        return {
            x: v1.x - v2.x,
            y: v1.y - v2.y
        };
    }

    public static distanceSquared(v1: Vector2d, v2: Vector2d): number {
        return (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y);
    }

    public static distance(v1: Vector2d, v2: Vector2d): number {
        return Math.sqrt(Vector2dHelper.distanceSquared(v1, v2));
    }

    public static normalize(v: Vector2d) {
        var length = Vector2dHelper.distance(v, { x: 0, y: 0 });

        return {
            x: v.x / length,
            y: v.y / length
        }
    }
}