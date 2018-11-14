import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Panel, PanelGroup, Modal, Button} from 'react-bootstrap'

class AdminRenderOrders extends Component {
    state = {show: false, items: []}

    componentWillMount(){
        axios.get(API_URL_1 + "/adminordersdetails/" + this.props.transaction_id)
        .then((res)=>{
            console.log(res.data)
            this.setState({items: res.data})
        })
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

        
    selectStyle(){
        if(this.props.status === "pendingPayment"){
            return "info"
        }
        else if(this.props.status === "pendingDelivery"){
            return "warning"
        }
        else if(this.props.status === "complete"){
            return "success"
        }
    }

    onCompleteOrderClick(){
        if(this.refs.addNomorResi.value === ""){

        }
        else{
            if(window.confirm("Order ini akan diselesaikan. Lanjutkan?")){
                axios.put(API_URL_1 + "/adminorders/addresi/" + this.props.transaction_id,{
                    resi: this.refs.addNomorResi.value,
                    email: this.props.email 
                })
                .then((res)=>{
                    console.log(res)
                    this.props.refresh()
                    alert("Order Complete")
                })
                .catch((err)=>{
                    console.log(err)
                    alert("ERROR")
                })
            }
        }
    }

    onConfirmOrderClick(){
        if(this.props.proof !== null){
            if(window.confirm("Order tersebut akan dikonfirmasi. Lanjutkan?")){
                axios.put(API_URL_1 + "/adminorders/confirm/" + this.props.transaction_id,{
                    email: this.props.email 
                })
                .then((res)=>{
                    console.log(res)
                    this.props.refresh()
                    alert("Order telah dikonfirmasi")
                })
                .catch((err)=>{
                    console.log(err)
                    alert("ERROR")
                })
            }
        }
        else{
            alert("Belum ada bukti pembayaran!")
        }
    }

    renderOrderStatus(){
        return(
            {
                pendingPayment: () => {
                    return(
                        <span class="label bg-info">Pending Payment</span> )
                    },
                pendingDelivery: () => {
                    return(
                        <span class="label bg-warning">Pending Delivery</span> )
                    },
                complete : () =>{
                    return(
                        <span class="label bg-success">Shipped</span> )
                    }
                }
        )
    }

    renderHeader(){
        if(this.props.status === "pendingPayment"){
            return (
                <header class="wrapper-md bg-light lter">
                <div>
                    <input type="button" value="Konfirmasi Pembayaran" onClick={()=>this.onConfirmOrderClick()} className="btn btn-sm btn-info"/>
                    <input type="button" value="Bukti Pembayaran" onClick={()=>this.handleShow()} className="btn btn-sm btn-info pull-right"/>
                </div>
                </header>
            )
        }
        else if(this.props.status === "pendingDelivery"){
            return (
                <header class="wrapper-md bg-light lter">
                <div>
                    <input type="text" placeholder="Input nomor resi" ref="addNomorResi" className="form-control"/><input type="button" value="Complete Order" onClick={()=>this.onCompleteOrderClick()} className="btn btn-sm btn-info"/>
                    <input type="button" value="Bukti Pembayaran" onClick={()=>this.handleShow()} className="btn btn-sm btn-info pull-right"/>
                </div>
                </header>
            )
        }
        else if(this.props.status === "complete"){
            return (
                <header class="wrapper-md bg-success lter">
                <div style={{"font-size": "200%"}}>
                    ORDER SELESAI   ||   <strong>Nomor Resi: {this.props.resi}</strong>
                </div>
                </header>
            )
        }
    }

    renderTransactionDetails(){
        var arrJSX = this.state.items.map((item) =>{
            return(
            <tr>
                <td>{item.amount}</td>
                <td>{item.code}-{item.name} || {item.brand_name} {item.type_name} - {item.case_type}</td>
                <td>Rp. {parseInt(item.price).toLocaleString()}</td>
                <td>Rp. {(parseInt(item.price) * parseInt(item.amount)).toLocaleString()}</td>
            </tr>)
        })

        return arrJSX
    }

    renderBukti(){
        if(this.props.proof !== null){
            return(
                <img src={API_URL_1 + `/bukti/${this.props.proof}.jpg`} alt="buktipembayaran" style={{width: "100%"}}/>
            )
        }
        else{
            return(
                <div>Bukti pembayaran belum dikirim</div>
            )
        }
    }
    
    renderPage(){
        console.log(this.props.proof)
        return(
            <Panel eventKey={this.props.transaction_id} bsStyle={this.selectStyle()}>
              <Panel.Heading>
                <Panel.Title toggle>Order ID: <strong>CMW#{this.props.ordernumber}</strong> </Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <section id="content" style={{"font-size":"16px"}}> 
                    <section class="vbox bg-white">
                        {this.renderHeader()}
                        <section class="scrollable wrapper" style={{"line-height":"20px"}}> 
                        <div class="row">
                            <p class="m-t m-b col-md-3" style={{"line-height":"25px"}}>
                                Order date: <strong>{this.props.date}</strong><br/>
                                Order status: {this.renderOrderStatus()[this.props.status]()}<br/>
                                Order ID: <strong>CMW#{this.props.ordernumber}</strong>
                            </p>
                            <div class="well bg-light b m-t col-md-6">
                                <div class="row">
                                <div class="col-xs-10">
                                    <strong>SHIP TO:</strong>
                                    <h4>{this.props.firstname} {this.props.lastname}</h4>
                                    <p>
                                    {this.props.address}<br/>
                                    {this.props.kota} {this.props.kodepos}<br/>
                                    Phone: {this.props.phone}<br/>
                                    Email: {this.props.email}<br/>
                                    </p>
                                </div>
                                </div>
                            </div>
                            <div class="col-md-3 text-right">
                            <p class="h4">CMW#{this.props.ordernumber}</p>
                            <h5>{this.props.date}</h5>           
                            </div>
                        </div>          
                        <div class="line"></div>
                        <table class="table">
                            <thead>
                            <tr>
                                <th style={{"width": "60px"}}>QTY</th>
                                <th>DESCRIPTION</th>
                                <th style={{"width": "140px"}}>UNIT PRICE</th>
                                <th style={{"width": "160px"}}>TOTAL</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTransactionDetails()}
                            <tr>
                                <td colspan="3" class="text-right"><strong>Subtotal</strong></td>
                                <td style={{"width":"160px"}}>Rp. {parseInt(this.props.subtotal).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right no-border"><strong>Shipping</strong></td>
                                <td>Rp. {parseInt(this.props.shipping).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right no-border"><strong>Total</strong></td>
                                <td><strong>Rp. {(parseInt(this.props.subtotal) + parseInt(this.props.shipping)).toLocaleString()}</strong></td>
                            </tr>
                            </tbody>
                        </table>              
                        </section>
                    </section>
                </section>
              </Panel.Body>
              <Modal show={this.state.show} onHide={()=>this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Bukti Pembayaran ORDER: CMW#{this.props.ordernumber}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderBukti()}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>this.handleClose()}>Close</Button>
                </Modal.Footer>
                </Modal>
            </Panel>
        )
    }
  
    render(){
        return(
            this.renderPage()
        )
    }
}

export default AdminRenderOrders