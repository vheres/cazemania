
import React, { Component } from 'react';
import AdminOrdersTabs from './AdminOrdersTabs'
 

class AdminOrders extends Component {

    renderTabs(){
        return <AdminOrdersTabs/>
    }

    render(){
        return(
            <div className="col-md-12">
                {this.renderTabs()}
            </div>
        )
    }
}


export default AdminOrders;