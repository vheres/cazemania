import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {API_URL_1} from '../supports/api-url/apiurl'
import ReactPixel from 'react-facebook-pixel';

class LinkTree extends Component {
    componentDidMount() {
        ReactPixel.pageView();
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xsOffset={1} xs={10}>
                        <div className="general-title-blue text-center" >
                            Cazemania
                        </div>
                    </Col>
                </Row>
                <Row style={{'marginTop':'7px', 'marginBottom':'7px'}}>
                    <Col xsOffset={1} xs={10}>
                        <input type="button" className="btn-orange-blue" style={{'width':'100%'}} value="Link 1"/>
                    </Col>
                </Row>
                <Row style={{'marginTop':'7px', 'marginBottom':'7px'}}>
                    <Col xsOffset={1} xs={10}>
                        <input type="button" className="btn-blue-orange" style={{'width':'100%'}} value="Link 1"/>
                    </Col>
                </Row>
                <Row style={{'marginTop':'7px', 'marginBottom':'7px'}}>
                    <Col xsOffset={1} xs={10}>
                        <input type="button" className="btn-orange-blue" style={{'width':'100%'}} value="Link 1"/>
                    </Col>
                </Row>
                <Row style={{'marginTop':'7px', 'marginBottom':'7px'}}>
                    <Col xsOffset={1} xs={10}>
                        <input type="button" className="btn-blue-orange" style={{'width':'100%'}} value="Link 1"/>
                    </Col>
                </Row>
                <Row style={{'marginTop':'7px', 'marginBottom':'7px'}}>
                    <Col xsOffset={1} xs={10}>
                        <input type="button" className="btn-orange-blue" style={{'width':'100%'}} value="Link 1"/>
                    </Col>
                </Row>
                <Row style={{'marginTop':'7px', 'marginBottom':'7px'}}>
                    <Col xsOffset={1} xs={10}>
                        <input type="button" className="btn-blue-orange" style={{'width':'100%'}} value="Link 1"/>
                    </Col>
                </Row>
                <Row style={{'marginTop':'7px', 'marginBottom':'7px'}}>
                    <Col xsOffset={1} xs={10}>
                        <input type="button" className="btn-orange-blue" style={{'width':'100%'}} value="Link 1"/>
                    </Col>
                </Row>
                <Row style={{'marginTop':'7px', 'marginBottom':'7px'}}>
                    <Col xsOffset={1} xs={10}>
                        <input type="button" className="btn-blue-orange" style={{'width':'100%'}} value="Link 1"/>
                    </Col>
                </Row>
            </Grid>
        );   
    }
}

export default LinkTree;