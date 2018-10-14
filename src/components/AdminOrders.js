
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import AdminRenderOrders from './AdminRenderOrders'
import {Panel, PanelGroup} from 'react-bootstrap'
import AdminOrdersTabs from './AdminOrdersTabs'
 

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

    renderDataTableOrders(){
        var arrJSX = this.state.orders.map((item)=>{
            return(
            <AdminRenderOrders key={item.id} transaction_id={item.id} user_id={item.user_id} proof={item.proof} name={item.name} date={item.date} time={item.time} total_price={item.total_price} target_bank={item.target_bank}
            status={item.status} firstname={item.firstname} lastname={item.lastname} address={item.address} email={item.email}/>
        )})
        return arrJSX
    }

    renderTabs(){
        return <AdminOrdersTabs/>
    }


    render(){
        return(
            <div>
                {this.renderTabs()}
            </div>
        )
    }
}


export default AdminOrders;