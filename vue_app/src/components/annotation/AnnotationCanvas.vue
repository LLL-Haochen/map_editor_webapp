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
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['points'])
    },
    mounted() {
      this.setupCanvas();
    },
    methods: {
      ...mapActions(['addPoint', 'toggleSelection', 'clearPoints']),
      setupCanvas() {
        const canvas = this.$refs.interactiveCanvas;
        if (canvas) {
          this.ctx = canvas.getContext('2d');
          this.drawPoints();  // Redraw all points
        } else {
          console.error('Canvas element is not yet available');
        }
      },
      drawPoints() {
        this.ctx.clearRect(0, 0, 400, 400);
        this.points.forEach((point, index) => {
          point.draw(this.ctx);
        });
      },
      handleCanvasClick(e) {
        const rect = this.$refs.interactiveCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const pointIndex = this.points.findIndex(point => point.isInside(mouseX, mouseY));
  
        if (pointIndex !== -1) {
          this.toggleSelection(pointIndex);
        } else {
          this.addPoint({ x: mouseX, y: mouseY });
        }
  
        this.drawPoints();
      }
    }
  };
  </script>
  