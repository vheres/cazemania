import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';

class ShopPage extends Component {
    
    renderFilterMenu() {
        return(
            <section>
                <Row>
                    <p>Product's Code</p>
                    <input type="text" ref="searchCode" class="form-control" id="inputSearchCode" placeholder="Product's Code" />
                    <br/>
                </Row>
                <Row>
                    <p>Brand</p>
                    <select ref="searchBrand" class="form-control">
                        <option value="">Brand</option>
                        //renderBrandOption
                    </select>
                    <br/>
                </Row>
                <Row>
                    <p>Model</p>
                    <select ref="searchModel" class="form-control">
                        <option value="">Model</option>
                        //renderModelOption
                    </select>
                    <br/>
                </Row>
                <Row>
                    <p>Case</p>
                    <select ref="searchCase" class="form-control">
                        <option value="">Case</option>
                        //renderCaseOption
                    </select>
                    <br/>
                </Row>
                <Row>
                    <input type="button" class="btn btn-success" style={{width:100}} value="A P P L Y"/>
                </Row>
            </section>
        );
    }

    renderShopPage() {
        return(
                <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Col md={1}></Col>
                    <Col md={2}>
                        {this.renderFilterMenu()}
                    </Col>
                    <Col md={8}>
                        <Grid fluid>
                            <Row>
                                <Col md={8}>
                                <p className="padding-text">Menampilkan ### produk</p>
                                </Col>
                                <Col md={2}>
                                    <p className="text-right padding-text">Urutkan: </p>
                                </Col>
                                <Col md={2}>
                                    <select ref="urutkan" class="form-control">
                                        <option value="">Paling Sesuai</option>
                                        //renderUrutkan
                                    </select>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                render items
                            </Row>
                        </Grid>        
                    </Col>
                </Grid>
            );
        }

    render() {
        return (
        this.renderShopPage()
        );   
    }
}

export default ShopPage;