import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import CartDetail from './CartDetail';

class PaymentPage extends Component {
    state = ({ profile: [], cart: [], totalPrice: 0 })

    componentWillMount() {
        this.getUserInfo()
    }

    getUserInfo() {
        axios.get(API_URL_1 + "/checkout/" + this.props.auth.id)
        .then((response) => {
            console.log(response)
            this.setState({profile: response.data.user[0], cart: response.data.cart})
            this.calculateTransactionSummary()
        })
    }

    onCheckOutClick() {
        axios.post(API_URL_1 + "/transaction", {
            id: this.props.auth.id,
            subtotal: this.state.totalPrice,
            shipping: '10000',
            target_bank: 'BCA',
            cart: this.state.cart
        })
        .then(response => {
            alert('transaction success')
            this.props.history.push('/profile')
        })
    }

    renderUserInfo() {
        return (
            <Row>
                <Col md={8}>
                    <Row>
                        <span>{this.state.profile.firstname} {this.state.profile.lastname}</span>
                    </Row>
                    <Row>
                        <span>{this.state.profile.address}</span>
                    </Row>
                    <Row>
                        <span>{this.state.profile.kota}</span>
                    </Row>
                    <Row>
                        <span>{this.state.profile.kodepos}</span>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row>
                        <input type="button" className="btn btn-warning pull-right" value="Ganti Alamat"></input>
                    </Row>
                </Col>
            </Row>
        )
    }

    renderCartList() {
        var arrJSX = [];
        arrJSX = this.state.cart.map((item,count) => {
            return <CartDetail key={item.id} id={item.id} count={count} name={item.name} code={item.code} image={item.image} brand={item.brand_name} model={item.model_name} type={item.case_type} quantity={item.amount} price={item.price}></CartDetail>
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
                    <input type="button" className="btn btn-primary" onClick={()=>this.onCheckOutClick()} style={{width:"100%"}} value="Checkout"/>
                </Row>
            </Row>
        )     
    }

    calculateTransactionSummary() {
        console.log(this.state.cart)
        var subTotal = 0;
        var totalPrice = 0;
        var countHardCase = 0;
        var countSoftCase = 0;
        var totalCase = 0;
        var countFree = 0;
        var freeSoft = 0;
        var freeHard = 0;
        var hardPrice = 0;
        var softPrice = 0;
        this.state.cart.map((item,count) => {
            if (item.case_type == "hard") {
                countHardCase += parseInt(item.amount);
                hardPrice = item.price;
            }
            else {
                countSoftCase += parseInt(item.amount)
                softPrice = item.price;
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
        totalPrice = subTotal - (freeSoft*softPrice) - (freeHard*hardPrice)
        this.setState({totalPrice: totalPrice})
    }

    renderTransactionDetail() {
        var arrJSX = [];
        var subTotal = 0;
        var totalPrice = 0;
        var countHardCase = 0;
        var countSoftCase = 0;
        var totalCase = 0;
        var countFree = 0;
        var freeSoft = 0;
        var freeHard = 0;
        var hardPrice = 0;
        var softPrice = 0;
        this.state.cart.map((item,count) => {
            if (item.case_type == "hard") {
                countHardCase += parseInt(item.amount);
                hardPrice = item.price;
            }
            else {
                countSoftCase += parseInt(item.amount)
                softPrice = item.price;
            }
            subTotal += item.amount * item.price;
            arrJSX.push(<tr><td style={{width:"5%"}}>{count +1}.</td><td><strong>{item.name} | {item.code}</strong>, {item.model_name}, {item.case_type} case</td><td className="text-right">(Qty:{item.amount}) Rp.{item.amount * item.price}</td></tr>)
        })
        arrJSX.push(<br/>)
        arrJSX.push(<tr><td/><td><strong>Sub Total</strong></td><td className="text-right"><strong>Rp.{subTotal}</strong></td></tr>)
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
            arrJSX.push(<tr><td/><td>Free Soft Case:</td><td className="text-right">(Qty:{freeSoft}) - Rp.{freeSoft*softPrice}</td></tr>)
        }
        if(freeHard>0) {
            arrJSX.push(<tr><td/><td>Free Hard Case:</td><td className="text-right">(Qty:{freeHard}) - Rp.{freeHard*hardPrice}</td></tr>)
        }
        totalPrice = subTotal - (freeSoft*softPrice) - (freeHard*hardPrice)
        arrJSX.push(<br/>)
        arrJSX.push(<tr><td/><td><strong>Total Price</strong></td><td className="text-right"><strong>Rp.{totalPrice}</strong></td></tr>)
        return arrJSX
    }

    renderPaymentPage() {
        return(
            <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Col md={2}></Col>
                    <Col md={5}>
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
                            <h4>Biaya Pengiriman</h4>
                        </Row>
                        <Row>
                            <Panel>
                                <Panel.Body>
                                    
                                </Panel.Body>
                            </Panel>
                        </Row>
                    </Col>
                    <Col mdOffset={1} md={3}>
                        {this.renderTransactionSummary()}
                    </Col>
                </Grid>
        )
    }

    render() {
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