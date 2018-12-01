import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Panel, PanelGroup, Modal, Button} from 'react-bootstrap'

class AdminRenderPremiumCatalogue extends Component {
    state = {edit: 0}

    onEditClick(){
        this.setState({edit:1})
    }
    onCancelClick(){
        this.setState({edit:0})
    }

    onSaveClick(){
        axios.put(API_URL_1 + "/admin/premiuminfo/" + this.props.id,
            {
                code: this.refs.editCode.value,
                name: this.refs.editName.value,
                image: this.refs.editImage.value
            }
        )
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
                <tr style={{backgroundColor:'rgb(134, 204, 216)'}}>
                    <td>{this.props.id}</td>
                    <td>{this.props.code}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.sales}</td>
                    <td>
                        <input type="button" className="btn btn-success" style={{width: 70}} onClick={()=>this.onEditClick()} value="Edit"/>
                        <br/>
                        <input type="button" className="btn btn-danger" style={{width: 70}} onClick={()=>this.onDeleteClick()} value="Delete"/>
                    </td>
                </tr>,
                <tr style={{backgroundColor:'rgb(134, 204, 216)'}}>
                    <td>{this.props.id}</td>
                    <td><input type="text" ref="editCode" defaultValue={this.props.code}/></td>
                    <td><input type="text" ref="editName"  defaultValue={this.props.name}/></td>
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
        return(this.renderPage()[this.state.edit])
    }
}

export default AdminRenderPremiumCatalogue