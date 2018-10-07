import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import CartDetail from './CartDetail';
import {API_URL_1} from '../supports/api-url/apiurl'
import axios from 'axios'
import { connect } from 'react-redux';

class CartPage extends Component {
    state = ({cart: []})

    componentWillMount(){
        let data = { origin: '501',
        destination: '114',
        weight: 1700,
        courier: 'jne' }

        let axiosConfig = {
            headers: {
                "key": "d8b59afa48a3ecd432b46bad2eda8d07",
                "content-type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
            }
          }

        axios.post("https://api.rajaongkir.com/starter/cost", data, axiosConfig)
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
        return(
                <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Col md={2}></Col>
                    <Col md={5}>
                        <Row>
                            <Col md={12}>
                            <h3>Keranjang Anda</h3>
                            <hr/>
                            </Col>
                        </Row>
                            {this.renderCartList()}              
                    </Col>
                    <Col mdOffset={1} md={2}>
                        {this.renderTransactionSummary()}
                    </Col>
                </Grid>
            );
        }

    render() {
        return (
        this.renderCartPage()
        );   
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
  
    return { auth };
  }


  
export default connect(mapStateToProps, {})(CartPage);