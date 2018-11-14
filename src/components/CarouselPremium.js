import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Col } from 'react-bootstrap';
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

    renderThumb() {
        var arrJSX = []
        this.props.images.map((item, index) => {
            arrJSX.push(<img src={`${API_URL_1}/premium/${item.image}.jpg`} className="m-b" style={{width:"100%", 'cursor':'pointer'}} key={index} onClick={() => this.Carousel._onDotClick(index)}/>)
        })
        return arrJSX;
    }

    render() {
    const items = this.galleryItems();  
        return (
            <div>
                <Col md={3} className="m-t">
                    {this.renderThumb()}
                </Col>
                <Col md={9}>
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
            </div>
        );     
    }
};

export default CarouselPremium;