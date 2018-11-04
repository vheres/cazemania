
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AdminRenderCases from './AdminRenderCases'
import AdminRenderCatalogue from './AdminRenderCatalogue'

class Admin extends Component {

    state={data: [], brands: [], types: [], typeselect: [""], caseselect: {soft: 0, hard: 0}, addCase: 0, addCatalogue:0}
    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        axios.get(API_URL_1 + "/admin/" + this.props.match.params.table)
        .then((res)=>{
            console.log(res.data)
            this.setState({data:res.data.items, brands: res.data.brands, type: res.data.type})
            if(this.props.match.params.table === "cases"){
                this.typeFilter()
            }
        })
    }

    onTableSelect(TABLE_NAME){
        var url = "/Admin/" + TABLE_NAME
        axios.get(API_URL_1 + "/admin/" + TABLE_NAME)
        .then((res)=>{
            console.log(res.data)
            this.setState({data:res.data.items, brands: res.data.brands, type: res.data.type})
        })
        this.props.history.push(url)
    }

    tableSelectOptions(){
        if(this.props.match.params.table === "cases"){
            return(
                <select ref="table_select" onChange={()=>this.onTableSelect(this.refs.table_select.value)}>
                    <option value="catalogue">Catalogue</option>
                    <option value="cases" selected="selected">Case Types</option>
                </select>
            )
        }
        else{
            return(
                <select ref="table_select" onChange={()=>this.onTableSelect(this.refs.table_select.value)}>
                    <option value="catalogue">Catalogue</option>
                    <option value="cases">Case Types</option>
                </select>
            )
        }
    }

    brandSelectOptions(){
        if(this.props.match.params.table === "cases"){
            console.log(this.state.brands)
            var arrJSX = this.state.brands.map((item)=>{ 
                return(
                    <option value={item.id}>{item.name}</option>)
            })
            return(
                <select ref="brand_select" onChange={()=>this.typeFilter()}>
                    <option value={0}>--SELECT BRAND--</option>
                    {arrJSX}
                </select>
            )
        }
    }
    
    brandSelectOptionsAdd(){
        console.log(this.state.brands)
        var arrJSX = this.state.brands.map((item)=>{ 
            return(
                <option value={item.id}>{item.name}</option>)
        })
        return(
            <select ref="brand_selectAdd" className="col-md-4 m-t-sm m-r-sm">
                <option value={0}>--SELECT BRAND--</option>
                {arrJSX}
            </select>
        )
    }


    typeFilter(){
        var data = this.state.type
        console.log(data)
        var tempArr = new Array
        for(var num in data){
            if(data[num].brand_id === parseInt(this.refs.brand_select.value)){
                tempArr.push(data[num])
            }
        }

        //optional if you want to hide empty dropdown
        // if(this.refs.brand_select.value == 0){
        //     this.setState({typeselect: [""]})
        // }
        // else{
        //     this.setState({typeselect: tempArr})
        // }

        this.setState({typeselect: tempArr})
        
        
    }
    
    // typeSelectOptions(){
    //     var arrJSX = this.state.typeselect.map((item)=>{ return(
    //         <option value={item.id}>{item.name}</option>)
    //     })
    //     console.log(this.state.typeselect)
    //     //optional if you want to hide empty dropdown
    //     // if(this.state.typeselect[0] != ""){
    //     //     return(
    //     //     <select ref="type_select">
    //     //         <option value={0}>--SELECT TYPE--</option>
    //     //         {arrJSX}
    //     //     </select>
    //     //     )
    //     // }
    //     return(
    //     <select ref="type_select" style={{width:250}} onChange={()=>this.onTypeSelect()}>
    //         <option value={0}>----------SELECT TYPE----------</option>
    //         {arrJSX}
    //     </select>
    //     )
    // }

    // onTypeSelect(){
    //     var data = this.state.type
    //     var tempVar = {soft: 0, hard: 0}
    //     for(var num in data){
    //         if(data[num].id === parseInt(this.refs.type_select.value)){
    //             tempVar = data[num]
    //         }
    //     }
    //     this.setState({caseselect: tempVar})
    // }

    // caseSelectOptions(){
    //     return(
    //         [
    //             [
    //                 <select ref="case_select">
    //                     <option value={0}>----------SELECT CASE----------</option>
    //                     <option value="hard" disabled>HARD CASE -- unavailable</option>
    //                     <option value="soft" disabled>SOFT CASE -- unavailable</option>
    //                 </select>,
    //                 <select ref="case_select">
    //                     <option value={0}>----------SELECT CASE----------</option>
    //                     <option value="hard" disabled>HARD CASE -- unavailable</option>
    //                     <option value="soft" >SOFT CASE</option>
    //                 </select>
    //             ],
    //             [
    //                 <select ref="case_select">
    //                     <option value={0}>----------SELECT CASE----------</option>
    //                     <option value="hard">HARD CASE</option>
    //                     <option value="soft"  disabled>SOFT CASE -- unavailable</option>
    //                 </select>,
    //                 <select ref="case_select">
    //                     <option value={0}>----------SELECT CASE----------</option>
    //                     <option value="hard">HARD CASE</option>
    //                     <option value="soft">SOFT CASE</option>
    //                 </select>
    //             ]
    //         ]
    //     )

    // }

    renderCaseHead(){
        return(
            <thead>
                <tr>
                <th style={{width: "2%"}}>ID</th>
                <th style={{width: "8%"}}>Name</th>
                <th style={{width: "10%"}}>Soft</th>
                <th style={{width: "10%"}}>Hard</th>
                <th style={{width: "20%"}}>Actions</th>
                </tr>
            </thead>
        )
    }

    renderDataTableCases(){
        var arrJSX = this.state.typeselect.map((item)=>{
            return(
            <AdminRenderCases key={item.id} id={item.id} name={item.name} soft={item.soft} hard={item.hard} table={this.props.match.params.table} refresh={()=>this.refreshData()}/>
            )
        })
        return arrJSX
    }

    renderCatalogueHead(){
        return(
            <thead>
                <tr>
                <th style={{width: "2%"}}>ID</th>
                <th style={{width: "8%"}}>Code</th>
                <th style={{width: "10%"}}>Name</th>
                <th style={{width: "10%"}}>Image</th>
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
            {
                catalogue: ()=> {
                    return(
                        <table className="table table-striped m-b-none">
                            {this.renderCatalogueHead()}
                            <tbody>
                            {this.renderDataTableCatalogue()}
                            </tbody>
                        </table>
                )},
                cases: ()=> {
                    return(
                        <table className="table table-striped m-b-none">
                            {this.renderCaseHead()}
                            <tbody>
                            {this.renderDataTableCases()}
                            </tbody>
                        </table>
                )}
            }
        )
    }

    renderAddCaseType(){
        if(this.props.match.params.table === "cases"){
            if(this.state.addCase === 0){
                return(
                    <input type="button" value="Tambah Tipe Case" className="btn btn-info" style={{"margin-left": "10px"}} onClick={()=>this.onAddCaseTypeClick()}/>
                )
            }
            else{
                return(
                    <div className=""style={{width: "50%"}}>
                    <section className="vbox panel bg-white padder-v">
                        {this.brandSelectOptionsAdd()}
                        <input type="text" className="col-md-4 m-t-sm" ref="addCaseTypeName" placeholder="Input Nama Tipe HP"/>
                        <div className="checkbox m-l col-md-2">
                          <label className="i-checks" style={{"padding-right":"10px"}} >
                            <input type="checkbox" name="caseType" ref="addSoft" /><i></i> Soft Case
                          </label>
                          <label className="i-checks">
                            <input type="checkbox" name="caseType" ref="addHard" /><i></i> Hard Case
                          </label>
                        </div>
                        <input type="button" value="Submit" className="btn btn-success col-md-1" onClick={()=>this.onSubmitCaseTypeClick()}/>
                        <input type="button" value="Cancel" className="btn btn-warning col-md-1" onClick={()=>this.onCancelCaseTypeClick()}/>
                    </section>
                    </div>
                )
            }
        }
    }

    renderAddCatalogue(){
        if(this.props.match.params.table === "catalogue"){
            if(this.state.addCatalogue === 0){
                return(
                    <input type="button" value="Tambah Catalogue" className="btn btn-info" style={{"margin-left": "10px"}} onClick={()=>this.onAddCatalogueClick()}/>
                )
            }
            else{
                return(
                    <div className=""style={{width: "50%"}}>
                    <section className="vbox panel bg-white padder-v">
                        <input type="text" className="col-md-3 m-t-sm" ref="addCatalogueCode" placeholder="Input Kode Produk"/>
                        <input type="text" className="col-md-3 m-t-sm" ref="addCatalogueName" placeholder="Input Nama Produk"/>
                        <input type="file" className="col-md-4 m-t-sm" ref="addCatalogueImage" id="addCatalogueImage"/>
                        <input type="button" value="Submit" className="btn btn-success col-md-1" onClick={()=>this.onSubmitCatalogueClick()}/>
                        <input type="button" value="Cancel" className="btn btn-warning col-md-1" onClick={()=>this.onCancelCatalogueClick()}/>
                    </section>
                    </div>
                )
            }
        }
    }

    onAddCaseTypeClick(){
        this.setState({addCase: 1})
    }

    onAddCatalogueClick(){
        this.setState({addCatalogue: 1})
    }

    onSubmitCaseTypeClick(){
        var softValue = 0
        var hardValue = 0
        if(this.refs.addSoft.checked){
            softValue = 1
        }
        if(this.refs.addHard.checked){
            hardValue = 1
        }

        if(this.refs.brand_selectAdd.value === "0"){
            alert("Pilih Brand Untuk Tambah Tipe Case")
        }
        else if(this.refs.addCaseTypeName.value === ""){
            alert("Isi nama tipe HP")
        }
        else if(!this.refs.addSoft.checked && !this.refs.addHard.checked){
            alert("Pilih Jenis Case (Soft/Hard/Both)")
        }
        else{
            axios.post(API_URL_1 + "/admin/addcases",{
                name: this.refs.addCaseTypeName.value,
                brand_id: this.refs.brand_selectAdd.value,
                soft: softValue,
                hard: hardValue
            })
            .then((res) =>{
                console.log(res)
                this.setState({addCase: 0})
                this.refreshData()
                alert("Tambah Tipe Case Berhasil")
            })
        } 
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
                image: this.refs.addCatalogueCode.value
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

    onCancelCaseTypeClick(){
        this.setState({addCase: 0})
    }

    onCancelCatalogueClick(){
        this.setState({addCatalogue: 0})
    }

    render(){
        return(
            <div>
            <div style={{"padding-top":"15px"}} className="col-md-push-2 col-md-8">
                {this.tableSelectOptions()}
                {this.brandSelectOptions()}
                {this.renderAddCaseType()}
                {this.renderAddCatalogue()}
                {this.renderFullTableData()[this.props.match.params.table]()}
            </div>
            </div>
        )
    }
}


export default Admin;