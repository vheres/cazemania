import React, { Component } from 'react';
import Instafeed from 'react-instafeed';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const instafeedTarget = 'instafeed';
const myTemplate = `<a href='{{link}}' target='_blank' class='instafeed__item col-md-2'>
                    <img class='instafeed__item__background' src='{{image}}' />
                    <div class='instafeed__item__overlay'>
                        <div class='instafeed__item__overlay--inner'>
                        </div>
                    </div>
                    </a>`

class InstaSlide extends Component {
    render() {              
        return (
            <div id={instafeedTarget}>
                <Instafeed
                limit='10'
                ref='instafeed'
                resolution='thumbnail'
                sortBy='most-recent'
                target={instafeedTarget}
                template={myTemplate}
                userId='551996774'
                clientId='04b21e07b4a04356a35841ee52bf876a'
                accessToken='551996774.1677ed0.98a032dd6bfc49fab8786b3cd1635a15'
                />
            </div>
        )
    }
}

export default InstaSlide;