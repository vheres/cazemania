import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AdminRenderOrders from './AdminRenderOrders'
import {Panel, PanelGroup} from 'react-bootstrap'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class AdminOrdersTabs extends React.Component {
  
  state={orders1: [], orders2 : [], orders3: [], value: 0 }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  
  componentWillMount(){
      this.refreshData()
  }

  refreshData(){
      axios.get(API_URL_1 + "/adminorders")
      .then((res)=>{
          console.log(res.data)
          var tempArr1 = []
          var tempArr2 = []
          var tempArr3 = []
          for(var index in res.data){
            if(res.data[index].status === "pendingPayment"){
              tempArr1.push(res.data[index])
            }
            else if (res.data[index].status === "pendingDelivery"){
              tempArr2.push(res.data[index])
            }
            else if (res.data[index].status === "complete"){
              tempArr3.push(res.data[index])
            }
          }
          this.setState({orders1:tempArr1, orders2:tempArr2, orders3:tempArr3})
      })
  }


  renderDataTableOrders1(){
      var arrJSX = this.state.orders1.map((item)=>{
          return(
          <AdminRenderOrders key={item.user_id} transaction_id={item.id} ordernumber={item.ordernumber} discount={item.discount} user_id={item.user_id} proof={item.proof} name={item.name} date={item.date} shipping={item.shipping} time={item.time} subtotal={item.subtotal} target_bank={item.target_bank}
          status={item.status} firstname={item.r_firstname} lastname={item.r_lastname} address={item.r_address} phone={item.r_phone} kota={item.r_kota} kodepos={item.r_kodepos} email={item.email} resi={item.resi} refresh={()=>this.refreshData()}/>
      )})
      return arrJSX
  }

  renderDataTableOrders2(){
    var arrJSX = this.state.orders2.map((item)=>{
        return(
        <AdminRenderOrders key={item.user_id} transaction_id={item.id} ordernumber={item.ordernumber} discount={item.discount} user_id={item.user_id} proof={item.proof} name={item.name} date={item.date} shipping={item.shipping} time={item.time} subtotal={item.subtotal} target_bank={item.target_bank}
        status={item.status} firstname={item.r_firstname} lastname={item.r_lastname} address={item.r_address} phone={item.r_phone} kota={item.r_kota} kodepos={item.r_kodepos} email={item.email} resi={item.resi} refresh={()=>this.refreshData()}/>
    )})
    return arrJSX
}

renderDataTableOrders3(){
  var arrJSX = this.state.orders3.map((item)=>{
      return(
      <AdminRenderOrders key={item.user_id} transaction_id={item.id} ordernumber={item.ordernumber} discount={item.discount} user_id={item.user_id} proof={item.proof} name={item.name} date={item.date} shipping={item.shipping} time={item.time} subtotal={item.subtotal} target_bank={item.target_bank}
      status={item.status} firstname={item.r_firstname} lastname={item.r_lastname} address={item.r_address} phone={item.r_phone} kota={item.r_kota} kodepos={item.r_kodepos} email={item.email} resi={item.resi} refresh={()=>this.refreshData()}/>
  )})
  return arrJSX
}



  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="col-md-12">
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} centered>
              <Tab label="BELUM DIBAYAR" />
              <Tab label="BELUM DIKIRIM" />
              <Tab label="SELESAI"/>
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><PanelGroup accordion id="accordion-uncontrolled-example">
                      {this.renderDataTableOrders1()}
                  </PanelGroup></TabContainer>}
          {value === 1 && <TabContainer>
                  <PanelGroup accordion id="accordion-uncontrolled-example">
                      {this.renderDataTableOrders2()}
                  </PanelGroup></TabContainer>}
          {value === 2 && <TabContainer>
                  <PanelGroup accordion id="accordion-uncontrolled-example">
                      {this.renderDataTableOrders3()}
                  </PanelGroup></TabContainer>}
        </div>
      </div>
    );
  }
}

AdminOrdersTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminOrdersTabs);