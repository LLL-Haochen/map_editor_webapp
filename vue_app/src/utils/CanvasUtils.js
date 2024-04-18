// canvasUtils.js
export function setupCanvas(canvasRef) {
    const canvas = canvasRef;
    if (!canvas) {
      console.error('Canvas element is not yet available');
      return null;
    }
    const ctx = canvas.getContext('2d');
    return ctx;
  }
  
  export function redrawCanvas(ctx, img, shapes, previewLine, canvasWidth, canvasHeight) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (img) {
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    }
    drawAllShapes(ctx, shapes);
    drawPreview(ctx, previewLine);
  }
  
  export function drawAllShapes(ctx, { points, lines, polygons }) {
    points.forEach(point => point.draw(ctx));
    lines.forEach(line => line.draw(ctx));
    polygons.forEach(polygon => polygon.draw(ctx));
  }
  
  export function drawPreview(ctx, previewLine) {
    if (!previewLine) return;
    ctx.beginPath();
    ctx.moveTo(previewLine.startX, previewLine.startY);
    ctx.lineTo(previewLine.endX, previewLine.endY);
    ctx.strokeStyle = '#ff0000';  // Red color for the preview line
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  
  export function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
  }
  