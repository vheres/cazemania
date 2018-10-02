import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class ItemDetail extends Component {
    render() {
        return (
            <Col md={3}><Thumbnail src={this.props.image}></Thumbnail></Col>   
        );   
    }
}

export default ItemDetail;