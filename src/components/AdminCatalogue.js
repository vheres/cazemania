
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AdminRenderCatalogue from './AdminRenderCatalogue'

class AdminCatalogue extends Component {

    state={ data: [], addCatalogue:0 }
    componentWillMount(){
        this.refreshData()
    }

    sorter(fn, array){ 
        for (let i = 0; i < array.length-1; i ++){
            for (let j = i+1; j < array.length; j++){
                if(fn(array[i],array[j])){
                    var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                }
            }
        }
        return array;
    }

    sortAsc(param){
        var sortedArr = this.sorter(function(a,b){
            return  (a[param] > b[param]) ;
            },this.state.data);
        this.setState({data : sortedArr})
    }
    sortDesc(param){
        var sortedArr = this.sorter(function(a,b){
            return  (a[param] < b[param]) ;
            },this.state.data);
        this.setState({data : sortedArr})
    }

    refreshData(){
        axios.get(API_URL_1 + "/admin/catalogue")
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
                    <th style={{width: "10%"}}>Code <i class="fa fa-sort-amount-asc m-r-sm th-sortable" onClick={()=>this.sortAsc("code")}/><i class="fa fa-sort-amount-desc th-sortable" onClick={()=>this.sortDesc("code")}/></th>
                    <th style={{width: "15%"}}>Name <i class="fa fa-sort-amount-asc m-r-sm th-sortable" onClick={()=>this.sortAsc("name")}/><i class="fa fa-sort-amount-desc th-sortable" onClick={()=>this.sortDesc("name")}/></th>
                    <th style={{width: "15%"}}>Image </th>
                    <th style={{width: "15%"}}>Sales <i class="fa fa-sort-amount-asc m-r-sm th-sortable" onClick={()=>this.sortAsc("sales")}/><i class="fa fa-sort-amount-desc th-sortable" onClick={()=>this.sortDesc("sales")}/></th>
                    <th style={{width: "15%"}}>Actions </th>
                </tr>
            </thead>
        )
    }

    renderDataTableCatalogue(){
        var arrJSX = this.state.data.map((item)=>{
            return(
            <AdminRenderCatalogue key={item.id} id={item.id} code={item.code} name={item.name} image={item.image} sales={item.sales} table={this.props.match.params.table} refresh={()=>this.refreshData()}/>
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


export default AdminCatalogue;