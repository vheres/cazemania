import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Col } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import ReactPixel from 'react-facebook-pixel';
 
class CarouselClass extends Component {
    state = { photos: [] }

    componentWillMount() {
        this.fetchimages();     
    }

    fetchimages() {
        axios.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=4091682583.1677ed0.6b759821481d4bc4b8930e2d9da481f7')
        .then((res) => {
            this.setState({photos: res.data.data})
            // console.log(this.state.photos)
        })
    }

    transformToArray() {
        this.image_url = [];
        this.image_url.push([]);
        this.image_url.push([]);
        for (var i = 0; i< this.state.photos.length; i++) {
            this.image_url[0].push(this.state.photos[i].images.standard_resolution.url)
            this.image_url[1].push(this.state.photos[i].link)
        }
        }    

    responsive = {
        0: { items: 3 },
        1080: { items: 6 }
      };
      
      galleryItems() {
          var arrJSX = [];
        for (var i = 0; i < this.image_url[0].length; i++) {
            arrJSX.push(<a href={this.image_url[1][i]} onClick={()=>ReactPixel.trackCustom('instagramClick')} className="best-holder" target="_blank" rel="noopener noreferrer"><img src={this.image_url[0][i]} alt="instagram" className="instagram-box"/><div className="best-overlay"><i className="fa fa-instagram"></i></div></a>)
        }
        return arrJSX;
      };

      renderCarousel() {
          const items = this.galleryItems();
          return (
            <div>
            <Col xsHidden smHidden md={1} className="carousel-insta-button text-right">
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
            <Col xsHidden smHidden md={1} className="carousel-insta-button text-left">
              <button onClick={() => this.Carousel._slideNext()} className="btn btn-tosca large"><i className="fa fa-chevron-right"></i></button>
            </Col>
        </div>
          );
      }

    render() {
        this.transformToArray();
        return (
            this.renderCarousel()
        );
    }
};

export default CarouselClass