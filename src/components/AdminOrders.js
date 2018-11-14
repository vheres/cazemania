
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

    renderTabs(){
        return <AdminOrdersTabs/>
    }


    render(){
        return(
            <div className="col-md-push-2 col-md-8">
                {this.renderTabs()}
            </div>
        )
    }
}


export default AdminOrders;