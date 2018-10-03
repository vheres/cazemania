import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';

class DetailPage extends Component {
    state = { item: [] }

    // componentWillMount() {
    //     const search = this.props.location.search;
    //     const params = new URLSearchParams(search);
    //     const id = params.get('id');
    //     axios.get(API_URL_1 + "/", {
    //         params: {
    //             id
    //         }
    //     }).then(item => {
    //             this.setState({  })
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }

    renderDetailPage() {
        return(
                <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={3}>
                            <img src="https://cf.shopee.co.id/file/d5d8b0b37ff26c33d554b48cf24bf7b4" alt="product's image" style={{width:"100%"}}></img>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <h3>Flamingo</h3>    
                            </Row>
                            <Row>
                                <h2 className="price-text">Rp50.000 - Rp150.000</h2>    
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Row>
                                        <h4>Brand</h4>
                                    </Row>
                                    <Row>
                                        <select ref="optionBrand" class="form-control" value={this.state.value} style={{width:"80%"}}>
                                            <option value="">Brand</option>
                                        </select>
                                    </Row>     
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <h4>Model</h4>
                                    </Row>
                                    <Row>
                                        <select ref="optionModel" class="form-control" value={this.state.value} style={{width:"80%"}}>
                                            <option value="">Model</option>
                                        </select>
                                    </Row>   
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <h4>Type</h4>
                                    </Row>
                                    <Row>
                                        <select ref="optionType" class="form-control" value={this.state.value} style={{width:"80%"}}>
                                            <option value="">Type</option>
                                        </select>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={1}>
                                    <Row>
                                        <br/>
                                        <h4>Quantity</h4>
                                    </Row>
                                </Col>
                                <Col md={1}>
                                    <br/>
                                    <input type="button" className="btn btn-danger no-margin" value="-" style={{width:"35px"}}></input>
                                </Col>
                                <Col md={1}>
                                    <br/>
                                    <input type="text" ref="quantity" className="form-control center-item no-margin text-center" defaultValue={1} style={{width:"50px"}}></input>
                                </Col>
                                <Col md={1}>
                                    <br/>
                                    <input type="button" className="btn btn-success no-margin" value="+" style={{width:"35px"}}></input>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <Row>
                                        <br/>
                                        <input type="button" className="btn btn-primary" value="Add to Cart" style={{width:"100%"}}></input>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>                        
                </Grid>
            );
        }
        
    render() {
        return (
        this.renderDetailPage()
        );   
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, {})(DetailPage);