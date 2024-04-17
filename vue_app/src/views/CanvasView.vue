<template>
    <canvas
      ref="interactiveCanvas"
      width="400"
      height="400"
      style="border:1px solid #000000;"
      @click="handleCanvasClick"
    ></canvas>
  </template>
  
  <script>
  import AnnotationCanvas from '@/components/annotation/AnnotationCanvas.vue';
  export default {
    data() {
      return {
        ctx: null,
        radius: 10,
        points: [] // Points are objects { x, y, selected }
      };
    },
    mounted() {
      this.setupCanvas();
    },
    methods: {
      setupCanvas() {
        const canvas = this.$refs.interactiveCanvas;
        if (canvas) {
          this.ctx = canvas.getContext('2d');
          this.drawPoints();  // Call to draw all points
        } else {
          console.error('Canvas element is not yet available');
        }
      },
      drawPoints() {
        this.ctx.clearRect(0, 0, this.$refs.interactiveCanvas.width, this.$refs.interactiveCanvas.height);  // Clear the canvas
        for (let point of this.points) {
          this.ctx.fillStyle = point.selected ? 'blue' : 'red';  // Blue for selected, red otherwise
          this.ctx.beginPath();
          this.ctx.arc(point.x, point.y, this.radius, 0, Math.PI * 2, true);
          this.ctx.fill();
        }
      },
      handleCanvasClick(e) {
        const rect = this.$refs.interactiveCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        let pointFound = false;
  
        for (let point of this.points) {
          const dx = mouseX - point.x;
          const dy = mouseY - point.y;
          if (dx * dx + dy * dy <= this.radius * this.radius) {
            point.selected = !point.selected;  // Toggle selection state
            pointFound = true;
            break;  // Stop checking once we find a point that was clicked
          }
        }
  
        if (!pointFound) {
          // Add new point if no existing point was clicked
          this.points.push({ x: mouseX, y: mouseY, selected: false });
        }
  
        this.drawPoints();
      }
    }
  };
  </script>
  
  <style>
  /* Add styles here if needed */
  </style>
  