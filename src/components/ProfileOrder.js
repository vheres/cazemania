
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import ProfileRenderOrder from './ProfileRenderOrder'
import { connect } from 'react-redux';
import {Panel, PanelGroup} from 'react-bootstrap'
import AdminOrdersTabs from './AdminOrdersTabs'
 

class ProfileOrder extends Component {

    state={orders: [], activeKey: 0}
    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        axios.get(API_URL_1 + "/users/transactions/" + this.props.auth.id)
        .then((res)=>{
            this.setState({orders: res.data})
            if (this.state.orders[0].status == 'pendingPayment') {
                this.setState({activeKey:this.state.orders[0].id})
            }
        })
    }

    handleSelect(activeKey) {
        this.setState({ activeKey });
      }

    renderDataTableOrders(){
        var arrJSX = this.state.orders.map((item, count)=>{
            return(
                <ProfileRenderOrder key={item.id} transaction_id={item.id} ordernumber={item.ordernumber} user_id={item.user_id} proof={item.proof} name={item.name} date={item.date} time={item.time} subtotal={item.subtotal} shipping={item.shipping} total_price={parseInt(item.subtotal) + parseInt(item.shipping)} target_bank={item.target_bank}
                status={item.status} firstname={item.firstname} lastname={item.lastname} address={item.address} phone={item.phone} kota={item.kota} kodepos={item.kodepos} email={item.email} resi={item.resi} refresh={()=>this.refreshData()}/>
        )})
        return arrJSX
    }

    render(){
        return(
            <div>
                <PanelGroup
                accordion
                id="accordion-controlled-example"
                activeKey={this.state.activeKey}
                onSelect={this.handleSelect.bind(this)}
                >
                {this.renderDataTableOrders()}
                </PanelGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
  
    return { auth };
  }

export default connect(mapStateToProps, {})(ProfileOrder);