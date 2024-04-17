export default class PointMarker {
    constructor(x, y, radius = 10) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.selected = false;
    }
  
    toggleSelection() {
      this.selected = !this.selected;
    }
  
    draw(ctx) {
      ctx.fillStyle = this.selected ? 'green' : 'blue';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.fill();
    }
  
    isInside(x, y) {
      const dx = x - this.x;
      const dy = y - this.y;
      return (dx * dx + dy * dy) <= this.radius * this.radius;
    }
  }
  