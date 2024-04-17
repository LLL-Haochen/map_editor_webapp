export default class LineMarker {
    constructor(startX, startY, endX, endY, thickness = 2) {
        this.start = { x: startX, y: startY };
        this.end = { x: endX, y: endY };
        this.thickness = thickness;
        this.selected = false;
    }

    toggleSelection() {
        this.selected = !this.selected;
    }

    draw(ctx) {
        ctx.strokeStyle = this.selected ? 'blue' : 'red';
        ctx.lineWidth = this.thickness;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
    }

    isInside(x, y) {
        // Calculate distance from point (x, y) to the line segment (start-end)
        const a = {x: this.start.x, y: this.start.y};
        const b = {x: this.end.x, y: this.end.y};
        const p = {x: x, y: y};

        const numerator = Math.abs((b.y - a.y) * p.x - (b.x - a.x) * p.y + b.x * a.y - b.y * a.x);
        const denominator = Math.sqrt((b.y - a.y) ** 2 + (b.x - a.x) ** 2);
        const distance = numerator / denominator;

        return distance <= this.thickness;
    }
}
