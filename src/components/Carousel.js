import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Thumbnail } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
 
class CarouselClass extends Component {
    responsive = {
        0: { items: 3 },
        1080: { items: 5 }
      };
      
      galleryItems() {
          const images = ["https://cdn.shopify.com/s/files/1/2689/9614/products/1_13_380x380.png?v=1517427207", "https://cdn.shopify.com/s/files/1/2689/9614/products/1_13_380x380.png?v=1517427207", "https://cdn.shopify.com/s/files/1/2689/9614/products/1_13_380x380.png?v=1517427207", "https://cdn.shopify.com/s/files/1/2689/9614/products/1_13_380x380.png?v=1517427207", "https://cdn.shopify.com/s/files/1/2689/9614/products/1_13_380x380.png?v=1517427207"]
        return (
          images.map((item, i) => (
                <Thumbnail src = {item}></Thumbnail>
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

export default CarouselClass