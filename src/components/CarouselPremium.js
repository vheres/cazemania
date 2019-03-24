import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import CarouselPremiumThumbs from './CarouselPremiumThumbs';
import { Row, Col } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import {API_URL_1} from '../supports/api-url/apiurl'
import Magnifier from 'react-magnifier';

class CarouselPremium extends Component {
    state = {images: [], index: 0}

    responsive = {
        0: { items: 1 }
    };

    componentDidMount() {
        this.setImages();
    }

    setImages() {
        var images = [];
        images.push(this.props.item.image);
        this.props.item.premiumImages.forEach((item, index) => {
            images.push(item.image);
        })
        this.setState({images: images})
    }

    galleryItems() {
        return (
            this.state.images.map((item, index) => {
                return <Magnifier zoomFactor={1.1} mgWidth={300} mgHeight={300} key={`key-${index}`} src={`${API_URL_1}${item}`}/>
            })
        )
    };

    render() {
        if (this.state.images.length > 0) {
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
                            <CarouselPremiumThumbs images={this.state.images} thumbClick={(i)=>this.Carousel._onDotClick(i)}/>
                        </Col>
                    </Row>
                </div>
            ); 
        } else {
            return (<div>Acquiring Page</div>)
        }
    }
};

export default CarouselPremium;