import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';

class CartPage extends Component {
    renderCartList() {

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
                    <input type="button" className="btn btn-primary" style={{width:"100%"}} value="Checkout"/>
                </Row>
            </Row>
        )     
    }

    renderCartPage() {
        return(
                <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Col md={2}></Col>
                    <Col md={6}>
                    {this.renderCartList()}
                    </Col>
                    <Col md={2}>
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

export default CartPage;