import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Row, Col } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import {API_URL_1} from '../supports/api-url/apiurl'
import Magnifier from 'react-magnifier';
import "react-alice-carousel/lib/alice-carousel.css";

class CarouselPremiumThumbs extends Component {
    state = {similar_product: [], index: 0}

    responsive = {
        0: { items: 6 }
    };

    renderThumb() {
        var arrJSX = []
            this.props.images.map((item, index) => {
                if (this.props.images.length < 6) {
                    arrJSX.push(
                        <Col xs={2}>
                            <img src={`${API_URL_1}/premium/${item.image}.jpg`} className="m-b carousel-thumbnail" style={{width:'100%'}} key={index} onClick={() => this.props.thumbClick(index)}/>
                        </Col>
                    )
                } else {
                    arrJSX.push(
                        <img src={`${API_URL_1}/premium/${item.image}.jpg`} className="m-b carousel-thumbnail" style={{width:'90%',marginLeft:'5%'}} key={index} onClick={() => this.props.thumbClick(index)}/>
                    )
                }
            })
        return arrJSX
    }

    render() {
        const items = this.renderThumb();  
        if (this.props.images.length < 6) {
            return (
                <Row>
                    {items}
                </Row>
            )
        } else {
            return (
                <div className="m-t-xs">
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
                        <div className="premium-carousel-arrow">
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center', height:'100%'}}>
                                <button onClick={() => this.Carousel._slidePrev()} className="btn btn-tosca"><i className="fa fa-chevron-left"/></button>
                            </div>
                        </div>
                        <div className="premium-carousel-arrow" style={{right:'0px'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center', height:'100%'}}>
                                <button onClick={() => this.Carousel._slideNext()} className="btn btn-tosca"><i className="fa fa-chevron-right"/></button>
                            </div>
                        </div>
                    </Row>
                </div>
            );     
        }
    }
};

export default CarouselPremiumThumbs;