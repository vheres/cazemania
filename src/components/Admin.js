
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class Admin extends Component {

    state={data: [], brands: [], types: []}
    componentWillMount(){
        axios.get("http://localhost:1994"+ "/admin/cases")
        .then((res)=>{
            console.log(res.data)
            alert("SUCCESS")
            this.setState({data:res.data.items, brands: res.data.brands, type: res.data.type})
        })
    }


    sortType(brand){
        var tempArr = []
        for(var type in this.state.types){
            if(type.name === brand){
                tempArr.push(type)
            }
        }
        console.log

        return tempArr
    }
    onTableSelect(TABLE_NAME){
        var url = "/Admin?table=" + TABLE_NAME
        axios.get("http://localhost:1994" + "/admin/" + TABLE_NAME)
        .then((response)=>{
            console.log(response.data)
            this.setState({data: response.data})
        })
        this.props.history.push(url)
    }

    tableSelectOptions(){
        return(
            <select ref="table_select" onChange={()=>this.onTableSelect(this.refs.table_select.value)}>
                <option value="catalogue">Catalogue</option>
                <option value="cases">Case Types</option>
            </select>
        )
    }

    brandSelectOptions(){
        console.log(this.state.brands)
        var arrJSX = this.state.brands.map((item)=>{ return(
            <option value={item.id}>{item.name}</option>)
        })
        return(
            <select ref="brand_select">
                {arrJSX}
            </select>
        )
    }

    typeSelectOptions(){
        var tempArr = this.sortType(this.refs.brand_select.value)
        var arrJSX = this.tempArr.map((item)=>{ return(
            <option value={item.id}>{item.name}</option>)
        })
        return(
            <select ref="type_select">
                {arrJSX}
            </select>
        )
    }

    renderDataTableCatalogue(){
        return(
            <tbody>
                {this.state.data.map()}
            </tbody>
        )
    }
    renderFullTableData(){
        return(
            {
                catalogue: ()=> {
                    return(
                        <div>
                            
                        </div>
                )},
                cases: ()=> {
                    return(
                        <div>
                            
                        </div>
                )}
            }
        )
    }
    render(){
        return(
            <div>
                {this.tableSelectOptions()}
                {this.brandSelectOptions()}
            </div>
        )
    }
}


export default Admin;