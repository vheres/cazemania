import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class CartDetail extends Component {
    renderDeleteButton() {
        if (this.props.DeleteClick != undefined) {
            return (
                <Col md={2}>
                        <input type="button" className="btn btn-danger" value="delete" onClick={()=>this.props.DeleteClick(this.props.id)}/>
                </Col>   
            )
        }
        return
    }

    render() {
        return (
            <Row>
                <Col md={10}>
                    <Col md={1}>
                        <h4>{this.props.count+1}</h4>
                    </Col>
                    <Col md={3}>
                        <Thumbnail src={this.props.image}></Thumbnail>
                    </Col>
                    <Col md={5}>
                        <Row>
                            <h4>{this.props.name} | {this.props.code}</h4>
                        </Row>
                        <Row>
                            <p>Details: {this.props.model}, {this.props.type} case</p>
                        </Row>
                        <Row>
                            <p>Quantity: {this.props.quantity}</p>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <h3>Rp. {this.props.price}</h3>
                    </Col>
                </Col>
                {this.renderDeleteButton()}         
            </Row>  
        );   
    }
}

export default CartDetail;