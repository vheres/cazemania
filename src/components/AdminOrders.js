
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AdminRenderOrders from './AdminRenderOrders'
import {Panel, PanelGroup} from 'react-bootstrap'


class AdminOrders extends Component {

    state={orders: [] }
    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        axios.get(API_URL_1 + "/adminorders")
        .then((res)=>{
            console.log(res.data)
            this.setState({orders: res.data})
        })
    }

    renderOrdersHead(){
        return(
            <thead>
                <tr>
                <th style={{width: "2%"}}>ID</th>
                <th style={{width: "8%"}}>NAMA</th>
                <th style={{width: "10%"}}>TANGGAL</th>
                <th style={{width: "10%"}}>WAKTU</th>
                <th style={{width: "15%"}}>TOTAL PEMBAYARAN</th>
                <th style={{width: "15%"}}>BUKTI PEMBAYARAN</th>
                <th style={{width: "15%"}}>TUJUAN TRANSFER</th>
                <th style={{width: "10%"}}>STATUS ORDER</th>
                <th style={{width: "10%"}}>NOMOR RESI</th>
                <th style={{width: "10%"}}>ACTIONS</th>
                </tr>
            </thead>
        )
    }

    renderDataTableOrders(){
        var arrJSX = this.state.orders.map((item)=>{
            return(
            <AdminRenderOrders key={item.user_id} transaction_id={item.id} user_id={item.user_id} proof={item.proof} name={item.name} date={item.date} time={item.time} total_price={item.total_price} target_bank={item.target_bank}
            status={item.status} firstname={item.firstname} lastname={item.lastname} address={item.address} email={item.email}/>
        )})
        return arrJSX
    }


    render(){
        return(
            <div>
                <PanelGroup accordion id="accordion-uncontrolled-example">
                    {this.renderDataTableOrders()}
                </PanelGroup>
            </div>
        )
    }
}


export default AdminOrders;