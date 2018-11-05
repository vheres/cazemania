import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Panel, PanelGroup, Modal, Button} from 'react-bootstrap'
import FileUploader from './FileUploader'

class ProfileRenderOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false, items: [], namafile: 'select image'}
    }

    componentWillMount(){
        axios.get(API_URL_1 + "/users/transactions/details/" + this.props.transaction_id)
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

    onUpLoadClick() {
        console.log(document.getElementById('bukti_pembayaran').files[0])
        var data = {
            transaction_id: this.props.transaction_id
        }
        var formData = new FormData()
        formData.append('file', document.getElementById('bukti_pembayaran').files[0])
        formData.append('data', JSON.stringify(data))
        console.log(formData)
        var config = {
            headers: 
              {'Content-Type': 'multipart/form-data'}
        }
          axios.post(API_URL_1 + `/bukti_pembayaran`, formData, config).then((res) => {
            alert('upload success!')
        }).catch((err) => {
            alert(err);
        })
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
                    <div className="row">
                        <span className="col-md-2">Bukti pembayaran: </span>
                        <span className="col-md-8"><label for="bukti_pembayaran" className="btn btn-primary" style={{'width': '120px'}}><span className="text-ellipsis">{this.state.namafile}</span></label>{' '}
                        <input type="button" value="upload" className="btn btn-success" onClick={()=>this.onUpLoadClick()}></input></span>
                        <input type="file" className="inputfile" name="filename" id="bukti_pembayaran" accept="image/*" onChange={()=>this.setState({namafile: document.getElementById('bukti_pembayaran').files[0].name})}/>
                        <span className="col-md-2">
                            <input type="button" value="Bukti Pembayaran" onClick={()=>this.handleShow()} className="btn btn-sm btn-info pull-right"/>
                        </span>   
                    </div>
                </header>
            )        
        }
        else if(this.props.status === "pendingDelivery"){
            return (
                <header class="wrapper-md bg-light lter">
                <div className="row">
                    <span className="col-md-6">Order sedang di proses</span>
                    <span className="col-md-6">
                        <input type="button" value="Bukti Pembayaran" onClick={()=>this.handleShow()} className="btn btn-sm btn-info pull-right"/>
                    </span>
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
                <td>Rp. {item.price}</td>
                <td>Rp. {item.price * item.amount}</td>
            </tr>)
        })

        return arrJSX
    }
    
    renderPage(){
        return(
            <Panel eventKey={this.props.transaction_id} bsStyle={this.selectStyle()}>
              <Panel.Heading>
                <Panel.Title toggle>Order ID: <strong>CMW#{this.props.ordernumber}</strong><span style={{float: 'right'}}>{this.renderOrderStatus()[this.props.status]()}</span></Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <section id="content" style={{"font-size":"16px"}}> 
                    <section class="vbox bg-white">
                        {this.renderHeader()}
                        <section class="scrollable wrapper" style={{"line-height":"20px"}}> 
                        <div class="row">
                            <p class="m-t m-b col-md-3" style={{"line-height":"20px"}}>
                                <div style={{'margin-bottom': '5px'}}>Order date: <strong>{this.props.date}</strong></div>
                                <div style={{'margin-bottom': '5px'}}>Order status: {this.renderOrderStatus()[this.props.status]()}</div>
                                <div style={{'margin-bottom': '5px'}}>Order ID: <strong>CMW#{this.props.ordernumber}</strong></div>  
                            </p>
                            <div class="well bg-light b m-t col-md-6">
                                <div class="row">
                                <div class="col-xs-12">
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
                                <th style={{"width": "130px"}}>TOTAL</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTransactionDetails()}
                            <tr>
                                <td colspan="3" class="text-right"><strong>Subtotal</strong></td>
                                <td>Rp. {this.props.subtotal}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right no-border"><strong>Shipping</strong></td>
                                <td>Rp. {this.props.shipping}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right no-border"><strong>Total</strong></td>
                                <td><strong>Rp. {this.props.total_price}</strong></td>
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
                    <img src="http://localhost:1994/normal/ADDS1.jpg" alt="buktipembayaran" style={{width: "50%"}}/>
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

export default ProfileRenderOrder