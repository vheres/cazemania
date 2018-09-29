import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';

class HomePage extends Component {
    render() {
        return(
        <section>
            <Grid fluid>
                <Row>
                    <img src ="https://cdn.shopify.com/s/files/1/2689/9614/files/BANNER_COFFEE_LOVERS.jpg?v=1537540529" alt="banner" className="homepage-banner"></img>
                </Row>
            </Grid>
        </section>
        );
    }
}

export default HomePage;