import React from 'react';
import ImageUploader from 'react-images-upload';
 
class ImageUpload extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = { 
             pictures: [],
             numPicsUploaded: 0                  // keeping track of how many pics uploaded, we only want to add the latest pic
        };
        //  this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop = (picture) => {
        const formData = new FormData();
        formData.append("file", picture[this.state.numPicsUploaded], picture[this.state.numPicsUploaded].name);
        fetch("http://localhost:4000/upload", {
            method: 'post',
            mode: "cors",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            this.numPicsUploaded += picture.length;
            fetch("http://localhost:4000/upload_update_pt", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trainer_id: localStorage.getItem("trainer_id"),             // change this to session when you have implemented
                    filename: data.filename
                })
            })
            window.location.reload(true);
        })
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
 
    render() {
        return (
            <ImageUploader
                withIcon={false}
                buttonText='Upload new profile image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={10242880}
            />
        );
    }
}

export default ImageUpload