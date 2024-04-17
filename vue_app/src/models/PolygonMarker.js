export default class PolygonMarker {
    constructor(points = [], thickness = 2) {
        this.points = points;  // Array of {x, y} objects
        this.thickness = thickness;
        this.selected = false;
    }

    addVertex(x, y) {
        this.points.push({ x, y });
    }

    toggleSelection() {
        this.selected = !this.selected;
    }

    draw(ctx) {
        if (this.points.length < 3) return;  // Need at least three points to draw a polygon
        console.log('Drawing polygon with points:', this.points.vertices[0]);
        ctx.strokeStyle = this.selected ? 'blue' : 'red';
        ctx.lineWidth = this.thickness;
        ctx.beginPath();
        ctx.moveTo(this.points.vertices[0].x, this.points.vertices[0].y);
        this.points.vertices.forEach((point, index) => {
            if (index > 0) ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.stroke();
    }

    isInside(x, y) {
        let inside = false;
        for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            const xi = this.points[i].x, yi = this.points[i].y;
            const xj = this.points[j].x, yj = this.points[j].y;

            const intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }
}
