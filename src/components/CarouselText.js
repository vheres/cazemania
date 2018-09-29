import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
 
class CarouselText extends Component {
    responsive = {
        0: { items: 1 }
      };
      
      galleryItems() {
          const images = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]
        return (
          images.map((item, i) => (
                <p className="carousel-text">{item}</p>
          ))
        )
      };
    render() {
        // https://cdn.shopify.com/s/files/1/2689/9614/products/1_13_380x380.png?v=1517427207
        const items = this.galleryItems();
        return (
                    <AliceCarousel
                    items={items}
                    duration={400}
                    autoPlay={true}
                    startIndex = {1}
                    fadeOutAnimation={true}
                    autoPlayInterval={2000}
                    responsive={this.responsive}
                    autoPlayActionDisabled={true}
                    dotsDisabled={true}
                    buttonsDisabled={true}
                    mouseDragEnabled={true}
                  />

        );
    }
};

export default CarouselText