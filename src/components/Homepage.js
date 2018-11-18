import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import CarouselClass from './Carousel';
import CarouselText from './CarouselText';
import CarouselInsta from './CarouselInsta';
import InstaSlide from './InstaSlide';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';

class HomePage extends Component {      

    renderHomePage() {
        return(
                <Grid fluid className="HomePage-css">
                    <Row className="m-n">
                        <img src={`${API_URL_1}/others/banner.jpg`} alt="banner" className="homepage-banner"></img>
                    </Row>
                    <Row>
                        <Col xsOffset={0} mdOffset={2} md={8}>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Link to="/shop" className="image-holder">
                                        <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                        <div className="overlay"></div>
                                    </Link>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Link to="/shop" className="image-holder">
                                        <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                        <div className="overlay"></div>
                                    </Link>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Link to="/shop" className="image-holder">
                                        <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                        <div className="overlay"></div>
                                    </Link>                                    
                                </Col>
                                <Col xs={6} md={4}>
                                    <Link to="/shop" className="image-holder">
                                        <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                        <div className="overlay"></div>
                                    </Link>                                   
                                </Col>
                                <Col xs={6} md={4}>
                                    <Link to="/shop" className="image-holder">
                                        <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                        <div className="overlay"></div>
                                    </Link>                                    
                                </Col>
                                <Col xs={6} md={4}>
                                    <Link to="/shop" className="image-holder">
                                        <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%"}}/>
                                        <div className="overlay"></div>
                                    </Link>                                    
                                </Col>
                            </Row>
                        </Col>   
                    </Row>
                    <Row className="bg-orange-light m-n">
                        <Row className="m-n" style={{"background-color": 'rgb(30,190,203)', "padding-top": 15, "padding-bottom": 15}}>
                            <div className="text-center text-white" style={{'font-size':'24px'}}>Best Seller</div>
                            {/* <div className="block-margin-auto best-seller-pointer"></div> */}
                        </Row>
                        <Row>
                            <Col mdOffset={1} md={10}><CarouselClass/></Col>
                        </Row>
                    </Row>
                    <Row className="m-b-lg">
                        <Row className="m-t-lg">
                            <Col xs={12}><h2 className="text-center">Happy Customer</h2></Col>
                            
                        </Row>
                        <Row>
                            <Col xsOffset={0} xs={12} mdOffset={4} md={4}><CarouselText/></Col>
                        </Row>
                    </Row>
                    {/*  Row className="bg-orange-light" */}
                    <Row className="bg-orange-light m-n"> 
                        <Row className="text-center m-n" style={{"background-color": 'rgb(30,190,203)', "padding-top": 15, "padding-bottom": 15}}>
                        <img src="https://diylogodesigns.com/wp-content/uploads/2016/05/instagram-Logo-PNG-Transparent-Background-download-768x768.png" alt="instagram" style={{width:"45px"}}></img><span className="text-white" style={{'font-size':'24px'}}>@Cazemania</span>
                        </Row>
                        <Row className="padding-15p">
                        <Col md={12}><CarouselInsta/></Col>
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