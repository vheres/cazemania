import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Panel, Modal, Button} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const moment = require('moment');

class ProfileRenderOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false, items: [], namafile: 'Pilih Gambar'}
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

        
    selectStyle(){
        if(this.props.item.status === "pendingProof"){
            return "info"
        }
        else if(this.props.item.status === "pendingDelivery"){
            return "warning"
        }
        else if(this.props.item.status === "complete"){
            return "success"
        }
    }

    onUpLoadClick() {
        const token = this.props.auth.token
        var formData = new FormData()
        formData.append('proof', document.getElementById('bukti_pembayaran').files[0])
        const headers = {
            headers:
              {'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'}
        }
        axios.post(`${API_URL_1}/transaction/uploadproof/${this.props.item.id}`, formData, headers)
            .then((res) => {
            alert('upload success!');
            this.props.refresh();
        })
        .catch((err) => {
            alert(err);
        })
    }

    handleInputFile() {
        if (document.getElementById('bukti_pembayaran').files[0] === undefined) {
            this.setState({namafile: 'Pilih Gambar'})
        } else {
            this.setState({namafile: document.getElementById('bukti_pembayaran').files[0].name})
        }
    }

    renderOrderStatus(){
        return(
            {
                pendingProof: () => {
                    return(
                        <span className="label bg-info">Pending Proof</span> )
                    },
                pendingDelivery: () => {
                    return(
                        <span className="label bg-warning">Pending Delivery</span> )
                    },
                complete : () =>{
                    return(
                        <span className="label bg-success">Shipped</span> )
                    }
                }
        )
    }

    renderHeader(){
        if(this.props.item.status === "pendingProof"){
            return (
                <header className="wrapper-md bg-light lter">
                    <div className="row">
                        <span className="col-xs-12 col-md-2">Bukti pembayaran: </span>
                        <span className="col-xs-8 col-md-8">
                            <label for="bukti_pembayaran" className="btn btn-sm btn-primary" style={{'width': '120px'}} title="pilih file, lalu klik upload">
                                <span className="text-ellipsis">{this.state.namafile}</span>
                            </label>{' '}
                            <input type="button" value="Upload" className="btn btn-sm btn-success" title="pilih file, lalu klik upload" onClick={()=>this.onUpLoadClick()}></input>
                        </span>
                            <input type="file" className="inputfile" name="filename" id="bukti_pembayaran" accept="image/*" onChange={()=>this.handleInputFile()}/>
                        <span className="col-xs-4 col-md-2">
                            <input type="button" value="Bukti Pembayaran" onClick={()=>this.handleShow()} className="btn btn-sm btn-info pull-right"/>
                        </span>   
                    </div>
                </header>
            )        
        }
        else if(this.props.item.status === "pendingDelivery"){
            return (
                <header className="wrapper-md bg-light lter">
                <div className="row">
                    <span className="col-md-6">Order sedang di proses</span>
                    <span className="col-md-6">
                        <input type="button" value="Bukti Pembayaran" onClick={()=>this.handleShow()} className="btn btn-sm btn-info pull-right"/>
                    </span>
                </div>
                </header>
            )
        }
        else if(this.props.item.status === "complete"){
            return (
                <header className="wrapper-md bg-success lter">
                <div style={{fontSize: "200%"}}>
                    ORDER SELESAI   ||   <strong>Nomor Resi: {this.props.resi}</strong>
                </div>
                </header>
            )
        }
    }

    renderTransactionDetails(){
        var arrJSX = this.props.item.transactionDetails.map((item) =>{
            return(
            <tr>
                <td>{item.amount}</td>
                <td>{item.code}-{item.name} || {item.brand} {item.model} - {item.caseType}</td>
                <td>Rp. {item.price}</td>
                <td>Rp. {item.price * item.amount}</td>
            </tr>)
        })

        return arrJSX
    }

    renderBukti(){
        if(this.props.item.proof !== null){
            return(
                <img src={`${API_URL_1}${this.props.item.proof}`} alt="buktipembayaran" style={{width: "100%"}}/>
            )
        }
        else{
            return(
                <div>Bukti pembayaran belum dikirim</div>
            )
        }
    }
    
    renderPage(){
        return(
            <Panel eventKey={this.props.item.id} bsStyle={this.selectStyle()}>
              <Panel.Heading>
                <Panel.Title toggle style={{fontSize:'10pt'}}>Order ID: <strong>CMW#{this.props.ordernumber}</strong><span style={{float: 'right'}}>{this.renderOrderStatus()[this.props.item.status]()}</span></Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <section id="content" style={{fontSize:"16px"}}> 
                    <section className="vbox bg-white">
                        {this.renderHeader()}
                        <section className="scrollable wrapper" style={{"line-height":"20px"}}> 
                        <div className="row">
                            <p className="m-t m-b col-md-3" style={{"line-height":"20px"}}>
                                <div style={{'margin-bottom': '5px'}}>Order date: <strong>{moment(this.props.item.purchaseDate).format('DD MMM YYYY')}</strong></div>
                                <div style={{'margin-bottom': '5px'}}>Order status: {this.renderOrderStatus()[this.props.item.status]()}</div>
                                <div style={{'margin-bottom': '5px'}}>Order ID: <strong>CMW#0000</strong></div>  
                            </p>
                            <div className="well bg-light b m-t col-md-6">
                                <div className="row">
                                <div className="col-xs-12">
                                    <strong>SHIP TO:</strong>
                                    <h4>{this.props.item.firstname} {this.props.item.lastname}</h4>
                                    <p>
                                    {this.props.item.address}<br/>
                                    {this.props.item.kota} {this.props.item.kodepos}<br/>
                                    Phone: {this.props.item.phone}<br/>
                                    {/* Email: {this.props.email}<br/> */}
                                    </p>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-3 text-right">
                            <p className="h4">CMW#0000</p>
                            <h5>{moment(this.props.item.purchaseDate).format('DD MMM YYYY')}</h5>           
                            </div>
                        </div>          
                        <div className="line"></div>
                        <div style={{'overflow-x':'auto'}}>
                            <table className="table">
                                <thead className="table-head">
                                <tr>
                                    <th style={{"width": "10%"}}>QTY</th>
                                    <th style={{"width": "50%"}}>DESCRIPTION</th>
                                    <th style={{"width": "20%"}}>UNIT PRICE</th>
                                    <th style={{"width": "20%"}}>TOTAL</th>
                                </tr>
                                </thead>
                                <tbody className="table-body">
                                {this.renderTransactionDetails()}
                                <tr>
                                    <td colspan="3" className="text-right"><strong>Subtotal</strong></td>
                                    <td>Rp. {this.props.item.subtotal}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" className="text-right"><strong>Discount</strong></td>
                                    <td>Rp. {this.props.item.discount}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" className="text-right no-border"><strong>Shipping</strong></td>
                                    <td>Rp. {this.props.item.shipping}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" className="text-right no-border"><strong>Total</strong></td>
                                    <td><strong>Rp. {this.props.item.totalPrice}</strong></td>
                                </tr>
                                </tbody>
                            </table>  
                        </div>   
                        </section>
                    </section>
                </section>
              </Panel.Body>
              <Modal show={this.state.show} onHide={()=>this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Bukti Pembayaran ORDER: CMW#0000</Modal.Title>
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

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default withRouter(connect(mapStateToProps, {})(ProfileRenderOrder));