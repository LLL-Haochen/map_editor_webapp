<template>
    <div class="annotation-view">
      <h1>Annotation Tool</h1>
      <annotation-component></annotation-component>
    </div>
  </template>
  
  <script>
  import AnnotationComponent from '@/components/annotation/AnnotationCanvas.vue'; // Adjust the path as necessary
  
  export default {
    components: {
      AnnotationComponent  // Registering AnnotationComponent for use in this template
    }
  }
  </script>
  
  <style>
  .annotation-view {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  