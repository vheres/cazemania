import React, { Component } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
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
            return <CartDetail key={item.id} id={item.id} count={count} name={item.code} image={item.image} brand={item.brand_name} model={item.model_name} type={item.case_type} quantity={item.amount} price={item.price}></CartDetail>
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
                    <Col md={6}><h5>Total Harga</h5></Col>
                    <Col md={6}><h5 className="text-right">Rp. 100000,-</h5></Col>                   
                </Row>
                <Row>
                    <hr/>
                    <input type="button" className="btn btn-primary" style={{width:"100%"}} value="Proceed to Payment"/>
                </Row>
            </Row>
        )     
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