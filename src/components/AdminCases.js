
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AdminRenderCases from './AdminRenderCases'
import AdminRenderCatalogue from './AdminRenderCatalogue'

class AdminCases extends Component {

    state={data: [], brands: [], types: [], typeselect: [""], caseselect: {soft: 0, hard: 0}, addCase: 0}
    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        axios.get(API_URL_1 + "/admin/cases")
        .then((res)=>{
            console.log(res.data)
            this.setState({data:res.data.items, brands: res.data.brands, type: res.data.type})
            this.typeFilter()
        })
    }

    brandSelectOptions(){
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

        this.setState({typeselect: tempArr})
        
        
    }

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

    renderFullTableData(){
        return(
            <table className="table table-striped m-b-none">
                {this.renderCaseHead()}
            <tbody>
                {this.renderDataTableCases()}
            </tbody>
            </table>
        )
    }

    renderAddCaseType(){
        if(this.state.addCase === 0){
            return(
                <input type="button" value="Tambah Tipe Case" className="btn btn-info" style={{"margin-left": "10px"}} onClick={()=>this.onAddCaseTypeClick()}/>
            )
        }
        else{
            return(
                <div className="col-md-10" style={{width: "100%"}}>
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

    onAddCaseTypeClick(){
        this.setState({addCase: 1})
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

    onCancelCaseTypeClick(){
        this.setState({addCase: 0})
    }

    render(){
        return(
            <div>
            <div style={{"padding-top":"15px"}} className="col-md-12">
                <div>
                    {this.renderAddCaseType()}
                </div>
                <div style={{"padding-top":"15px"}}>
                    {this.brandSelectOptions()}
                    {this.renderFullTableData()}
                </div>
            </div>
            </div>
        )
    }
}


export default AdminCases;