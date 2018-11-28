import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import CarouselClass from './Carousel';
import CarouselText from './CarouselText';
import CarouselInsta from './CarouselInsta';
import InstaSlide from './InstaSlide';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';

class HomePage extends Component {
    componentDidMount() {
        ReactPixel.pageView();
    }

    renderHomePage() {
        return(
                <Grid fluid style={{'background-color':'white'}}>
                    <Row className="m-n">
                        {/* <img src={`${API_URL_1}/others/banner.jpg`} alt="banner" className="homepage-banner"></img> */}
                        <img src={`http://cdn.shopify.com/s/files/1/0251/0700/files/new-site-front-web_dea787d8-3987-40cd-b8a1-b9525868b15f_1920x_crop_center.jpg?v=1541028437`} alt="banner" className="homepage-banner"></img>
                    </Row>
                    <Row className="m-t-lg">
                        <Col xsOffset={0} mdOffset={2} md={8}>
                            <Row>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src="https://scontent-sin2-1.cdninstagram.com/vp/6a487f4a26adac22b28d7d75ece19669/5C956EF5/t51.2885-15/e35/30603997_182774195776108_6287616140323586048_n.jpg" className="homepage-button" />
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src="https://scontent-sin2-1.cdninstagram.com/vp/2bbbac82444b6533bb5b152335b20584/5C8E8060/t51.2885-15/e35/32098287_354430215048555_6874638337466957824_n.jpg" className="homepage-button" />
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src="https://scontent-sin2-1.cdninstagram.com/vp/2f220a759f7f4eca4bf1976b814c7636/5C77941B/t51.2885-15/e35/36136180_425865714581011_4892358712427020288_n.jpg" className="homepage-button" />
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src="https://scontent-sin2-1.cdninstagram.com/vp/6cee4e8f22d0131787459f04e6368803/5C93F1EC/t51.2885-15/e35/27893987_804030019784779_7230577674744233984_n.jpg" className="homepage-button" />
                                    </Link>
                                </Col>
                                <Col xs={4}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src="https://scontent-sin2-1.cdninstagram.com/vp/2ddb0fabba5ed283aa21206b249a11fc/5C955EB2/t51.2885-15/e35/27879826_561497480896159_2797966190259994624_n.jpg" className="homepage-button" />
                                    </Link>
                                </Col>
                                <Col xs={4}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src="https://scontent-sin2-1.cdninstagram.com/vp/3b14dce945429e0854e51e5c9ede8d49/5C97A3B0/t51.2885-15/e35/26864211_148228589223831_5726576180333641728_n.jpg" className="homepage-button" />
                                    </Link>
                                </Col>
                                <Col xs={4}>
                                    <Link to="/shop" className="image-holder" style={{width:"100%"}}>
                                        <img src="https://scontent-sin2-1.cdninstagram.com/vp/f7b78561da440929ffabca3292a0c812/5CB0A8FC/t51.2885-15/e35/26156109_576483306037518_3470829652480622592_n.jpg" className="homepage-button" />
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