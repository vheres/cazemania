import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class PaymentPage extends Component {
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
                            <Col md={12}>
                            <h3>Keranjang Anda</h3>
                            <hr/>
                            </Col>
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

export default PaymentPage;