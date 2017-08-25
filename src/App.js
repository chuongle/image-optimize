import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import schema from './schema';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      worker: Worker,
      loader: false
    }
  }

  onSubmit({formData}) {
    this.setState({loader:true})
    const { images } = formData;
    const zip = new JSZip();

    var img = zip.folder("images");

    images.forEach((image, index) => {
      const filename = image.substring(image.indexOf("=")+1, image.lastIndexOf(";"));
      const i = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext('2d');
      i.src = image;
      i.onload = function(){ 
        const ratio = (i.width/i.height);
        canvas.width = 2000;
        canvas.height = Math.round(2000/ratio);
        ctx.drawImage(i, 0, 0, 2000, Math.round(2000/ratio));
        const newImageData = canvas.toDataURL("image/jpeg", 0.9);
        img.file(filename, newImageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""), {base64: true});
      };
    })

    setTimeout(function() {
      zip.generateAsync({type:"blob"})
      .then((content) => {
        FileSaver.saveAs(content, "example.zip");
      });
    },1000)
  }

  render() {
    return (
      <div className="wrapper">
        <Form schema={schema}
          onSubmit={this.onSubmit.bind(this)} />
        {this.state.loader ? <div className="loader"></div> : null}
      </div>
    );
  }
}

export default App;