import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class AdminRenderCatalogue extends Component {
    state = {edit: 0}

    onEditClick(){
        this.setState({edit:1})
    }
    onCancelClick(){
        this.setState({edit:0})
    }

    onSaveClick(){
        var formData = new FormData()
        var data = {
            code: this.refs.editCode.value,
            name: this.refs.editName.value,
            image: this.props.image
        }
        if(document.getElementById('editImage')){
            formData.append('file', document.getElementById('editImage').files[0])
        }
        formData.append('data', JSON.stringify(data))
        console.log(formData)
        var config = {
            headers: 
              {'Content-Type': 'multipart/form-data'}
        }

        axios.put(API_URL_1 + "/admin/catalogue/" + this.props.id, formData, config)
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

    onDeleteClick(){
        if(window.confirm("Are you sure you want to delete entry? This action cannot be reversed")){
            var data = {image: this.props.image}
            axios.post(API_URL_1 + "/admin/deletecatalogue/" + this.props.id, data)
            .then((res)=>{
                console.log(res)
                alert("DELETE SUCCESS")
                this.props.refresh()
                this.setState({edit:0})
            })
            .catch((err)=>{
                console.log(err)
                alert("ERROR")
            })
        }
    }
    
    renderPage(){
        return(
            [
                <tr>
                <td>{this.props.id}</td>
                <td>{this.props.code}</td>
                <td>{this.props.name}</td>
                <td><img src={API_URL_1 + "/normal/" + this.props.image + '.jpg'} alt={this.props.image} style={{width:"70%"}}/></td>
                <td>{this.props.sales}</td>
                <td>
                    <input type="button" className="btn btn-success" style={{width: 70}} onClick={()=>this.onEditClick()} value="Edit"/>
                    <br/>
                    <input type="button" className="btn btn-danger" style={{width: 70}} onClick={()=>this.onDeleteClick()} value="Delete"/>
                </td>
                </tr>,
                <tr>
                <td>{this.props.id}</td>
                <td><input type="text" ref="editCode"  defaultValue={this.props.code}/></td>
                <td><input type="text" ref="editName"  defaultValue={this.props.name}/></td>
                <td><input type="file" id="editImage" ref="editImage"/></td>
                <td>{this.props.sales}</td>
                <td>
                    <input type="button" className="btn btn-primary" style={{width: 70}} onClick={()=>this.onSaveClick()} value="Save"/>
                    <br/>
                    <input type="button" className="btn btn-warning" style={{width: 70}} onClick={()=>this.onCancelClick()} value="Cancel"/>
                </td>
                </tr>
            ]
        )
    }
  
    render(){
        return(
            this.renderPage()[this.state.edit]
        )
    }
}

export default AdminRenderCatalogue