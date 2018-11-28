import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Col } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';

class CarouselClass extends Component {
  state = {best_seller: []}

  componentWillMount() {
    this.getBestSellers()
  }

  getBestSellers() {
    axios.get(API_URL_1 + "/bestsellers")
        .then((response) => {
            this.setState({best_seller: response.data.bestsellers})
        })
  }

    responsive = {
        0: { items: 3 },
        1080: { items: 5 }
      };
      
      galleryItems() {
        return (
          this.state.best_seller.map((item, index) => {
            if (item.premium_id !== null) {
              return <Link to={"/premium?id="+item.premium_id} className="best-holder"><img src={API_URL_1+'/premium/'+item.image+'.jpg'} style={{width:"100%"}}/><div className="best-overlay">{item.name}</div></Link>
            } else {
              return <Link to={"/product?id="+item.id} className="best-holder"><img src={API_URL_1+'/normal/'+item.image+'.jpg'} style={{width:"100%"}}/><div className="best-overlay">{item.name}</div></Link>
            }
          })
        )
      };
    render() {
        const items = this.galleryItems();
        return (
          <div>
            <Col xsHidden smHidden md={1} className="carousel-best-button text-right">
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
            <Col xsHidden smHidden md={1} className="carousel-best-button text-left">
              <button onClick={() => this.Carousel._slideNext()} className="btn btn-tosca large"><i className="fa fa-chevron-right"></i></button>
            </Col>
        </div>

        );
    }
};

export default CarouselClass