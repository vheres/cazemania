import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Col } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';

class CarouselSimilar extends Component {
  state = {similar_product: [], index: 0}

  componentWillMount() {
    this.getSimilarProduct()
  }

  componentWillReceiveProps(newProps) {
    axios.get(`${API_URL_1}/catalogue/similarproducts/${newProps.id}`)
        .then((response) => {
          console.log(response)
            this.setState({similar_product: response.data.result})
        }).catch((err) => {
            console.log(err)
        })
  }

  getSimilarProduct() {
    axios.get(`${API_URL_1}/catalogue/similarproducts/${this.props.id}`)
        .then((response) => {
          console.log(response)
            this.setState({similar_product: response.data.result})
        }).catch((err) => {
            console.log(err)
        })
  }

    responsive = {
        0: { items: 3 },
        1080: { items: 3 }
      };


      galleryItems() {
          var images = [];
          this.state.similar_product.forEach((item, count) => {
            images.push([item.id, item.image, item.name])
          })
        return (
          images.map((item, count) => (
                <Link to={`/product?id=${item[0]}`} onClick={()=>{this.props.SimilarClick(`/product?id=${item[0]}`);ReactPixel.trackCustom('similarClick')}} className="best-holder"><img src={API_URL_1+item[1]} style={{width:"100%"}}/><div className="best-overlay">{item[2]}</div></Link>
          ))
        )
      };
    render() {
      const items = this.galleryItems();
      if(this.state.similar_product.length > 3) {   
        return (
          <div>
            <Col xsHidden smHidden md={1} className="carousel-similar-button">
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
              mouseDragEnabled={false}
              ref={ el => this.Carousel = el }
              />
            </Col>
            <Col xsHidden smHidden md={1} className="carousel-similar-button">
              <button onClick={() => this.Carousel._slideNext()} className="btn btn-tosca large"><i className="fa fa-chevron-right"></i></button>
            </Col>
        </div>
        );
      }
      else if (this.state.similar_product.length == 1) {
        return <Col xsOffset={0} xs={12} mdOffset={4} md={4}>{items}</Col>;
      }
      else if (this.state.similar_product.length ==2) {
          var arrJSX=[];
          arrJSX.push(<Col xsOffset={0} xs={12} mdOffset={2} md={4}>{items[0]}</Col>)
          arrJSX.push(<Col xs={12} md={4}>{items[1]}</Col>)
        return arrJSX;
      }
      else {
        return items;
      }
        
    }
};

export default CarouselSimilar