import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import CarouselClass from './Carousel';
import CarouselText from './CarouselText';
import CarouselInsta from './CarouselInsta';
import { Link } from 'react-router-dom';
import {API_URL_1} from '../supports/api-url/apiurl'
import ReactPixel from 'react-facebook-pixel';
import CarouselBanner from './CarouselBanner';

class HomePage extends Component {
    componentDidMount() {
        ReactPixel.pageView();
    }

    renderHomePage() {
        return(
                <Grid fluid style={{backgroundColor:'white'}}>
                    <Row className="m-n">
                        <CarouselBanner/>
                    </Row>
                    <Row className="m-t-lg">
                        <Col xsOffset={0} xs={12} mdOffset={1} md={10}>
                            <Row>
                                <Col xs={4} className="homepage-button-padding">
                                    <Link to="/shop" className="image-holder" style={{width:"100%",paddingTop:'100%',backgroundColor:'#D4F4F2'}}>
                                        <div style={{position:'absolute', top:'0px', width:'100%',height:'100%'}}>
                                            <div style={{position:'absolute',top:'0px', width:'100%',height:'100%'}}>
                                                <img src={`${API_URL_1}/others/icons/icon1.png`} alt="katalog case" style={{width:'100%'}}/>
                                            </div>
                                            <div className="homepage-button-text-padding">
                                                <div className="homepage-button-text-orange">
                                                    Katalog Case
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col xs={4} className="homepage-button-padding">
                                    <Link to="/custom" className="image-holder alt" style={{width:"100%",paddingTop:'100%',backgroundColor:'#F9E7D7'}}>
                                        <div style={{position:'absolute', top:'0px', width:'100%',height:'100%'}}>
                                            <div style={{position:'absolute',top:'0px', width:'100%',height:'100%'}}>
                                                <img src={`${API_URL_1}/others/icons/icon2.png`} alt="custom case" style={{width:'100%'}}/>
                                            </div>
                                            <div className="homepage-button-text-padding">
                                                <div className="homepage-button-text-blue">
                                                    Custom Case
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col xs={4} className="homepage-button-padding">
                                    <Link to="/premium_cases" className="image-holder" style={{width:"100%",paddingTop:'100%',backgroundColor:'#D4F4F2'}}>
                                        <div style={{position:'absolute', top:'0px', width:'100%',height:'100%'}}>
                                            <div style={{position:'absolute',top:'0px', width:'100%',height:'100%'}}>
                                                <img src={`${API_URL_1}/others/icons/icon3.png`} alt="premium case" style={{width:'100%'}}/>
                                            </div>
                                            <div className="homepage-button-text-padding">
                                                <div className="homepage-button-text-orange">
                                                    Premium Case
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col xs={4} className="homepage-button-padding">
                                    <Link to="/reseller-dropshipper" className="image-holder alt" style={{width:"100%",paddingTop:'100%',backgroundColor:'#F9E7D7'}}>
                                        <div style={{position:'absolute', top:'0px', width:'100%',height:'100%'}}>
                                            <div style={{position:'absolute',top:'0px', width:'100%',height:'100%'}}>
                                                <img src={`${API_URL_1}/others/icons/icon4.png`} alt="join reseller" style={{width:'100%'}}/>
                                            </div>
                                            <div className="homepage-button-text-padding">
                                                <div className="homepage-button-text-blue">
                                                    Join Reseller
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col xs={4} className="homepage-button-padding">
                                    <Link to="/shop" className="image-holder" style={{width:"100%",paddingTop:'100%',backgroundColor:'#D4F4F2'}}>
                                        <div style={{position:'absolute', top:'0px', width:'100%',height:'100%'}}>
                                            <div style={{position:'absolute',top:'0px', width:'100%',height:'100%'}}>
                                                <img src={`${API_URL_1}/others/icons/icon5.png`} alt="list tipe hp" style={{width:'100%'}}/>
                                            </div>
                                            <div className="homepage-button-text-padding">
                                                <div className="homepage-button-text-orange">
                                                    List Tipe HP
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col xs={4} className="homepage-button-padding">
                                    <Link to="/shop" className="image-holder alt" style={{width:"100%",paddingTop:'100%',backgroundColor:'#F9E7D7'}}>
                                        <div style={{position:'absolute', top:'0px', width:'100%',height:'100%'}}>
                                            <div style={{position:'absolute',top:'0px', width:'100%',height:'100%'}}>
                                                <img src={`${API_URL_1}/others/icons/icon6.png`} alt="canvas bag mania" style={{width:'100%'}}/>
                                            </div>
                                            <div className="homepage-button-text-padding">
                                                <div className="homepage-button-text-blue">
                                                    Canvas Bag Mania
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>   
                    </Row>
                    <Row className="homepage-section-margin">
                        <Col xsOffset={1} xs={10}>
                            <div className="text-center font-bold homepage-section-title" style={{color:'#F9A044'}}>BEST SELLER</div>
                            <div className="border" style={{borderColor:'#D4F4F2',paddingTop:'0.5rem'}}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'2rem'}}>
                        <Col xs={12}>
                            <CarouselClass/>
                        </Col>
                    </Row>
                    <Row className="homepage-section-margin">
                        <Col xsOffset={1} xs={10}>
                            <div className="text-center font-bold homepage-section-title" style={{color:'rgb(9, 175, 204)'}}>HAPPY CUSTOMER</div>
                            <div className="border" style={{borderColor:'#F9E7D7',paddingTop:'0.5rem'}}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'3rem',paddingTop:'5rem',paddingBottom:'5rem',backgroundColor:'#f2f2f2'}}>
                        <Col xsOffset={0} xs={12} mdOffset={4} md={4}>
                            <CarouselText/>
                        </Col>
                    </Row>
                    <Row className="homepage-section-margin">
                        <Col xsOffset={1} xs={10}>
                            <div className="text-center font-bold homepage-section-title">
                                <span className="icon" style={{color:'rgb(9, 175, 204)'}}><i className="fa fa-instagram"></i></span>
                                <span style={{color:'#F9A044'}}> INSTAGRAM</span>
                                <div className="border" style={{borderColor:'#D4F4F2',paddingTop:'0.5rem'}}/>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'2rem',marginBottom:'150px'}}>
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