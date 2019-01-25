import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Row, Col } from 'react-bootstrap';
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
            return (
              <div className="carousel-text">
                <div>
                  {item.content}
                </div>
                <div style={{marginTop:'2rem'}}>
                  - {item.name} -
                </div>
              </div>
            )
          })
        )
      };
    render() {
        const items = this.galleryItems();
        return (
          <Row>
              <Col xsHidden smHidden md={1} className="carousel-text-button" style={{position:'relative',right:'50px'}}>
                <button onClick={() => this.Carousel._slidePrev()} className="btn btn-tosca large"><i className="fa fa-chevron-left"></i></button>
              </Col>
              <Col md={10}>
                <AliceCarousel
                items={items}
                duration={500}
                autoPlay={true}
                fadeOutAnimation={false}
                autoPlayInterval={10000}
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
          </Row>
        );
    }
};

export default CarouselText