import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Panel, PanelGroup, Modal, Button} from 'react-bootstrap'

class AdminRenderPremiumThumbnails extends Component {
    state={edit:0}

    onEditClick() {
        this.setState({edit: 1})
    }

    onCancelClick() {
        this.setState({edit: 0})
    }

    onSaveClick() {
        var formData = new FormData()
        var data = {
            name: this.props.name
        }
        document.getElementById('addImage0')?formData.append('file1',document.getElementById('addImage0').files[0]):null;
        document.getElementById('addImage1')?formData.append('file2',document.getElementById('addImage1').files[0]):null;
        document.getElementById('addImage2')?formData.append('file3',document.getElementById('addImage2').files[0]):null;
        formData.append('data', JSON.stringify(data))
        var config = {
            headers: 
              {'Content-Type': 'multipart/form-data'}
        }
        axios.put(API_URL_1 + "/admin/editGambarPremium/" + this.props.id, formData, config)
        .then((res)=>{
            console.log(res)
            alert("SUCCESS")
            this.props.refresh()
            this.setState({edit:0})
        })
        .catch((err)=>{
            console.log(err)
            alert("ERROR")
        })
    }

    renderPage() {
        var arrJSX=[];
        if (this.state.edit === 0) {
            this.props.thumbnails.map((item,index)=>{
                arrJSX.push(<img src={API_URL_1 + "/premium/" + item.image + '.jpg'} alt={item.image} style={{width:"150px"}}/>)
            })
        } else if (this.state.edit === 1) {
            for (var i = 0; i < 3; i++) {
                arrJSX.push(<div style={{display:'inline-block'}}>gambar {i+1}</div>)
                arrJSX.push(<div style={{display:'inline-block', marginLeft:'20px'}}><input type="file" id={`addImage${i}`} ref={`addImage${i}`}/></div>)
                arrJSX.push(<br/>)
            }
        }
        return (
            [
            <tr>
                <td colSpan={4}>
                    {arrJSX}
                </td>
                <td>
                    <input type="button" className="btn btn-warning" value="Edit gambar" onClick={()=>this.onEditClick()}/>
                </td>
            </tr>,
            <tr>
                <td colSpan={4}>
                    {arrJSX}
                </td>
                <td>
                    <input type="button" className="btn btn-success" value="Save" onClick={()=>this.onSaveClick()}/> 
                    <input type="button" className="btn btn-warning" value="Cancel" onClick={()=>this.onCancelClick()}/>
                </td>
            </tr>
            ]
        )
    }

    render(){
        console.log(this.props.thumbnails)
        return(
            this.renderPage()[this.state.edit]
        )
    }
}

export default AdminRenderPremiumThumbnails