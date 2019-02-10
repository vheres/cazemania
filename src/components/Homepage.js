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
                <Grid fluid style={{'background-color':'white'}}>
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
                                                <img src={`${API_URL_1}/others/icons/icon1.png`} style={{width:'100%'}}/>
                                            </div>
                                            <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center',paddingBottom:'30px'}}>
                                                <div style={{fontSize:'24pt',color:'rgb(255, 181, 44)',fontWeight:'bold'}}>
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
                                                <img src={`${API_URL_1}/others/icons/icon2.png`} style={{width:'100%'}}/>
                                            </div>
                                            <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center',paddingBottom:'30px'}}>
                                                <div style={{fontSize:'24pt',color:'rgb(9, 175, 204)',fontWeight:'bold'}}>
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
                                                <img src={`${API_URL_1}/others/icons/icon3.png`} style={{width:'100%'}}/>
                                            </div>
                                            <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center',paddingBottom:'30px'}}>
                                                <div style={{fontSize:'24pt',color:'rgb(255, 181, 44)',fontWeight:'bold'}}>
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
                                                <img src={`${API_URL_1}/others/icons/icon4.png`} style={{width:'100%'}}/>
                                            </div>
                                            <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center',paddingBottom:'30px'}}>
                                                <div style={{fontSize:'24pt',color:'rgb(9, 175, 204)',fontWeight:'bold'}}>
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
                                                <img src={`${API_URL_1}/others/icons/icon5.png`} style={{width:'100%'}}/>
                                            </div>
                                            <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center',paddingBottom:'30px'}}>
                                                <div style={{fontSize:'24pt',color:'rgb(255, 181, 44)',fontWeight:'bold'}}>
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
                                                <img src={`${API_URL_1}/others/icons/icon6.png`} style={{width:'100%'}}/>
                                            </div>
                                            <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center',paddingBottom:'30px'}}>
                                                <div style={{fontSize:'24pt',color:'rgb(9, 175, 204)',fontWeight:'bold'}}>
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
                                <span className="icon" style={{color:'rgb(9, 175, 204)'}}><i class="fa fa-instagram"></i></span>
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