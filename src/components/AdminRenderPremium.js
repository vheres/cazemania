import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Panel, PanelGroup, Modal, Button} from 'react-bootstrap'
import AdminRenderPremiumCatalogue from './AdminRenderPremiumCatalogue';

class AdminRenderPremium extends Component {
    state = {data:[], edit: 0}

    componentDidMount(){
        this.refreshData()
    }

    refreshData(){
        axios.get(API_URL_1 + "/admin/premiuminfo/" + this.props.id)
        .then((res)=>{
            this.setState({data:res.data.items})
        })
    }

    onEditClick(){
        this.setState({edit:1})
    }
    onCancelClick(){
        this.setState({edit:0})
    }

    onSaveClick(){
        var formData = new FormData()
        var data = {
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

        axios.put(API_URL_1 + "/admin/editpremiumgroup/" + this.props.id, formData, config)
        .then((res)=>{
            console.log(res)
            alert("SUCCESS")
            this.props.refresh()
            this.refreshData()
            this.setState({edit:0})
        })
        .catch((err)=>{
            console.log(err)
            alert("ERROR")
        })
    }

    onDeleteClick(){
        if(window.confirm("Are you sure you want to delete entry? This action cannot be reversed")){
            axios.delete(API_URL_1 + "/admin/deletepremiumgroup/" + this.props.id)
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

    addPremiumItem() {
        if(this.refs.addCode.value === ""){
            alert("Input Kode Produk")
        }
        else{
            var data = {
                code: this.refs.addCode.value,
                name: this.props.name,
                image: this.props.image,
                category: "premium",
                premium_id: this.props.id
            }
            axios.post(API_URL_1 + `/admin/addpremiumitem`, data)
            .then((res) => {
                alert('Tambah Catalogue Success!')
                this.refreshData()
            }).catch((err) => {
                alert(err);
            })
        }
    }
    
    renderPage(){
        return(
            [
                <tr style={{backgroundColor:'rgb(255, 209, 124)'}}>
                    <td style={{width: "5%"}}>{this.props.id}</td>
                    <td colSpan={2} style={{width: "40%"}}>{this.props.name}</td>
                    <td style={{width: "30%"}}><img src={API_URL_1 + "/premium/" + this.props.image + '.jpg'} alt={this.props.image} style={{width:"40%"}}/></td>
                    <td colSpan={2} style={{width: "25%"}}>
                        <input type="button" className="btn btn-success" style={{width: 70}} onClick={()=>this.onEditClick()} value="Edit"/>
                        <br/>
                        <input type="button" className="btn btn-danger" style={{width: 70}} onClick={()=>this.onDeleteClick()} value="Delete"/>
                    </td>
                </tr>,
                <tr style={{backgroundColor:'rgb(255, 209, 124)'}}>
                    <td style={{width: "5%"}}>{this.props.id}</td>
                    <td style={{width: "20%"}}><input type="text" ref="editName"  defaultValue={this.props.name}/></td>
                    <td colSpan={2} style={{width: "50%"}}><input type="file" id="editImage" ref="editImage"/></td>
                    <td colSpan={2} style={{width: "25%"}}>
                        <input type="button" className="btn btn-primary" style={{width: 70}} onClick={()=>this.onSaveClick()} value="Save"/>
                        <br/>
                        <input type="button" className="btn btn-warning" style={{width: 70}} onClick={()=>this.onCancelClick()} value="Cancel"/>
                    </td>
                </tr>
            ]
        )
    }

    renderPremiumCatalogueHead() {
        return (
            <tr style={{backgroundColor:'rgb(9, 175, 204)', color:'white'}}>
                <th>ID</th>
                <th>Code</th>
                <th>Name</th>
                <th>Sales</th>
                <th>Actions</th>
            </tr>
        )
    }

    renderAddPremiumCatalogue() {
        return (
            <tr style={{backgroundColor:'rgb(134, 204, 216)'}}>
                <td colSpan={3}>
                    Tambah produk ke {this.props.name}
                </td>
                <td><input type="text" ref="addCode" placeholder="Kode produk" style={{width:'100%'}}/></td>
                <td>
                <input type="button" className="btn btn-primary" value="Tambah produk" onClick={()=>this.addPremiumItem()}/>
                </td>
            </tr>
        )
    }

    renderPremiumCatalogueBody() {
        var arrJSX = this.state.data.map((item)=>{
            console.log('catalogue')
            return(
            <AdminRenderPremiumCatalogue key={item.id} id={item.id} code={item.code} name={item.name} image={item.image} sales={item.sales} refresh={()=>this.refreshData()}/>
            )
        })
        return arrJSX
    }
  
    render(){
        return(
        <tr>
            <td colSpan={4} style={{'padding':'0px'}}>
                <table className="table table-striped m-b-none" style={{color:'black'}}>
                    <thead>
                        {this.renderPage()[this.state.edit]}
                        {this.renderPremiumCatalogueHead()}
                    </thead>
                    <tbody>
                        {this.renderPremiumCatalogueBody()}
                        {this.renderAddPremiumCatalogue()}
                    </tbody>
                </table>
            </td>
        </tr>

        )
    }
}

export default AdminRenderPremium