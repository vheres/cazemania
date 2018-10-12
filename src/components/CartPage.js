import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import CartDetail from './CartDetail';
import {API_URL_1} from '../supports/api-url/apiurl'
import axios from 'axios'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class CartPage extends Component {
    state = ({cart: []})

    componentWillMount(){
        let data = { origin: 'GKR',
        destination: 'TGR',
        weight: 1.7 }

        let axiosConfig = {
            headers: {
                "key": "54d16bfab958effecbfc849133dc706e",
                "content-type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*"
            }
          }

        axios.post("http://api.sicepat.com/customer/tariff", data, axiosConfig)
        .then((res)=>{
            console.log(res.data)
        })
        this.getCartList();
    }

    getCartList() {
        axios.get(API_URL_1 + `/cart/` + this.props.auth.id)
        .then((response) => {
            this.setState({cart: response.data.results})
        })
    }

    onPaymentClick() {
        this.props.history.push('/payment')
    }

    onDeleteClick(id) {
        axios.delete(API_URL_1 + `/cart/` + id)
        .then((response) => {
            this.setState({cart: response.data.results1})
            alert(`delete item success!`)
        }).catch((err) => {
            console.log(err);
        })
    }

    onClearCartClick() {
        var ids = "("
        this.state.cart.map((item,count) => {
            if (count < this.state.cart.length - 1) {
                ids += `${item.id}, `
            }
            else {
                ids += `${item.id})`
            }
        })
        axios.post(API_URL_1 + `/clear_cart`, {
            ids: ids
        }).then((response) => {
            this.setState({cart:[]})
            alert(`clear cart success!`)
        }).catch((err) => {
            console.log(err);
        })
    }

    renderCartList() {
        var arrJSX = [];
        arrJSX = this.state.cart.map((item,count) => {
            return <CartDetail key={item.id} id={item.id} count={count} name={item.code} image={item.image} brand={item.brand_name} model={item.model_name} type={item.case_type} quantity={item.amount} price={item.price} DeleteClick={(temp)=>this.onDeleteClick(temp)}></CartDetail>
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
                    <input type="button" className="btn btn-primary" style={{width:"100%"}} value="Proceed to Payment" onClick={()=>this.onPaymentClick()}/>
                </Row>
            </Row>
        )     
    }

    renderCartPage() {
        if (this.state.cart.length == 0) {
            return(
                <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Row>
                        <Col mdOffset={2} md={8}>
                            <img src="https://cdn3.iconfinder.com/data/icons/flat-icons-big-sized/64/shopping-card-512.png" alt="empty cart" className="empty-cart"></img>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-center">Your cart is empty, shop now!</h4>
                    </Row>
                    <Row>
                        <input type="button" className="btn btn-success gotoshop-button" value="Go to shop!" onClick={()=>this.props.history.push('/shop')}/>
                    </Row>
                </Grid>
            )
        }
        else {
            return(
                <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Col mdOffset={2} md={5}>
                        <Row>
                            <Col md={10}>
                                <h3>Keranjang Anda</h3>
                            </Col>
                            <Col md={2}>
                                <input type="button" className="btn btn-warning" value="Clear Cart" onClick={()=>this.onClearCartClick()}/>
                            </Col>
                            <hr/>
                        </Row>
                            {this.renderCartList()}              
                    </Col>
                    <Col mdOffset={1} md={2}>
                        {this.renderTransactionSummary()}
                    </Col>
                </Grid>
            );
        }
        
        }

    render() {
        console.log(this.props.auth.email)
        if(this.props.auth.email != "") {
            return (
            this.renderCartPage()
            );
        }
        return <Redirect to="/login" />;    
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
  
    return { auth };
  }


  
export default connect(mapStateToProps, {})(CartPage);