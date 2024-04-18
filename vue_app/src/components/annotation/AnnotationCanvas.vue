<template>
    <canvas
      ref="interactiveCanvas"
      width="400"
      height="400"
      style="border:1px solid #000000;"
      @click="handleCanvasClick"
      @mousemove="handleMouseMove"
      @mouseleave="clearPreview"
    ></canvas>
    <div>
      <input type="file" @change="uploadImage" accept="image/png"/>
      <v-btn @click="setTool('point')">Draw Points</v-btn>
      <v-btn @click="setTool('line')">Draw Lines</v-btn>
      <v-btn @click="setTool('polygon')">Draw Polygons</v-btn>
      <v-btn @click="finalizePolygon">Finalize Polygon</v-btn>
      <v-btn @click="clearCanvas">Clear Canvas</v-btn>
    </div>
</template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        tool: 'point',  // 'point', 'line', 'polygon'
        currentPolygon: [],
        currentLine: null,
        img: null,
        previewLine: null,  // Holds the preview line coordinates
      };
    },
    computed: {
      ...mapGetters({
        points: 'getPoints',
        lines: 'getLines',
        polygons: 'getPolygons',
      })
    },
    mounted() {
      this.setupCanvas();
    },
    methods: {
      ...mapActions({
        addPoint: 'addPoint',
        togglePointSelection: 'toggleSelection',
        clearPoints: 'clearPoints',
        addLine: 'addLine',
        addPolygon: 'addPolygon',
        addVertexToPolygon: 'addVertexToPolygon',
      }),
      setTool(tool) {
        this.tool = tool;
      },
      setupCanvas() {
        const canvas = this.$refs.interactiveCanvas;
        if (canvas) {
          this.ctx = canvas.getContext('2d');
          this.redrawCanvas();  // Initial draw
        } else {
          console.error('Canvas element is not yet available');
        }
      },
      uploadImage(event) {
      console.log('Uploading image1',event);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        console.log('Uploading image2',e);
        const img = new Image();
        img.onload = (b) => {
          console.log('Uploading image3',b);
          this.img = img;
          this.$refs.interactiveCanvas.width = img.width;  // Set canvas width to image width
          this.$refs.interactiveCanvas.height = img.height;  // Set canvas height to image height
          this.redrawCanvas();  // Draw the image onto the canvas
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
      handleCanvasClick(e) {
        console.log('handleCanvasClick',e);
        console.log('handleCanvasClick',this.points);
        
        const { mouseX, mouseY } = this.getMousePosition(e);
        switch (this.tool) {
          case 'point':
          
            this.handlePointClick(mouseX, mouseY);
            break;
          case 'line':
            this.handleLineClick(mouseX, mouseY);
            break;
          case 'polygon':
            this.handlePolygonClick(mouseX, mouseY);
            break;
        }
        this.redrawCanvas();
      },
      handleMouseMove(e) {
        if (this.tool === 'line' && this.currentLine) {
        const { mouseX, mouseY } = this.getMousePosition(e);
        this.previewLine = { startX: this.currentLine.startX, startY: this.currentLine.startY, endX: mouseX, endY: mouseY };
        this.redrawCanvas();
        } else if (this.tool === 'polygon' && this.currentPolygon.length > 0) {
        const { mouseX, mouseY } = this.getMousePosition(e);
        // Update the preview line to the current mouse position from the last vertex
        const lastVertex = this.currentPolygon[this.currentPolygon.length - 1];
        this.previewLine = { startX: lastVertex.x, startY: lastVertex.y, endX: mouseX, endY: mouseY };
        this.redrawCanvas();
        }
    },
      handlePointClick(mouseX, mouseY) {
        console.log('handlePointClick',mouseX,mouseY);
        this.addPoint({ x: mouseX, y: mouseY });
      },
      handleLineClick(mouseX, mouseY) {
        if (!this.currentLine) {
          this.currentLine = { startX: mouseX, startY: mouseY };
        } else {
          this.addLine({
            startX: this.currentLine.startX,
            startY: this.currentLine.startY,
            endX: mouseX,
            endY: mouseY
          });
          this.currentLine = null;  // Reset after drawing the line
          this.previewLine = null;  // Clear preview after drawing
        }
      },
      handlePolygonClick(mouseX, mouseY) {
        this.currentPolygon.push({ x: mouseX, y: mouseY });
        this.previewLine = null;
        this.redrawCanvas();
      },
      finalizePolygon() {
        if (this.currentPolygon.length > 2) {
          this.addPolygon({ vertices: this.currentPolygon });
        }
        this.currentPolygon = [];
        this.redrawCanvas();
      },
      redrawCanvas() {
        const ctx = this.$refs.interactiveCanvas.getContext('2d');
        ctx.clearRect(0, 0, this.$refs.interactiveCanvas.width, this.$refs.interactiveCanvas.height);
        if (this.img) {
            ctx.drawImage(this.img, 0, 0, this.$refs.interactiveCanvas.width, this.$refs.interactiveCanvas.height);
        }
        this.points.forEach(point => point.draw(ctx));
        this.lines.forEach(line => line.draw(ctx));
        this.polygons.forEach(polygon => polygon.draw(ctx));
        // Draw polygon preview
        if (this.tool === 'polygon' && this.currentPolygon.length > 0) {
        ctx.beginPath();
        ctx.moveTo(this.currentPolygon[0].x, this.currentPolygon[0].y);
        this.currentPolygon.forEach((vertex, index) => {
            if (index > 0) {
            ctx.lineTo(vertex.x, vertex.y);
            }
        });
        // If there's a preview line (mouse is moving), draw it
        if (this.previewLine) {
            ctx.lineTo(this.previewLine.endX, this.previewLine.endY);
            ctx.lineTo(this.currentPolygon[0].x, this.currentPolygon[0].y); // Close the shape for visual clarity
        }
        ctx.strokeStyle = '#ff0000'; // Red color for the polygon preview
        ctx.lineWidth = 1;
        ctx.stroke();
        }
        if (this.previewLine) {
          ctx.beginPath();
          ctx.moveTo(this.previewLine.startX, this.previewLine.startY);
          ctx.lineTo(this.previewLine.endX, this.previewLine.endY);
          ctx.strokeStyle = '#ff0000';  // Red color for the preview line
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      },
      clearCanvas() {
        this.ctx.clearRect(0, 0, 400, 400);
        this.clearPoints();  // Clear Vuex state for points
      },
      getMousePosition(e) {
        const rect = this.$refs.interactiveCanvas.getBoundingClientRect();
        return { mouseX: e.clientX - rect.left, mouseY: e.clientY - rect.top };
      },
      clearPreview() {
        if (this.previewLine) {
          this.previewLine = null;
          this.redrawCanvas();
        }
      }
    }
};
</script>
