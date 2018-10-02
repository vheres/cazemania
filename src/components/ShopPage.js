import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

class ShopPage extends Component {
    state = { catalogue: [] }

    componentWillMount() {
        this.getCatalogueList();
    }

    getCatalogueList() {
        axios.get(API_URL_1 + "/catalogue")
        .then((response)=>{
            this.setState({ catalogue: response.data})
            console.log(this.state.catalogue)
        })
    }

    renderFilterMenu() {
        return(
            <section>
                <Row>
                    <p>Product's Code</p>
                    <input type="text" ref="searchCode" class="form-control" id="inputSearchCode" placeholder="Product's Code" />
                    <br/>
                </Row>
                <Row>
                    <p>Product's Name</p>
                    <input type="text" ref="searchName" class="form-control" id="inputSearchName" placeholder="Product's Name" />
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