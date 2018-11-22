
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AdminRenderPrice from './AdminRenderPrice';
import AdminRenderRekening from './AdminRenderRekening';

class AdminSettings extends Component {

    state={ price: [], rekening: [] }
    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        axios.get(API_URL_1 + "/admin/settings")
        .then((res)=>{
            console.log(res.data)
            this.setState({price: res.data.price, rekening: res.data.rekening})
        })
    }

    renderPriceTable(){
        var arrJSX = this.state.price.map((item, index) => {
            return(
                <AdminRenderPrice key={item.id} id={item.id} case_type={item.case_type} price={item.price}/>
            )
        })
        return(
            <table className="table table-striped m-b-none">
                <thead>
                    <tr>
                        <th style={{width: "30%"}}>Tipe Case</th>
                        <th style={{width: "30%"}}>Price</th>
                        <th style={{width: "40%"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {arrJSX}
                </tbody>
            </table>
        )
    }

    renderRekeningTable(){
        var arrJSX = this.state.rekening.map((item, index) => {
            return(
                <AdminRenderRekening key={item.id} id={item.id} nama={item.nama} nomor_rekening={item.nomor_rekening}/>
            )
        })
        return(
            <table className="table table-striped m-b-none">
                <thead>
                    <tr>
                        <th style={{width: "30%"}}>Nama Bank</th>
                        <th style={{width: "30%"}}>Nomor Rekening</th>
                        <th style={{width: "40%"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {arrJSX}
                </tbody>
            </table>
        )
    }


    render(){
        return(
            <div className="row">
                <div className="col-md-6">{this.renderPriceTable()}</div>
                <div className="col-md-6">{this.renderRekeningTable()}</div>
            </div>
        )
    }
}


export default AdminSettings;