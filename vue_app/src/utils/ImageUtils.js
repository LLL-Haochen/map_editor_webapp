// imageUtils.js
export function uploadImage(event, callback) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        callback(img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  