
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AdminRenderPremium from './AdminRenderPremium'

class AdminPremium extends Component {

    state={ data: [], addCatalogue:0 }
    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        axios.get(API_URL_1 + "/admin/premium")
        .then((res)=>{
            console.log(res.data)
            this.setState({data:res.data.items})
        })
    }

    onAddCatalogueClick(){
        this.setState({addCatalogue: 1})
    }

    onCancelCatalogueClick(){
        this.setState({addCatalogue: 0})
    }

    onSubmitCatalogueClick(){
        console.log(document.getElementById('addCatalogueImage').files.length)
        
        if(this.refs.addCatalogueCode.value === ""){
            alert("Input Kode Produk")
        }
        else if(this.refs.addCatalogueName.value === ""){
            alert("Input Nama Produk")
        }
        else if(document.getElementById('addCatalogueImage').files.length === 0){
            alert("Input Gambar Produk")
        }
        else{
            var data = {
                code: this.refs.addCatalogueCode.value,
                name: this.refs.addCatalogueName.value,
                image: this.refs.addCatalogueCode.value,
                category: "normal"
            }
            var formData = new FormData()
            formData.append('file', document.getElementById('addCatalogueImage').files[0])
            formData.append('data', JSON.stringify(data))
            console.log(formData)
            var config = {
                headers: 
                  {'Content-Type': 'multipart/form-data'}
            }

            axios.post(API_URL_1 + `/admin/addcatalogue`, formData, config)
            .then((res) => {
                alert('Tambah Catalogue Success!')
                this.refreshData()
            }).catch((err) => {
                alert(err);
            })
        }
    }

    
    renderCatalogueHead(){
        return(
            <thead>
                <tr>
                    <th style={{width: "5%"}}>ID</th>
                    <th style={{width: "15%"}}>Group</th>
                    <th style={{width: "15%"}}>Thumbnail</th>
                    <th style={{width: "15%"}}>Actions</th>
                </tr>
            </thead>
        )
    }

    renderDataTableCatalogue(){
        var arrJSX = this.state.data.map((item)=>{
            return(
            <AdminRenderPremium key={item.id} id={item.id} code={item.code} name={item.name} image={item.image} sales={item.sales} table={this.props.match.params.table} refresh={()=>this.refreshData()}/>
            )
        })
        return arrJSX
    }

    renderFullTableData(){
        return(
            <table className="table table-striped m-b-none">
                {this.renderCatalogueHead()}
            <tbody>
                {this.renderDataTableCatalogue()}
            </tbody>
            </table>
        )
    }
    
    renderAddCatalogue(){
        if(this.state.addCatalogue === 0){
            return(
                <input type="button" value="Tambah Catalogue" className="btn btn-info" style={{"margin-left": "10px"}} onClick={()=>this.onAddCatalogueClick()}/>
            )
        }
        else{
            return(
                <div className=""style={{width: "100%"}}>
                    <section className="vbox panel bg-white padder-v">
                        <div className="col-md-3 m-t-sm"><input type="text" className="form-control" ref="addCatalogueCode" placeholder="Input Kode Produk"/></div>
                        <div className="col-md-3 m-t-sm"><input type="text" className="form-control" ref="addCatalogueName" placeholder="Input Nama Produk"/></div>
                        <div className="col-md-4 m-t-sm"><input type="file" ref="addCatalogueImage" id="addCatalogueImage"/></div>
                        <div className="col-md-1"><input type="button" value="Submit" className="btn btn-success" onClick={()=>this.onSubmitCatalogueClick()}/></div>
                        <div className="col-md-1"><input type="button" value="Cancel" className="btn btn-warning" onClick={()=>this.onCancelCatalogueClick()}/></div>
                    </section>
                </div>
            )
        }
    }


    render(){
        return(
            <div>
            <div style={{"padding-top":"15px"}} className="col-md-12">
                {this.renderAddCatalogue()}
                {this.renderFullTableData()}
            </div>
            </div>
        )
    }
}


export default AdminPremium;