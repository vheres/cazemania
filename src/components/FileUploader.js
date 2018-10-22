import React, {Component} from 'react';
import Upload from 'rc-upload';
import {API_URL_1} from '../supports/api-url/apiurl'
import axios from 'axios'

const style = `
        .rc-upload-disabled {
           opacity:0.5;
        `;

class FileUploader extends Component {
    unggahFile = (file) => {
        var url = `${API_URL_1}/upload`
        var formData = new FormData()
        formData.append('file', file)
        var config = {
          headers: 
            {'Content-Type': 'multipart/form-data'}
        }
        return axios.post(url, formData, config)
        .then((res)=>{console.log(res)})
      }
      render() {
        return (
          <div>

              <form encType="multipart/form-data">
                <input type="file" name="filename"
                onChange={ e => this.unggahFile(e.target.files[0])} 
                accept="image/*"/>
                {/* image/*  , image/png , application/pdf */}
              </form>

              {/* image from backend */}
              {/* <img src="http://localhost:5000/filestorage/fotoid.png" alt="" */}
              {/* style={{width:'50%', height:'50%'}}/> */}
          </div>
        );
      }
}

export default FileUploader