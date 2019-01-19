import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import CarouselClass from './Carousel';
import CarouselText from './CarouselText';
import CarouselInsta from './CarouselInsta';
import { Link } from 'react-router-dom';
import {API_URL_1} from '../supports/api-url/apiurl'
import ReactPixel from 'react-facebook-pixel';

class HomePage extends Component {
    componentDidMount() {
        ReactPixel.pageView();
    }

    renderHomePage() {
        return(
                <Grid fluid style={{'background-color':'white'}}>
                    <Row className="m-n">
                        <img src={`${API_URL_1}/others/banner2.jpg`} alt="banner" className="homepage-banner"></img>
                    </Row>
                    <Row className="m-t-lg">
                        <Col xsOffset={0} mdOffset={3} md={6}>
                            <Row>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src={`${API_URL_1}/others/icons/icon1.png`} className="homepage-button" style={{backgroundColor:'rgb(9, 175, 204)'}}/>
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder alt" style={{width:"100%"}}>
                                        <img src={`${API_URL_1}/others/icons/icon2.png`} className="homepage-button" style={{backgroundColor:'rgb(255, 181, 44)'}}/>
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder alt" style={{width:"100%"}}>
                                        <img src={`${API_URL_1}/others/icons/icon3.png`} className="homepage-button" style={{backgroundColor:'rgb(255, 181, 44)'}}/>
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src={`${API_URL_1}/others/icons/icon4.png`} className="homepage-button" style={{backgroundColor:'rgb(9, 175, 204)'}}/>
                                    </Link>
                                </Col>
                                <Col xs={4}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src={`${API_URL_1}/others/icons/icon5.png`} className="homepage-button" style={{backgroundColor:'rgb(9, 175, 204)'}}/>
                                    </Link>
                                </Col>
                                <Col xs={4}>
                                    <Link to="/shop" className="image-holder alt" style={{width:"100%"}}>
                                        <img src={`${API_URL_1}/others/icons/icon6.png`} className="homepage-button" style={{backgroundColor:'rgb(255, 181, 44)'}}/>
                                    </Link>
                                </Col>
                                <Col xs={4}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src={`${API_URL_1}/others/icons/icon1.png`} className="homepage-button" style={{backgroundColor:'rgb(9, 175, 204)'}}/>
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