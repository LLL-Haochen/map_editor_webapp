<template>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </template>
  
  <script>
  export default {
    props: {
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      }
    },
    mounted() {
      this.initializeCanvas();
    },
    methods: {
      initializeCanvas() {
        const canvas = this.$refs.canvas;
        if (!canvas) {
          console.error('Canvas element is not yet available');
          return;
        }
        this.ctx = canvas.getContext('2d');
        this.clearCanvas();
      },
      clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
    },
    data() {
      return {
        ctx: null
      };
    }
  };
  </script>
  