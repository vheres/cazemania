import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, Button, FormControl  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import Magnifier from 'react-magnifier';
import CarouselSimilar from './CarouselSimilar';
import CarouselPremium from './CarouselPremium';
import { withRouter } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';

class DetailPagePremium extends Component {
    state={item: [], images: [], brands: [], types: [], premiumselect: 0, modelselect: 0}

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id')
        axios.get(API_URL_1 + "/premium/" + id)
        .then((res)=>{
            this.setState({item:res.data.item, images: res.data.images, types: res.data.types})
        })
        ReactPixel.pageView();
        ReactPixel.track('ViewContent');
    }

    premiumSelectOptions() {
        var arrJSX = [];
        this.state.item.map((item, index) => {
            arrJSX.push(<option value={item.id}>{item.code}</option>)
        })
        return (
            <label className="dropdown-container">
                <select className="dropdown-select" ref="premium_select" onChange={()=>this.setState({premiumselect: this.refs.premium_select.value})}>
                    <option value={0}>SELECT</option>
                    {arrJSX}
                </select>
                <div className="text">Premium Code</div>
            </label>
        )
    }

    modelSelectOptions(){
        var arrJSX = this.state.types.map((item)=>{ return(
            <option value={item.id}>{item.name}</option>)
        })
        return(
            <label className="dropdown-container">
                <select className="dropdown-select" ref="model_select" onChange={()=>this.setState({modelselect: this.refs.model_select.value})}>
                    <option value={0}>SELECT MODEL</option>
                    {arrJSX}
                </select>
                <div className="text">Model</div>
            </label>
        )
    }

    onAddToCart() {
        if (this.props.auth.email !== "") {
            axios.post(API_URL_1 + `/cart`, {
                user_id: this.props.auth.id,
                catalogue_id: this.state.premiumselect,
                brand_id: '1',
                model_id: this.state.modelselect,
                case_type: "premium",
                amount: document.getElementById("quantity").value
            }).then((res) => {
                alert('add to cart successful!')
                ReactPixel.track('AddToCart', {
                    content_category: 'premium',
                    content_name: this.state.item[0].name,
                    currency: 'IDR',
                    value: (100000 * document.getElementById("quantity").value),
                    contents: [
                        {
                            id: this.state.premiumselect,
                            quantity: document.getElementById("quantity").value,
                            item_price: 100000
                        }
                    ],
                    content_type: 'product'
                })
            }).catch((err) => {
                alert(err);
            })
        } else {
            alert('Please Login First')
            this.props.history.push('/login')
        }      
    }

    PlusMinus(action) {
        if (action == "plus") {
            document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) + 1;
        }
        else if (action == "minus") {
            if(document.getElementById("quantity").value > 1) {
                document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) - 1;
            }         
        }
    }

    renderImageMagnifier() {
        if(this.state.images.length === 0) {
            return
        }
        else {
            return <CarouselPremium images={this.state.images}/>
        }
    }

    renderProductDetail() {
        if(this.state.item.length === 0) {
            return
        }
        else {
            return (
                <section>
                    <Row>
                        <Col xsOffset={1} mdOffset={0} md={12}><h3 className="alternate-title">{this.state.item[0].name}</h3></Col>
                    </Row>
                    <Row>
                        <Col xsOffset={1} mdOffset={0} md={12}><h2 className="price-text">Rp 100,000</h2></Col> 
                    </Row>
                </section>
            )
        }
    }

    renderAddToCartButton() {
        if(this.state.premiumselect == 0 || this.state.modelselect == 0) {
            return <input type="button" className="btn-orange-blue disabled" title="Please select Premium Code and Model first" value="Add to Cart" onClick={()=>this.onAddToCart()} style={{width:"100%"}} disabled></input>
        }
        else {
            return (
                <input type="button" className="btn-orange-blue" value="Add to Cart" onClick={()=>this.onAddToCart()} style={{width:"100%"}}/>
            )
            
        }
    }

    renderDetailPage() {
        return(
                <Grid fluid className="HomePage-css padding-15p">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={4}>
                            {this.renderImageMagnifier()}
                        </Col>
                        <Col md={4}>
                                {this.renderProductDetail()}
                            <Row className="m-t-lg">
                                <Col xsOffset={1} mdOffset={0} md={4}>
                                    <Row>
                                        <Col xs={10} md={12}>
                                            {this.premiumSelectOptions()}
                                        </Col>
                                    </Row>     
                                </Col>
                                <Col xsOffset={1} mdOffset={0} md={4}>
                                    <Row>
                                        <Col xs={10} md={12}>
                                            {this.modelSelectOptions()}
                                        </Col>
                                    </Row>   
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Row>
                                        <Col xsOffset={1} mdOffset={0} md={1}>
                                            <br/>
                                            <h4 className="detail-option-text">Quantity</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col xsOffset={1} xs={4} mdOffset={0} md={3}>
                                            <FormGroup>
                                                <InputGroup>
                                                <InputGroup.Button>
                                                    <Button className="btn btn-tosca" onClick={()=>this.PlusMinus("minus")}>-</Button>
                                                </InputGroup.Button>
                                                <FormControl type="text" readOnly id="quantity" ref="quantity" className="form-control text-center" defaultValue="1" style={{background:"white", height:'36px'}}/>
                                                <InputGroup.Button>
                                                    <Button className="btn btn-tosca" onClick={()=>this.PlusMinus("plus")}>+</Button>
                                                </InputGroup.Button>
                                                </InputGroup>
                                            </FormGroup>
                                    </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Row className="m-t-md">
                                        <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                                            {this.renderAddToCartButton()}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            );
        }

    render() {
        return (
        this.renderDetailPage()
        );   
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default withRouter(connect(mapStateToProps, {})(DetailPagePremium));