import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail  } from 'react-bootstrap';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {API_URL_1} from '../supports/api-url/apiurl'

class ItemDetail extends Component {
    render() {
        return (
            // <Col md={3}><Thumbnail src={this.props.image} onClick={()=>this.props.ItemClick(this.props.id)}></Thumbnail></Col>
            // <Col md={3}><div className="shop-holder" onClick={()=>this.props.ItemClick(this.props.id)}><img src={API_URL_1+'/'+this.props.image+'.jpg'} style={{width:"100%"}}/><div className="shop-overlay">{this.props.name}</div></div></Col>
            <Col xs={6} md={3}>
                <Row>
                    <Link to={"/product?id="+this.props.id} className="shop-holder">
                        <img src={API_URL_1+'/normal/'+this.props.image+'.jpg'} style={{width:"100%"}}/>
                        <div className="shop-overlay">{this.props.name}</div>
                    </Link>
                </Row>
                <Row>
                    <Link to={"/product?id="+this.props.id} className="text-item-detail text-ellipsis" title={this.props.name}>
                        <strong>{this.props.name}</strong>
                    </Link>
                </Row>
            </Col>
            
        );   
    }
}

export default ItemDetail;