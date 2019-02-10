import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import CarouselPremiumThumbs from './CarouselPremiumThumbs';
import { Row, Col } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import {API_URL_1} from '../supports/api-url/apiurl'
import Magnifier from 'react-magnifier';

class CarouselPremium extends Component {
    state = {similar_product: [], index: 0}

    responsive = {
        0: { items: 1 }
    };

    galleryItems() {
        return (
            this.props.images.map((item, index) => {
                return <Magnifier key={`key-${index}`} src={`${API_URL_1}/premium/${item.image}.jpg`} style={{width:"100%"}}/>
            })
        )
    };

    render() {
    const items = this.galleryItems();  
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <AliceCarousel
                        items={items}
                        duration={400}
                        autoPlay={false}
                        fadeOutAnimation={true}
                        autoPlayInterval={2000}
                        responsive={this.responsive}
                        autoPlayActionDisabled={true}
                        dotsDisabled={true}
                        buttonsDisabled={true}
                        mouseDragEnabled={false}
                        ref={ el => this.Carousel = el }
                        />
                    </Col>
                </Row>
                <Row className="m-t">
                    <Col xs={12}>
                        <CarouselPremiumThumbs images={this.props.images} thumbClick={(i)=>this.Carousel._onDotClick(i)}/>
                    </Col>
                </Row>
            </div>
        );     
    }
};

export default CarouselPremium;