// interactionUtils.js
export function getMousePosition(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    return { mouseX: e.clientX - rect.left, mouseY: e.clientY - rect.top };
  }
  
  export function handleShapeClick(tool, position, context) {
    const { mouseX, mouseY } = position;
    switch (tool) {
      case 'point':
        handlePointClick(mouseX, mouseY, context);
        break;
      case 'line':
        handleLineClick(mouseX, mouseY, context);
        break;
      case 'polygon':
        handlePolygonClick(mouseX, mouseY, context);
        break;
    }
  }
  
  export function handlePointClick(mouseX, mouseY, context) {
    context.addPoint({ x: mouseX, y: mouseY });
  }
  
  export function handleLineClick(mouseX, mouseY, context) {
    if (!context.currentLine) {
      context.currentLine = { startX: mouseX, startY: mouseY };
    } else {
      context.addLine({
        startX: context.currentLine.startX,
        startY: context.currentLine.startY,
        endX: mouseX,
        endY: mouseY
      });
      context.currentLine = null;  // Reset after drawing the line
      context.previewLine = null;  // Clear preview after drawing
    }
  }
  
  export function handlePolygonClick(mouseX, mouseY, context) {
    context.currentPolygon.push({ x: mouseX, y: mouseY });
    context.previewLine = null;  // Clear any existing preview lines
  }
  
  