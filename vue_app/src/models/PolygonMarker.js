export default class PolygonMarker {
    constructor(points = [], thickness = 2) {
        this.points = points;  // Array of {x, y} objects
        this.thickness = thickness;
        this.selected = false;
    }

    addPoint(x, y) {
        this.points.push({ x: x, y: y });
    }

    toggleSelection() {
        this.selected = !this.selected;
    }

    draw(ctx) {
        if (this.points.length < 3) return;  // Need at least three points to draw a polygon

        ctx.strokeStyle = this.selected ? 'blue' : 'red';
        ctx.lineWidth = this.thickness;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach((point, index) => {
            if (index > 0) ctx.lineTo(point.x, point.y);
        });
        ctx.closePath(); // Connects the last point back to the first point
        ctx.stroke();
    }

    isInside(x, y) {
        // Ray-casting algorithm for determining if a point is inside a polygon
        let inside = false;
        for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            let xi = this.points[i].x, yi = this.points[i].y;
            let xj = this.points[j].x, yj = this.points[j].y;

            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }
}
