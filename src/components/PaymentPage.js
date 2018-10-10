import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import CartDetail from './CartDetail';

class PaymentPage extends Component {
    state = ({ user_info: [], cart: [] })

    componentWillMount() {
        this.getUserInfo()
    }

    getUserInfo() {
        axios.get(API_URL_1 + "/checkout/" + this.props.auth.id)
        .then((response) => {
            console.log(response)
            this.setState({user_info: response.data.user[0], cart: response.data.cart})
        })
    }

    renderUserInfo() {
        return (
            <Row>
                <p>{this.state.user_info.firstname} {this.state.user_info.lastname}</p>
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
                    <input type="button" className="btn btn-primary" style={{width:"100%"}} value="Checkout"/>
                </Row>
            </Row>
        )     
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
            arrJSX.push(<tr><td style={{width:"5%"}}>{count +1}.</td><td style={{width:"20%"}}>{item.code},</td><td style={{width:"20%"}}>{item.model_name},</td><td style={{width:"10%"}}>{item.case_type}</td><td style={{width:"20%"}} className="text-right">(Qty:{item.amount})</td><td style={{width:"25%"}}>Rp.{item.amount * item.price}</td></tr>)
        })
        arrJSX.push(<br/>)
        arrJSX.push(<tr><td/><td colSpan="4"><strong>Sub Total</strong></td><td><strong>Rp.{subTotal}</strong></td></tr>)
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
            arrJSX.push(<tr><td/><td colSpan="2">Free Soft Case:</td><td className="text-right" colSpan="2">(Qty:{freeSoft}) -</td><td>Rp.{freeSoft*softPrice}</td></tr>)
        }
        if(freeHard>0) {
            arrJSX.push(<tr><td/><td colSpan="2">Free Hard Case:</td><td className="text-right" colSpan="2">(Qty:{freeHard}) -</td><td>Rp.{freeHard*hardPrice}</td></tr>)
        }
        totalPrice = subTotal - (freeSoft*softPrice) - (freeHard*hardPrice)
        arrJSX.push(<br/>)
        arrJSX.push(<tr><td/><td colSpan="4"><strong>Total Price</strong></td><td><strong>Rp.{totalPrice}</strong></td></tr>)
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
                    <Col mdOffset={1} md={2}>
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