import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';

class HomePage extends Component {
    render() {
        return(
        <Grid fluid>
            <Row>
                <h1>This is Homepage</h1>
            </Row>
        </Grid>
        );
    }
}

export default HomePage;