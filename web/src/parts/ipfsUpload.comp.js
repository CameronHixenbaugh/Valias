import React, { Component } from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



var hash;


class IpfsUpload extends Component {
    constructor(props) {
      super(props);
        this.state = {
          selectedFile: null,
          loaded:0
        }
    }
    
    checkMimeType=(event)=>{
      //getting file object
      let files = event.target.files 
      //define message container
      let err = []
      // list allow mime type
     const types = ['image/png', 'image/jpeg', 'image/gif']
      // loop access array
      //for(var x = 0; x<files.length; x++) {
       // compare file type find doesn't matach
           if (types.every(type => files[0].type !== type)) {
           // create error message and assign to container   
           err[0] = files[0].type+' is not a supported format\n';
         }
       //};
       for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
           // discard selected file
          toast.error(err[z])
          event.target.value = null
      }
     return true;
    }
    maxSelectFile=(event)=>{
      let files = event.target.files
          if (files.length > 1) { 
             const msg = 'Only 1 image can be uploaded at a time'
             event.target.value = null
             toast.warn(msg)
             return false;
        }
      return true;
   }
   checkFileSize=(event)=>{
    let files = event.target.files
    let size = 2000000 
    let err = []; 
    for(var x = 0; x<files.length; x++) {
    if (files[x].size > size) {
     err[x] = files[x].type+'is too large, please pick a smaller file\n';
   }
  };
  for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
    // discard selected file
   toast.error(err[z])
   event.target.value = null
  }
  return true;
  }
  onChangeHandler=event=>{
    var files = event.target.files
    if(this.maxSelectFile(event) && this.checkMimeType(event) &&    this.checkFileSize(event)){ 
    // if return true allow to setState
       this.setState({
       selectedFile: files,
       loaded:0
    })
  }
  }
    onClickHandler = () => {
      const data = new FormData() 
      if(this.state.selectedFile == null){
        toast.error('You must select a file')
      } else {
        for(var x = 0; x<this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }
        //To use locally
        //axios.post("http://localhost:8000/upload", data, {
        //With heroku
        axios.post("https://vaultv2.herokuapp.com:8000/upload" || "https://valias.io:8000/upload", data, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                })
            },
        })
            .then(res => { // then print response status
                hash = res.data
                this.props.parentCallback(this.setState({showHide3: true}))
                toast.success('upload success')
            })
            .catch(err => { // then print response status
                toast.error('upload fail')
                console.log(err)
            })
        }
      }
  
    render() {
      return (
        <div className="container">
            <div className="row">
              <div className="offset-md-3 col-md-6">
                 <div className="form-group files">
                  <label style={{color:"white"}}>Upload Your File </label>
                  <input type="file" className="form-control" multiple onChange={this.onChangeHandler} 
                    style={{"outline": "2px dashed #92b0b3",
                        "outlineOffset": "-10px",
                        "WebkitTransition": "outline-offset .15s ease-in-out, background-color .15s linear",
                        "transition": "outline-offset .15s ease-in-out, background-color .15s linear",
                        "padding": "120px 0px 85px 35%",
                        "textAlign": "center !important",
                        "backgroundColor":"black",
                        "color":"white",
                        "margin": "0",
                        "width": "100% !important"}}/>
                </div>  
                <div className="form-group">
                <ToastContainer />
                <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
          
                </div> 
                
                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
  
            </div>
        </div>
        </div>
      );
    }
  }
  export {hash};
  export default IpfsUpload;