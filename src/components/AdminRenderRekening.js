import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class AdminRenderRekening extends Component {
    state = {edit: 0}

    onEditClick(){
        this.setState({edit:1})
    }
    onCancelClick(){
        this.setState({edit:0})
    }

    onSaveClick(){
        axios.put(API_URL_1 + "/admin/rekening/" + this.props.id,
            {
                nama: this.refs.editNama,
                nomor_rekening:this.refs.editRekening
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

    renderPage(){
        return(
            [
                <tr>
                <td>{this.props.nama}</td>
                <td>{this.props.nomor_rekening}</td>
                <td>
                    <input type="button" className="btn btn-success" style={{width: 70}} onClick={()=>this.onEditClick()} value="Edit"/>
                </td>
                </tr>,
                <tr>
                <td><input type="text" ref="editNama"  defaultValue={this.props.nama}/></td>
                <td><input type="number" ref="editRekening"  defaultValue={this.props.nomor_rekening}/></td>
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

export default AdminRenderRekening