import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Thumbnail } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
 
class CarouselClass extends Component {
    state = { photos: [] }

    componentWillMount() {
        this.fetchimages();     
    }

    fetchimages() {
        axios.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=4091682583.1677ed0.6b759821481d4bc4b8930e2d9da481f7')
        .then((res) => {
            this.setState({photos: res.data.data})
            console.log(this.state.photos)
        })
    }

    transformToArray() {
        this.image_url = new Array();
        this.image_url.push(new Array());
        this.image_url.push(new Array());
        for (var i = 0; i< this.state.photos.length; i++) {
            this.image_url[0].push(this.state.photos[i].images.standard_resolution.url)
            this.image_url[1].push(this.state.photos[i].link)
        }
        }    

    responsive = {
        0: { items: 3 },
        1080: { items: 5 }
      };
      
      galleryItems() {
          var arrJSX = new Array();
        for (var i = 0; i < this.image_url[0].length; i++) {
            arrJSX.push(<Thumbnail src={this.image_url[0][i]} href={this.image_url[1][i]} target="_blank" ></Thumbnail>);
            // arrJSX.push(<div className="instagram-holder"><Thumbnail src={this.image_url[0][i]} href={this.image_url[1][i]} target="_blank" style={{width:"100%", height:"250px"}}></Thumbnail><div className="instagram-overlay"></div></div>) 
        }
        return arrJSX;
      };

      renderCarousel() {
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

    render() {
        this.transformToArray();
        return (
            this.renderCarousel()
        );
    }
};

export default CarouselClass