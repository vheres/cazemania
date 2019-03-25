import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import CartDetail from './CartDetail';
import Select from 'react-select';

import ReactPixel from 'react-facebook-pixel';

class PaymentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: {},
            cart: [],
            rekening: [],
            subTotal: 0,
            discount: 0,
            edit_modal: false,
            selectedOption: [],
            destination: [],
            filtered_destination: [],
            shipping: 0,
            init: false
        };
    }

    async componentDidMount() {
        await this.getUserInfo();
        await this.getCart();
        await this.getBank();
        ReactPixel.pageView();
        ReactPixel.track( 'InitiateCheckout' )
    }

    getUserInfo() {
        const token = this.props.auth.token
            const headers = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
            }
        };
        axios.get(`${API_URL_1}/auth/profile`, headers)
        .then(async (response) => {
            await this.setState({recipient: response.data.result})
        })
        .catch(err => {
            // console.log(err)
        })
    }

    getCart() {
        const token = this.props.auth.token
            const headers = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
            }
        };
        axios.get(`${API_URL_1}/transaction/getcart`, headers)
        .then(async (response) => {
            await this.setState({cart: response.data.result})
        })
        .catch(err => {
            // console.log(err)
        })
    }

    getBank() {
        axios.get(`${API_URL_1}/bank/all`)
        .then(res => {
            this.setState({rekening: res.data.result});
        })
        .catch(err => {
            // console.log(err);
        })
    }

    getShippingCost() {
        axios.get(`${API_URL_1}/destination/shipping`, {
            params: {
                destination: this.state.recipient.destination_code,
                weight: this.state.cart.length*0.2
            }
        })
        .then(async res => {
            // console.log(res)
            await this.setState({shipping: res.data.sicepat.results[0].tariff})
        })
        .catch(err => {
            console.log(err);
        })
    }

    onCheckOutClick() {
        const token = this.props.auth.token
            const headers = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
            }
        };
        axios.post(`${API_URL_1}/transaction/purchase`, {
            shipping: this.state.shipping,
            bankId: this.refs.rekening.value,
            recipient: this.state.recipient
        }, headers)
        .then(response => {
            alert('Order kamu telah diterima, silahkan lakukan pembayaran di dashboard profile kamu.')
            ReactPixel.track('Purchase')
            this.props.history.push('/profile')
        })
    }

    getDestinationList() {
        axios.get(API_URL_1 + '/destination')
        .then(response => {
            var arrJSX = [];
            response.data.result.forEach((item, count) => {
                arrJSX.push({value:item.destination_code, label:`${item.province}, ${item.city}, ${item.subdistrict}`})
            })
            this.setState({destination: arrJSX})
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
      }

    handleInputChange(selectedOption) {
        if (selectedOption.length >= 3) {
            var filterArr = [];
            var regex = new RegExp(selectedOption, "i")
            for (var num in this.state.destination) {
                if ( regex.test(this.state.destination[num].label)) {
                    filterArr.push(this.state.destination[num])
                }
            }
            this.setState({filtered_destination: filterArr})
        } else if (selectedOption.length < 3) {
            this.setState({filtered_destination: []})
        }
    } 

    handleClose() {
        this.setState({ edit_modal: false });
    }
    
    handleShow() {
        this.getDestinationList();
        this.setState({ selectedOption:{value:this.state.recipient.destination_code, label:this.state.recipient.kota} ,edit_modal: true });
    }

    onKeyPress(enter) {
    }

    async onEditSave() {
        if(this.refs.firstname.value === '' || this.refs.lastname.value === '' || this.refs.alamat.value === '' || this.state.selectedOption.label === '' || this.refs.kodepos.value === '') {
            alert('Please fill everything!');
        } else {
            await this.setState({ recipient: {
                firstname: this.refs.firstname.value,
                lastname: this.refs.lastname.value,
                phone: this.refs.phone.value,
                address: this.refs.alamat.value,
                destination_code: this.state.selectedOption.value,
                kota: this.state.selectedOption.label,
                kodepos: this.refs.kodepos.value
            } })
        }
        this.getShippingCost();
        alert('Edit Success');
        this.setState({ edit_modal: false });
        // } else {
        //     axios.put(API_URL_1 + '/users/' + this.props.auth.id, {
        //         address: this.refs.alamat.value,
        //         destination_code: this.state.selectedOption.value,
        //         kota: this.state.selectedOption.label,
        //         kodepos: this.refs.kodepos.value
        //     }).then((response) => {
        //         alert('Edit Success')
        //         this.getUserInfo()
        //         this.setState({ edit_modal: false });
        //     })
        // }
    }

    renderUserInfo() {
        console.log(this.state.recipient)
        return (
            <Row>
                <Col md={8} className="alamat-pengiriman">
                    <Row>
                        <span><strong>{this.state.recipient.firstname} {this.state.recipient.lastname}</strong></span>
                    </Row>
                    <Row>
                        <span>{this.state.recipient.phone}</span>
                    </Row>
                    <Row>
                        <span>{this.state.recipient.address}</span>
                    </Row>
                    <Row>
                        <span>{this.state.recipient.kota}</span>
                    </Row>
                    <Row>
                        <span>{this.state.recipient.kodepos}</span>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row>
                        <Button type="submit" onClick={this.handleShow.bind(this)} className="btn btn-default pull-right ganti-alamat-pengiriman"><span><i style={{fontSize: '20px'}} className="fa fa-edit"></i> Ganti Alamat</span></Button> 
                    </Row>
                </Col>
            </Row>
        )
    }

    renderCartList() {
        var arrJSX = [];
        arrJSX = this.state.cart.map((item,count) => {
            return <CartDetail key={item.id} item={item} count={count}></CartDetail>
        })
        console.log(arrJSX)
        return arrJSX
    }

    renderTransactionSummary() {
        return (
            <Row>
                <Row>
                    <Col md={12}><h3>Ringkasan Belanja</h3></Col>
                </Row>
                <Row>
                    <Table responsive>
                    {this.renderTransactionDetail()}
                    </Table>
                </Row>
                <Row>
                    <input type="button" className="btn-orange-blue" onClick={()=>this.onCheckOutClick()} style={{width:"100%"}} value="Lanjutkan ke Pembayaran"/>
                </Row>
            </Row>
        )     
    }

    calculateTransactionSummary() {
        var discount = 0;
        var subTotal = 0;
        var countHardCase = 0;
        var countSoftCase = 0;
        var totalCase = 0;
        var countFree = 0;
        var freeSoft = 0;
        var freeHard = 0;
        var hardPrice = 75000;
        var softPrice = 50000;
        this.state.cart.forEach((item,count) => {
            if (item.caseType === "hard" || item.caseType ==="customhard" || item.caseType ==="premium") {
                countHardCase += parseInt(item.amount, 10);
            }
            else {
                countSoftCase += parseInt(item.amount, 10)
            }
            subTotal += item.amount * item.price;
        })
        totalCase = countHardCase + countSoftCase;
        countFree = Math.floor(totalCase/3);
        for(var i=0; i<countFree; i++) {
            if(countSoftCase > 0) {
                countSoftCase--;
                freeSoft++;
            }
            else {
                freeHard++;
            }
        }
        discount = (freeSoft*softPrice) + (freeHard*hardPrice);
        this.setState({subTotal: subTotal, discount: discount})
    }

    renderTransactionDetail() {
        var arrJSX = [];
        var subTotal = 0;
        var shipping = this.state.shipping
        var totalPrice = 0;
        var countHardCase = 0;
        var countSoftCase = 0;
        var totalCase = 0;
        var countFree = 0;
        var freeSoft = 0;
        var freeHard = 0;
        var hardPrice = 75000;
        var softPrice = 50000;
        this.state.cart.forEach((item,count) => {
            if (item.caseType === "hard" || item.caseType ==="customhard" || item.caseType ==="premium") {
                countHardCase += parseInt(item.amount, 10);
            }
            else {
                countSoftCase += parseInt(item.amount, 10)
            }
            subTotal += item.amount * item.price;
            arrJSX.push(<tr><td style={{width:"5%"}}>{count +1}.</td><td><strong>{item.catalogue.name} | {item.catalogue.code}</strong>, {item.model}, {item.caseType} case</td><td className="text-right">(Qty:{item.amount}) Rp. {(item.amount * item.price).toLocaleString()}</td></tr>)
        })
        // arrJSX.push(<br/>)
        arrJSX.push(<tr><td/><td><strong>Sub Total</strong></td><td className="text-right"><strong>Rp. {subTotal.toLocaleString()}</strong></td></tr>)
        totalCase = countHardCase + countSoftCase;
        countFree = Math.floor(totalCase/3);
        for(var i=0; i<countFree; i++) {
            if(countSoftCase > 0) {
                countSoftCase--;
                freeSoft++;
            }
            else {
                freeHard++;
            }
        }
        if(freeSoft>0) {
            arrJSX.push(<tr><td/><td>Free Soft Case:</td><td className="text-right">(Qty:{freeSoft}) - Rp. {(freeSoft*softPrice).toLocaleString()}</td></tr>)
        }
        if(freeHard>0) {
            arrJSX.push(<tr><td/><td>Free Hard Case:</td><td className="text-right">(Qty:{freeHard}) - Rp. {(freeHard*hardPrice).toLocaleString()}</td></tr>)
        }
        totalPrice = subTotal - (freeSoft*softPrice) - (freeHard*hardPrice) + parseInt(shipping, 10)
        arrJSX.push(<tr><td/><td><strong>Shipping</strong></td><td className="text-right"><strong>Rp. {this.state.shipping.toLocaleString()}</strong></td></tr>)
        arrJSX.push(<br/>)
        arrJSX.push(<tr><td/><td><strong>Total Price</strong></td><td className="text-right"><strong>Rp. {totalPrice.toLocaleString()}</strong></td></tr>)
        return arrJSX
    }

    renderRekeningList() {
        var arrJSX = [];
        this.state.rekening.forEach((item,index) => {
            arrJSX.push(<option value={item.id}>{item.name} {item.accountNumber}</option>)
        })
        return arrJSX;
    }

    renderPaymentPage() {
        return(
            <Grid fluid className="HomePage-css padding-15p">
                    <Col xsOffset={1} xs={10} mdOffset={1} md={5}>
                        <Row>
                            <h3>Checkout</h3>
                            <hr/>
                        </Row>
                        <Row>
                            <h4>Alamat Pengiriman</h4>
                        </Row>
                        <Row>
                            <Panel>
                                <Panel.Body>
                                    {this.renderUserInfo()}
                                </Panel.Body>
                            </Panel>
                        </Row>
                        <Row>
                            <h4>Keranjang Anda</h4>
                        </Row>
                        <Row>
                            <Panel>
                                <Panel.Body>
                                    {this.renderCartList()}
                                </Panel.Body>
                            </Panel>
                        </Row>
                        <Row>
                            <h4>Metode Pembayaran</h4>
                        </Row>
                        <Row>
                            <Panel>
                                <Panel.Body>
                                    <Row>
                                        <Col xs={12} md={6} style={{marginTop:'3rem'}}>
                                            <label className="dropdown-container">
                                                <select className="dropdown-select" ref="rekening" defaultValue={1} id="gender">
                                                    {this.renderRekeningList()}
                                                </select>
                                                <div className="text">Pilih Rekening Tujuan:</div>
                                            </label>
                                        </Col>
                                    </Row>
                                </Panel.Body>
                            </Panel>
                        </Row>
                    </Col>
                    <Col xsOffset={1} xs={10} mdOffset={1} md={4}>
                        {this.renderTransactionSummary()}
                    </Col>
                    <Modal show={this.state.edit_modal} onHide={this.handleClose.bind(this)} bsSize="large">
                        <Modal.Header closeButton>
                            <Modal.Title>Ganti Tujuan Pengiriman</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id="Alamat">
                                <Row>
                                    <Col xs={12} mdOffset={1} md={5}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Nama Depan:</div>
                                            <input type="text" ref="firstname" id="inputFirstName" className="general-input" placeholder="First Name" defaultValue={`${this.state.recipient.firstname}`} onKeyPress={this.onKeyPress.bind(this)}/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Nama Belakang:</div>
                                            <input type="text" ref="lastname" id="inputLastName" className="general-input" placeholder="Last Name" defaultValue={`${this.state.recipient.lastname}`} onKeyPress={this.onKeyPress.bind(this)}/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} mdOffset={1} md={10}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Phone:</div>
                                            <input type="text" ref="phone" id="inputPhone" className="general-input" placeholder="081xxxxxxxxx" defaultValue={`${this.state.recipient.phone}`} onKeyPress={this.onKeyPress.bind(this)}/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} mdOffset={1} md={10}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Address</div>
                                            <textarea type="text" ref="alamat" id="inputAdress" className="general-input" placeholder="Alamat" defaultValue={this.state.recipient.address} onKeyPress={this.onKeyPress.bind(this)} style={{resize:"none"}}/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} mdOffset={1} md={5}>
                                        <label className="general-input-container">
                                            <div className="general-input-label m-b">Kota dan Kecamatan</div>
                                            <Select
                                            value={this.state.selectedOption}
                                            onChange={this.handleChange}
                                            options={this.state.filtered_destination} 
                                            onInputChange={this.handleInputChange.bind(this)}
                                            placeholder={`Pilih Kota/Kecamatan`}
                                            defaultValue={{value: this.state.recipient.destination_code, label: this.state.recipient.kota}}
                                            defaultInputValue={this.state.recipient.kota}
                                            />
                                        </label>
                                    <Row>
                                        <Col xs={12}>
                                            <p className="small-font">*please input 3 or more characters</p>
                                        </Col>
                                    </Row> 
                                </Col>
                                <Col xs={12} md={5}>
                                    <label className="general-input-container">
                                        <div className="general-input-label">Kode Pos</div>
                                        <input type="number" ref="kodepos" className="general-input" placeholder="Kode Pos" defaultValue={this.state.recipient.kodepos}/>
                                    </label>
                                </Col>        
                                </Row>                     
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <input type="button" className="btn-orange-blue m-r" onClick={this.handleClose.bind(this)} value="Cancel"/>
                            <input type="button" className="btn-blue-orange" onClick={()=>this.onEditSave()} value="Save"/>
                        </Modal.Footer>
                    </Modal>
                </Grid>
        )
    }

    render() {
        if (this.state.init === false && this.state.cart.length > 0 && this.state.recipient.destination_code !== undefined) {
            this.getShippingCost()
            this.setState({init: true})
        }
        return (
            this.renderPaymentPage()
        );   
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
  
    return { auth };
  }


  
export default connect(mapStateToProps, {})(PaymentPage);