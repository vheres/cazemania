import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import CarouselClass from './Carousel';
import CarouselText from './CarouselText';
import CarouselInsta from './CarouselInsta';
import InstaSlide from './InstaSlide';
import axios from 'axios';

class HomePage extends Component {      

    renderHomePage() {
        return(
            <section>
                <Grid fluid>
                    <Row>
                        <img src ="https://cdn.shopify.com/s/files/1/2689/9614/files/BANNER_COFFEE_LOVERS.jpg?v=1537540529" alt="banner" className="homepage-banner"></img>
                    </Row>
                    <Grid>
                        <Row>
                                <Col xs={4}>
                                <img src ="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" alt="banner" className="homepage-button"></img>
                                </Col>
                                <Col xs={4}>
                                    <img src="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" alt="banner" className="homepage-button"></img>
                                </Col>
                                <Col xs={4}>
                                <img src ="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" alt="banner" className="homepage-button"></img>
                                </Col>
                        </Row>
                        <Row>
                                <Col xs={4}>
                                <img src ="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" alt="banner" className="homepage-button"></img>
                                </Col>
                                <Col xs={4}>
                                <img src ="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" alt="banner" className="homepage-button"></img>
                                </Col>
                                <Col xs={4}>
                                <img src ="https://cdn.shopify.com/s/files/1/2689/9614/files/3-3_400x400_crop_center.jpg?v=1528277381" alt="banner" className="homepage-button"></img>
                                </Col>
                        </Row>
                        <Row>
                            <hr/>
                            <h2 className="text-center">Best Seller</h2>
                            <hr/>
                            <CarouselClass/>
                        </Row>
                        <Row>
                        <Col xs={3}></Col>
                        <Col xs={6}>
                            <Row>
                                <hr/>
                                <h2 className="text-center">Happy Customer</h2>
                                <hr/>
                                <CarouselText/>
                            </Row>
                        </Col>
                        </Row>
                        <Row>
                            <hr />
                            <CarouselInsta/>
                        </Row>
                    </Grid>
                </Grid>
            </section>
            );
    }

    render() {
        return (
        this.renderHomePage()
        );   
    }
}

export default HomePage;