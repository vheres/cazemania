import React, { Component } from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import ItemDetail from './ItemDetail';
import PaginationClass from './Pagination';

class PremiumPage extends Component {
    state = { premiumcatalogue: [], pagination: [], pagecount: 0, search_status: [0], active: [0] }

    componentWillMount() {
        if (this.state.pagination.length === 0) {
            this.state.pagination.push(0, 20)
        }
        this.setState({})
        this.getCatalogueList();
    }

    getCatalogueList() {
        axios.get(API_URL_1 + "/premiumcatalogue", {
            params: {
                pagination: this.state.pagination
            }
        })
        .then((response)=>{
            this.setState({ premiumcatalogue: response.data,  pagecount: Math.ceil((response.data.length/20)) })
        })
    }

    onPageClick(page , active) {
        this.state.active.shift();
        this.state.active.push(active);
        this.state.pagination.length = 0;
        this.state.pagination.push(page, 20)
        this.setState({})
        this.getCatalogueList();
    }

    onSearchClick() {
        this.state.pagination.length = 0;
        this.state.pagination.push(0, 20)
        this.state.active.shift();
        this.state.active.push(0);
        this.pushPage();
    }

    async pushPage() {
        if( this.refs.searchCode.value != "" && this.refs.searchName.value != "" ) {
            await (this.props.history.push(`/shop?code=${this.refs.searchCode.value}&name=${this.refs.searchName.value}`));
        }
        else if ( this.refs.searchCode.value != "" && this.refs.searchName.value == "" ) {
            await (this.props.history.push(`/shop?code=${this.refs.searchCode.value}`));
        }
        else if ( this.refs.searchCode.value == "" && this.refs.searchName.value != "" ) {
            await (this.props.history.push(`/shop?name=${this.refs.searchName.value}`));
        }
        else {
            await (this.props.history.push(`/shop`));
        }
        this.getCatalogueList();
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
                        <input type="button" class="btn btn-success" style={{width:100}} value="A P P L Y" onClick={()=>this.onSearchClick()}/>
                    </Col>
                </Row>
            </section>
        );
    }

    renderCatalogue() {
        console.log(this.state.catalogue)
        var arrJSX = this.state.premiumcatalogue.map(item => {
            return (
                <ItemDetail id={item.id} name={item.name} image={item.image} category={'premium'} link={'premium'}/>
            );
        })
        return arrJSX
    }

    renderShopPage() {
        return(
                <Grid fluid className="HomePage-css padding-15p">
                    {/* <Col md={1}></Col> */}
                    <Col md={2}>
                        {/* {this.renderFilterMenu()} */}
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
                            <Row className="text-center">
                            <PaginationClass count={this.state.pagecount} PageClick={(page, active)=>this.onPageClick(page, active)} active={this.state.active[0]}/>
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

export default PremiumPage;