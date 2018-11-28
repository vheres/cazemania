import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
 
class CarouselText extends Component {
  state = {testimonies: []}
    responsive = {
        0: { items: 1 }
      };

      componentDidMount() {
        this.getText()
      }
      
      getText() {
        axios.get(API_URL_1 + "/testimonies")
        .then((response) => {
          console.log(response.data.testimonies)
            this.setState({testimonies: response.data.testimonies})
        })
      }

      galleryItems() {
        return (
          this.state.testimonies.map((item, index) => {
            return <p className="carousel-text">{item.content}</p>
          })
        )
      };
    render() {
        // https://cdn.shopify.com/s/files/1/2689/9614/products/1_13_380x380.png?v=1517427207
        const items = this.galleryItems();
        return (
          <div>
              <Col xsHidden smHidden md={1} className="carousel-text-button" style={{'position':'relative','right':'50px'}}>
                <button onClick={() => this.Carousel._slidePrev()} className="btn btn-tosca large"><i className="fa fa-chevron-left"></i></button>
              </Col>
              <Col md={10}>
                <AliceCarousel
                items={items}
                duration={400}
                autoPlay={true}
                fadeOutAnimation={true}
                autoPlayInterval={2000}
                responsive={this.responsive}
                autoPlayActionDisabled={true}
                dotsDisabled={true}
                buttonsDisabled={true}
                mouseDragEnabled={true}
                ref={ el => this.Carousel = el }
                />
              </Col>
              <Col xsHidden smHidden md={1} className="carousel-text-button" style={{'position':'relative','left':'25px'}}>
                <button onClick={() => this.Carousel._slideNext()} className="btn btn-tosca large"><i className="fa fa-chevron-right"></i></button>
              </Col>
          </div>
        );
    }
};

export default CarouselText