import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class CartDetail extends Component {
    render() {
        return (
            // <Row>
            //     <Col md={1}>
            //         <h4>{this.props.count+1}</h4>
            //     </Col>
            //     <Col md={3}>
            //         <Thumbnail src={this.props.image}></Thumbnail>
            //     </Col>
            //     <Col md={5}>
            //         <Row>
            //             <h4>{this.props.name}</h4>
            //         </Row>
            //         <Row>
            //             <p>Details: {this.props.model}, {this.props.type}</p>
            //         </Row>
            //         <Row>
            //             <p>Quantity: {this.props.quantity}</p>
            //         </Row>
            //     </Col>
                    // <Col md={3}>
                    //     <h3>Rp50000</h3>
                    // </Col>
            // </Row>

            <Row>
                <Col md={1}>
                    <h4>1</h4>
                </Col>
                <Col md={3}>
                    <Thumbnail src="https://cf.shopee.co.id/file/d97db324ea10532ba1f7587c78ab8e1b"></Thumbnail>
                </Col>
                <Col md={5}>
                    <Row>
                        <h3>Flamingo</h3>
                    </Row>
                    <Row>
                        <p>Details: Iphone 5, Soft Case</p>
                    </Row>
                    <Row>
                        <p>Quantity: 1</p>
                    </Row>
                </Col>
                <Col md={3}>
                    <h3>Rp.50000,-</h3>
                </Col>     
            </Row>
              
        );   
    }
}

export default CartDetail;