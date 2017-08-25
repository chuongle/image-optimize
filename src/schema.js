const schema = {
  title: "Image Optimize",
  type: "object",
  required: ["images"],
  properties: {
    images: {
      type: "array", 
      title: "Images", 
      items: {
        "type": "string",
        "format": "data-url"
      }
    }
  }
};

export default schema;