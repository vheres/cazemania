import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Col } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import {API_URL_1} from '../supports/api-url/apiurl'
 
class CarouselBanner extends Component {
    state = { photos: [] }   

    responsive = {
        0: { items: 1 }
      };
      
      galleryItems() {
          var arrJSX = [];
        for (var i = 0; i < 3; i++) {
            arrJSX.push(
                <div>
                    <img src={`${API_URL_1}/banner/banner${i+1}.jpg`} alt="banner" className="homepage-banner"/>
                </div>
            )
        }
        return arrJSX;
      };

      renderCarousel() {
          const items = this.galleryItems();
          return (
            <div>
            <Col xs={12} style={{paddingLeft:'0px',paddingRight:'0px'}}>
              <AliceCarousel
              items={items}
              duration={400}
              autoPlay={true}
              fadeOutAnimation={true}
              autoPlayInterval={5000}
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

    render() {
        return (
            this.renderCarousel()
        );
    }
};

export default CarouselBanner