import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class AdminRenderCases extends Component {
    state = {edit: 0}

    onEditClick(){
        this.setState({edit:1})
    }
    onCancelClick(){
        this.setState({edit:0})
    }

    onSaveClick(){
        axios.put("http://localhost:1994" + "/admin/" + this.props.table + "/" + this.props.id,
            {
                name: this.refs.editName.value,
                soft: this.refs.editSoft.value,
                hard: this.refs.editHard.value
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
            axios.delete("http://localhost:1994" + "/admin/" + this.props.table + "/" + this.props.album_id)
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

    renderYN(){
        return(
            ["N","Y"]
        )
    }
    renderPage(){
        return(
            [
                <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.renderYN()[this.props.soft]}</td>
                <td>{this.renderYN()[this.props.soft]}</td>
                <td>
                    <input type="button" className="btn btn-success" style={{width: 70}} onClick={()=>this.onEditClick()} value="Edit"/>
                    <br/>
                    <input type="button" className="btn btn-danger" style={{width: 70}} onClick={()=>this.onDeleteClick()} value="Delete"/>
                </td>
                </tr>,
                <tr>
                <td>{this.props.id}</td>
                <td><input type="text" id="editName" ref="editName" defaultValue={this.props.name} style={{width: 220}}/></td>
                <td>
                    <select id="editSoft" ref="editSoft">
                    <option value={1}>Y</option>
                    <option value={0}>N</option>
                    </select>
                </td>
                <td>
                    <select id="editHard" ref="editHard">
                    <option value={1}>Y</option>
                    <option value={0}>N</option>
                    </select>
                </td>
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

export default AdminRenderCases