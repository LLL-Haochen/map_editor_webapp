<template>
    <canvas
      ref="interactiveCanvas"
      width="400"
      height="400"
      style="border:1px solid #000000;"
      @click="handleCanvasClick"
    ></canvas>
    <div>
      <input type="file" @change="uploadImage" accept="image/png"/>
      <v-btn color="primary" @click="setTool('point')">Draw Points</v-btn>
      <v-btn color="primary" @click="setTool('line')">Draw Lines</v-btn>
      <v-btn color="primary" @click="setTool('polygon')">Draw Polygons</v-btn>
      <v-btn color="secondary" @click="finalizePolygon">Finalize Polygon</v-btn>
      <v-btn color="error" @click="clearCanvas">Clear Canvas</v-btn>
    </div>
</template>

  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        tool: 'point',  // 'point', 'line', 'polygon'
        currentPolygon: [], // Temporary storage for the current polygon being drawn
        currentLine: null, // Temporary storage for the current line being drawn
        img: null,
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
    console.log(this.points);  // Check if points are defined
    console.log(this.lines);   // Check if lines are defined
    console.log(this.polygons); 
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
          console.log("Setting tool from", this.tool, "to", tool);
        },
      setupCanvas() {
        const canvas = this.$refs.interactiveCanvas;
        if (canvas) {
          this.ctx = canvas.getContext('2d');
          this.redrawCanvas();  // Redraw all drawable elements
        } else {
          console.error('Canvas element is not yet available');
        }
      },
      uploadImage(event) {
        const file = event.target.files[0];
        if (file.type !== "image/png") {
            alert("Please upload a PNG image.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.img = img; // Save the loaded image to the img data property
                this.redrawCanvas(); // Redraw canvas to display the image immediately after loading
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
},
      handleCanvasClick(e) {
      const rect = this.$refs.interactiveCanvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      console.log(this.tool);  // Check if points are defined
      console.log(mouseX, mouseY);  // Check if points are defined
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
    handlePointClick(mouseX, mouseY) {
      const pointIndex = this.points.findIndex(point => point.isInside(mouseX, mouseY));
      if (pointIndex !== -1) {
        this.togglePointSelection(pointIndex);
      } else {
        this.addPoint({ x: mouseX, y: mouseY });
      }
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
        this.currentLine = null;
      }
    },
    handlePolygonClick(mouseX, mouseY) {
      this.currentPolygon.push({ x: mouseX, y: mouseY });
      console.log(this.currentPolygon);
    },
    finalizePolygon() {
        console.log("Current state polygons before adding new:", this.polygons);
      if (this.currentPolygon.length > 2) {
        console.log("Current:", this.currentPolygon);
        this.addPolygon({ vertices: this.currentPolygon });
      }
      this.currentPolygon = [];
        console.log("Current state polygons after adding new:", this.polygons[0].points);
    },
    redrawCanvas() {
    const ctx = this.$refs.interactiveCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.$refs.interactiveCanvas.width, this.$refs.interactiveCanvas.height);

    if (this.img) {
        ctx.drawImage(this.img, 0, 0, this.$refs.interactiveCanvas.width, this.$refs.interactiveCanvas.height);
    }

    // Draw all points
    this.points.forEach(point => {
        point.draw(ctx);
    });

    // Draw all lines
    this.lines.forEach(line => {
        line.draw(ctx);
    });

    // Draw all polygons
    this.polygons.forEach(polygon => {
        polygon.draw(ctx);
    });
},
    clearCanvas() {
      this.$refs.interactiveCanvas.getContext('2d').clearRect(0, 0, 400, 400);
      // Add clearing methods for Vuex states if necessary
    }
  }
};
</script>