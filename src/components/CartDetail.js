import React, { Component } from 'react';
import { Row, Col, Thumbnail  } from 'react-bootstrap';
import {API_URL_1} from '../supports/api-url/apiurl'

class CartDetail extends Component {
    renderDeleteButton() {
        if (this.props.DeleteClick !== undefined) {
            return (
                <Col xs={2} md={2}>
                    <input type="button" className="btn-orange-blue" value="delete" onClick={()=>this.props.DeleteClick(this.props.item.id)}/>
                </Col>   
            )
        }
        return
    }

    render() {
        const { item } = this.props
        return (
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={1}>
                            <h4>{this.props.count+1}</h4>
                        </Col>
                        <Col xs={10} md={3}>
                            <Thumbnail src={`${API_URL_1}${item.catalogue.image}`}/>
                        </Col>
                        <Col xs={6} md={4}>
                            <Row>
                                <h4>{item.catalogue.name} | {item.catalogue.code}</h4>
                            </Row>
                            <Row>
                                <p>Details: {item.model}, {item.caseType} case</p>
                            </Row>
                            <Row>
                                <p>Quantity: {item.amount}</p>
                            </Row>
                        </Col>
                        <Col xs={6} md={2}>
                            <h4 style={{fontWeight:'bold'}}>Rp. {item.price.toLocaleString()}</h4>
                        </Col>
                        {this.renderDeleteButton()} 
                    </Row>
                </Col>         
            </Row>  
        );   
    }
}

export default CartDetail;