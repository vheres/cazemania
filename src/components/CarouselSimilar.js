import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Thumbnail } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';

class CarouselSimilar extends Component {
  state = {similar_product: []}

  componentWillMount() {
    this.getSimilarProduct()
  }

  getSimilarProduct() {
    axios.get(`${API_URL_1}/similarproduct?name=${this.props.name}`)
        .then((response) => {
            this.setState({similar_product: response.data})
        })
  }

    responsive = {
        0: { items: 3 },
        1080: { items: 5 }
      };
      
      galleryItems() {
          var images = [];
          this.state.best_seller.map((item, count) => {
            images.push([item.id, item.image, item.name])
          })
        return (
          images.map((item, count) => (
                // <Link to={"/product?id="+item[0]}><Thumbnail src = {API_URL_1+'/'+item[1]+'.jpg'}></Thumbnail></Link>
                <Link to={"/product?id="+item[0]} className="best-holder"><img src={API_URL_1+'/normal/'+item[1]+'.jpg'} style={{width:"100%"}}/><div className="best-overlay">{item[2]}</div></Link>
          ))
        )
      };
    render() {
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

export default CarouselSimilar