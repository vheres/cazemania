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
                <Grid fluid style={{'background-color':'white'}}>
                    <Row className="m-n">
                        {/* <img src={`${API_URL_1}/others/banner.jpg`} alt="banner" className="homepage-banner"></img> */}
                        <img src={`https://cdn-stamplib.casetify.com/cms/image/b1693f984b9c00ca202b0cf2da85cf3c.png`} alt="banner" className="homepage-banner"></img>
                    </Row>
                    <Row className="m-t-lg">
                        <Col xsOffset={0} mdOffset={2} md={8}>
                            <Row>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{'background-color':'gray', height:"400px"}}>
                                        {/* <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%", height:"400px"}}/> */}
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{'background-color':'gray', width:"100%", height:"400px"}}>
                                        {/* <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%", height:"400px"}}/> */}
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{'background-color':'gray', width:"100%", height:"400px"}}>
                                        {/* <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%", height:"400px"}}/> */}
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{'background-color':'gray', width:"100%", height:"400px"}}>
                                        {/* <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%", height:"400px"}}/> */}
                                    </Link>
                                </Col>
                                <Col xs={4}>
                                    <Link to="/shop" className="image-holder" style={{'background-color':'gray', width:"100%", height:"300px"}}>
                                        {/* <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%", height:"300px"}}/> */}
                                    </Link>
                                </Col>
                                <Col xs={4}>
                                    <Link to="/shop" className="image-holder" style={{'background-color':'gray', width:"100%", height:"300px"}}>
                                        {/* <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%", height:"300px"}}/> */}
                                    </Link>
                                </Col>
                                <Col xs={4}>
                                    <Link to="/shop" className="image-holder" style={{'background-color':'gray', width:"100%", height:"300px"}}>
                                        {/* <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" style={{width:"100%", height:"300px"}}/> */}
                                    </Link>
                                </Col>
                            </Row>
                        </Col>   
                    </Row>
                    <Row style={{'margin-top':'150px'}}>
                        <Col xs={12}>
                            <div className="general-title-blue text-center">Best Seller</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <CarouselClass/>
                        </Col>
                    </Row>
                    <Row style={{'margin-top':'150px'}}>
                        <Col xs={12}>
                            <div className="general-title-blue text-center">Happy Customer</div>
                        </Col>
                    </Row>
                    <Row style={{'margin-top':'20px','background-color':'rgb(235, 235, 235)', 'padding-top':'50px', 'padding-bottom':'50px'}}>
                        <Col xsOffset={0} xs={12} mdOffset={4} md={4}>
                            <CarouselText/>
                        </Col>
                    </Row>
                    <Row style={{'margin-top':'150px'}}>
                        <Col xs={12} className="text-center">
                            <img src="https://diylogodesigns.com/wp-content/uploads/2016/05/instagram-Logo-PNG-Transparent-Background-download-768x768.png" alt="instagram" style={{width:"45px"}}/>
                            <div className="general-title-blue text-center">#Instagram</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <CarouselInsta/>
                        </Col>
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