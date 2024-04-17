export default {
    points: [],
    radius: 10,
  
    addPoint(x, y) {
      this.points.push({ x, y, selected: false });
    },
  
    toggleSelection(index) {
      const point = this.points[index];
      if (point) {
        point.selected = !point.selected;
      }
    },
  
    getPoints() {
      return this.points;
    },
  
    findPointIndex(x, y) {
      return this.points.findIndex(point => {
        const dx = x - point.x;
        const dy = y - point.y;
        return (dx * dx + dy * dy) <= this.radius * this.radius;
      });
    }
  };
  