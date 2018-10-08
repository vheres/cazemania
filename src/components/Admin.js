
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AdminRenderCases from './AdminRenderCases'
import AdminRenderCatalogue from './AdminRenderCatalogue'

class Admin extends Component {

    state={data: [], brands: [], types: [], typeselect: [""], caseselect: {soft: 0, hard: 0}}
    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        axios.get(API_URL_1 + "/admin/" + this.props.match.params.table)
        .then((res)=>{
            console.log(res.data)
            this.setState({data:res.data.items, brands: res.data.brands, type: res.data.type})
            this.typeFilter()
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
    typeSelectOptions(){
        var arrJSX = this.state.typeselect.map((item)=>{ return(
            <option value={item.id}>{item.name}</option>)
        })
        console.log(this.state.typeselect)
        //optional if you want to hide empty dropdown
        // if(this.state.typeselect[0] != ""){
        //     return(
        //     <select ref="type_select">
        //         <option value={0}>--SELECT TYPE--</option>
        //         {arrJSX}
        //     </select>
        //     )
        // }
        return(
        <select ref="type_select" style={{width:250}} onChange={()=>this.onTypeSelect()}>
            <option value={0}>----------SELECT TYPE----------</option>
            {arrJSX}
        </select>
        )
    }

    onTypeSelect(){
        var data = this.state.type
        var tempVar = {soft: 0, hard: 0}
        for(var num in data){
            if(data[num].id === parseInt(this.refs.type_select.value)){
                tempVar = data[num]
            }
        }
        this.setState({caseselect: tempVar})
    }

    caseSelectOptions(){
        return(
            [
                [
                    <select ref="case_select">
                        <option value={0}>----------SELECT CASE----------</option>
                        <option value="hard" disabled>HARD CASE -- unavailable</option>
                        <option value="soft" disabled>SOFT CASE -- unavailable</option>
                    </select>,
                    <select ref="case_select">
                        <option value={0}>----------SELECT CASE----------</option>
                        <option value="hard" disabled>HARD CASE -- unavailable</option>
                        <option value="soft" >SOFT CASE</option>
                    </select>
                ],
                [
                    <select ref="case_select">
                        <option value={0}>----------SELECT CASE----------</option>
                        <option value="hard">HARD CASE</option>
                        <option value="soft"  disabled>SOFT CASE -- unavailable</option>
                    </select>,
                    <select ref="case_select">
                        <option value={0}>----------SELECT CASE----------</option>
                        <option value="hard">HARD CASE</option>
                        <option value="soft">SOFT CASE</option>
                    </select>
                ]
            ]
        )

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
    render(){
        return(
            <div>
                {this.tableSelectOptions()}
                {this.brandSelectOptions()}
                {this.typeSelectOptions()}
                {this.caseSelectOptions()[this.state.caseselect.hard][this.state.caseselect.soft]}
                {this.renderFullTableData()[this.props.match.params.table]()}
            </div>
        )
    }
}


export default Admin;