import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import CarouselClass from './Carousel';
import CarouselText from './CarouselText';
import CarouselInsta from './CarouselInsta';
import InstaSlide from './InstaSlide';
import axios from 'axios';
import { Link } from 'react-router-dom';

class HomePage extends Component {      

    renderHomePage() {
        return(
                <Grid fluid className="HomePage-css margin-15">
                    <Row>
                        <img src ="https://cdn.shopify.com/s/files/1/2689/9614/files/BANNER_COFFEE_LOVERS.jpg?v=1537540529" alt="banner" className="homepage-banner"></img>
                    </Row>
                        <Row>
                            <Col xsOffset={0} mdOffset={2} md={8}>
                                <Row>
                                    <Col xs={4} md={4}>
                                        <Link to="/shop" className="image-holder">
                                            <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                            <div className="overlay"></div>
                                        </Link>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <Link to="/shop" className="image-holder">
                                            <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                            <div className="overlay"></div>
                                        </Link>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <Link to="/shop" className="image-holder">
                                            <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                            <div className="overlay"></div>
                                        </Link>                                    
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <Link to="/shop" className="image-holder">
                                            <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                            <div className="overlay"></div>
                                        </Link>                                   
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <Link to="/shop" className="image-holder">
                                            <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                            <div className="overlay"></div>
                                        </Link>                                    
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <Link to="/shop" className="image-holder">
                                            <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                            <div className="overlay"></div>
                                        </Link>                                    
                                    </Col>
                                </Row>
                            </Col>   
                        </Row>
                        <Row className="bestseller-css">
                            <Row>
                                <h2 className="text-center">Best Seller</h2>
                            </Row>
                            <Row>
                                <Col md={2}></Col>
                                <Col md={8}><CarouselClass/></Col>
                            </Row>
                        </Row>
                        <Row>
                            <Row>
                                <Col md={4}></Col>
                                <Col md={4}><hr/></Col>
                            </Row>
                            <Row>
                                <Col xs={4}></Col>
                                <Col xs={4}><h2 className="text-center">Happy Customer</h2></Col>
                                
                            </Row>
                            <Row>
                                <Col xs={3} md={4}></Col>
                                <Col xs={6} md={4}><CarouselText/><hr/></Col>
                            </Row>
                        </Row>
                        <Row className="instagram-css">
                            <Row className="margin-15p text-center">
                            <img src="https://diylogodesigns.com/wp-content/uploads/2016/05/instagram-Logo-PNG-Transparent-Background-download-768x768.png" alt="instagram" style={{width:"50px"}}></img><span className="instagram-title">@Cazemania</span>
                            </Row>
                            <Row className="padding-15p">
                            <Col mdOffset={1} md={10}><CarouselInsta/></Col>
                            </Row>           
                        </Row>
                </Grid>
            );
    }

    render() {
        return (
        this.renderHomePage()
        );   
    }
}

export default HomePage;