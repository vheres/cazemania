import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import ItemDetail from './ItemDetail';

class ShopPage extends Component {
    state = { catalogue: [] }

    componentWillMount() {
        this.getCatalogueList();
    }

    getCatalogueList() {
        axios.get(API_URL_1 + "/catalogue")
        .then((response)=>{
            this.setState({ catalogue: response.data.catalogue})
        })
    }

    onItemClick(id) {
        this.props.history.push(`/product?id=${id}`)
    }

    renderFilterMenu() {
        return(
            <section>
                <Row>
                    <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                        <p>Product's Code</p>
                        <input type="text" ref="searchCode" class="form-control" id="inputSearchCode" placeholder="Product's Code" />
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                        <p>Product's Name</p>
                        <input type="text" ref="searchName" class="form-control" id="inputSearchName" placeholder="Product's Name" />
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={1} xs={10} mdOffset={0}>
                        <input type="button" class="btn btn-success" style={{width:100}} value="A P P L Y"/>
                    </Col>
                </Row>
            </section>
        );
    }

    renderCatalogue() {
        console.log(this.state.catalogue)
        var arrJSX = this.state.catalogue.map(item => {
            return (
                <ItemDetail id={item.id} name={item.name} image={item.image} sales={item.sales} ItemClick={(id)=>this.onItemClick(id)}/>
            );
        })
        return arrJSX
    }

    renderShopPage() {
        return(
                <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Col md={1}></Col>
                    <Col md={2}>
                        {this.renderFilterMenu()}
                    </Col>
                    <Col md={8}>
                            <Row>
                                <Col xsHidden md={12}>
                                    <p className="padding-text">Menampilkan ### produk</p>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                {this.renderCatalogue()}
                            </Row>      
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