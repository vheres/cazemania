import React, { Component } from 'react';
import { Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import ReactPixel from 'react-facebook-pixel';

class ListPage extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    
        this.state = {
        buttonCSS: ['btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default'],
        data: []
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        ReactPixel.pageView();
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        var tempCSS = this.state.buttonCSS.slice();
        if (this.isInViewport(document.getElementById('brand0'))) {
            tempCSS = ['btn btn-info', 'btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default']
        } else if (this.isInViewport(document.getElementById('brand1'))) {
            tempCSS = ['btn btn-default', 'btn btn-info', 'btn btn-default', 'btn btn-default', 'btn btn-default']
        } else if (this.isInViewport(document.getElementById('brand2'))) {
            tempCSS = ['btn btn-default', 'btn btn-default', 'btn btn-info', 'btn btn-default', 'btn btn-default']
        } else if (this.isInViewport(document.getElementById('brand3'))) {
            tempCSS = ['btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-info', 'btn btn-default']
        } else if (this.isInViewport(document.getElementById('brand4'))) {
            tempCSS = ['btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-info']
        }
        this.setState({buttonCSS: tempCSS})
    }

    isInViewport(elem) {
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    async handleSelect(target) {
        document.getElementById(target).scrollIntoView({behavior: 'smooth', block: 'start'})
    }

    renderList() {
        var arrJSX = [];
        for (var i = 0; i < 10; i++) {
            arrJSX.push(
                <tr id={`brand${i}`}>
                    <th colSpan={3} style={{paddingTop:'5px',paddingBottom:'5px'}}>Brand ABCD</th>
                </tr>
            )
            for (var j = 0; j < 3; j++) {
                arrJSX.push(
                    <tr >
                        <td style={{paddingTop:'1px', paddingBottom:'1px'}}>
                            Model QWER
                        </td>
                        <td>
                            Y
                        </td>
                        <td>
                            N
                        </td>
                    </tr>
                )
            }

        }
        return arrJSX;
    }

    renderListPage() {
        return(
                <Grid fluid className="HomePage-css padding-15p">
                    <Row>
                        <Col xsOffset={1} xs={10}>
                            <Row>
                                <Col mdOffset={1} md={2} xsHidden smHidden className="information-quick-link">
                                    <div className="general-title-blue">
                                        Menu
                                    </div>
                                    <ButtonGroup vertical style={{width:'100%'}}>
                                        <Button onClick={()=>this.handleSelect('brand0')} className={`${this.state.buttonCSS[0]}`}>Brand0</Button>
                                        <Button onClick={()=>this.handleSelect('brand1')} className={`${this.state.buttonCSS[1]}`}>Brand1</Button>
                                        <Button onClick={()=>this.handleSelect('brand2')} className={`${this.state.buttonCSS[2]}`}>Brand2</Button>
                                        <Button onClick={()=>this.handleSelect('brand3')} className={`${this.state.buttonCSS[3]}`}>Brand3</Button>
                                        <Button onClick={()=>this.handleSelect('brand4')} className={`${this.state.buttonCSS[4]}`}>Brand4</Button>
                                    </ButtonGroup>
                                </Col>
                                <Col xsOffset={1} xs={6}>
                                    <div className="general-title-blue">
                                    List Tipe HP
                                    </div>
                                    <div style={{borderBottom:'4px solid #24BECA'}}/>
                                    <table style={{width:'100%'}} className="table-striped">
                                        <thead>
                                            <th>
                                                Model
                                            </th>
                                            <th>
                                                Soft Case
                                            </th>
                                            <th>
                                                Hard Case
                                            </th>
                                        </thead>
                                        <tbody>
                                            {this.renderList()}
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            );
        }

    render() {
        return (
        this.renderListPage()
        );   
    }
}

export default ListPage;