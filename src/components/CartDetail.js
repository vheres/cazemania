import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class CartDetail extends Component {
    renderDeleteButton() {
        if (this.props.DeleteClick != undefined) {
            return (
                <Col xs={2} md={1}>
                        <input type="button" className="btn btn-danger" value="delete" onClick={()=>this.props.DeleteClick(this.props.id)}/>
                </Col>   
            )
        }
        return
    }

    renderImage(){
        if(this.props.category === "normal"){
            return <Thumbnail src={API_URL_1+'/normal/'+this.props.image+'.jpg '}></Thumbnail>
        }
        else if(this.props.category === "custom"){
            return <Thumbnail src={API_URL_1+'/custom/'+this.props.image+'.jpg '}></Thumbnail>
        }
        else if(this.props.category === "premium"){
            return <Thumbnail src={API_URL_1+'/premium/'+this.props.image+'.jpg '}></Thumbnail>
        }
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Col xs={1}>
                        <h4>{this.props.count+1}</h4>
                    </Col>
                    <Col xs={10} md={3}>
                        {this.renderImage()}
                    </Col>
                    <Col xs={6} md={4}>
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
                    <Col xs={6} md={3}>
                        <h3>Rp. {this.props.price}</h3>
                    </Col>
                    {this.renderDeleteButton()} 
                </Col>         
            </Row>  
        );   
    }
}

export default CartDetail;