import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Panel, Modal, Button} from 'react-bootstrap'

class ProfileRenderOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false, items: [], namafile: 'Pilih Gambar'}
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
            alert('upload success!');
            this.props.refresh();
        }).catch((err) => {
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
                pendingPayment: () => {
                    return(
                        <span className="label bg-info">Pending Payment</span> )
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
        if(this.props.status === "pendingPayment"){
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
        else if(this.props.status === "pendingDelivery"){
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
        else if(this.props.status === "complete"){
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
        return(
            <Panel eventKey={this.props.transaction_id} bsStyle={this.selectStyle()}>
              <Panel.Heading>
                <Panel.Title toggle style={{fontSize:'10pt'}}>Order ID: <strong>CMW#{this.props.ordernumber}</strong><span style={{float: 'right'}}>{this.renderOrderStatus()[this.props.status]()}</span></Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <section id="content" style={{fontSize:"16px"}}> 
                    <section className="vbox bg-white">
                        {this.renderHeader()}
                        <section className="scrollable wrapper" style={{"line-height":"20px"}}> 
                        <div className="row">
                            <p className="m-t m-b col-md-3" style={{"line-height":"20px"}}>
                                <div style={{'margin-bottom': '5px'}}>Order date: <strong>{this.props.date}</strong></div>
                                <div style={{'margin-bottom': '5px'}}>Order status: {this.renderOrderStatus()[this.props.status]()}</div>
                                <div style={{'margin-bottom': '5px'}}>Order ID: <strong>CMW#{this.props.ordernumber}</strong></div>  
                            </p>
                            <div className="well bg-light b m-t col-md-6">
                                <div className="row">
                                <div className="col-xs-12">
                                    <strong>SHIP TO:</strong>
                                    <h4>{this.props.firstname} {this.props.lastname}</h4>
                                    <p>
                                    {this.props.address}<br/>
                                    {this.props.kota} {this.props.kodepos}<br/>
                                    Phone: {this.props.phone}<br/>
                                    {/* Email: {this.props.email}<br/> */}
                                    </p>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-3 text-right">
                            <p className="h4">CMW#{this.props.ordernumber}</p>
                            <h5>{this.props.date}</h5>           
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
                                    <td>Rp. {this.props.subtotal}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" className="text-right"><strong>Discount</strong></td>
                                    <td>Rp. {this.props.discount}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" className="text-right no-border"><strong>Shipping</strong></td>
                                    <td>Rp. {this.props.shipping}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" className="text-right no-border"><strong>Total</strong></td>
                                    <td><strong>Rp. {this.props.total_price}</strong></td>
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

export default ProfileRenderOrder