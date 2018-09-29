import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';

class HomePage extends Component {
    render() {
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
                </Grid>
            </Grid>
        </section>
        );
    }
}

export default HomePage;