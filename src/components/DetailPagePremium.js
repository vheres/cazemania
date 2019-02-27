import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, Button, FormControl  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import CarouselPremium from './CarouselPremium';
import { withRouter } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';

class DetailPagePremium extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            price: 0,
            images: [],
            models: [],
            selectedStock: 0,
            premiumselect: 0,
            modelselectId: 0,
            modelselectName: '',
            quantity: 1
        }
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id')
        this.getPremiumDetails(id)
        this.getPrice()
        ReactPixel.pageView();
        ReactPixel.track('ViewContent');
    }

    getPremiumDetails(id) {
        axios.get(`${API_URL_1}/catalogue/premiumdetails/${id}`)
        .then((res)=>{
            this.setState({item:res.data.result})
        })
    }

    getPrice(){
        axios.get(`${API_URL_1}/price/all`)
        .then(res => {
            if (this.props.auth.category === 'customer') {
                this.setState({price: res.data.result[2].price})
            } else if (this.props.auth.category === 'reseller') {
                this.setState({price: res.data.result[2].resellerPrice})
            } else {
                this.setState({price: res.data.result[2].price})
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    premiumSelectOptions() {
        var handlePremiumSelect = () => {
            var model = [];
            this.state.item.catalogues.forEach((item, index) => {
                if (parseInt(item.id, 10) === parseInt(this.refs.premium_select.value, 10)) {
                    model = item.phonemodels;
                }
            })
            this.setState({premiumselect: this.refs.premium_select.value, models: model, modelselectId: 0, modelselectName: '', selectedStock: 0})
        }
        var arrJSX = [];
        this.state.item.catalogues.forEach((item, index) => {
            arrJSX.push(<option value={item.id}>{item.code}</option>)
        })
        return (
            <label className="dropdown-container">
                <select className="dropdown-select" ref="premium_select" onChange={()=>handlePremiumSelect()}>
                    <option value={0}>SELECT</option>
                    {arrJSX}
                </select>
                <div className="text">Premium Code</div>
            </label>
        )
    }

    modelSelectOptions(){
        var handleModelSelect = () => {
            var stock = 0;
            var modelName = '';
            this.state.models.forEach((item, index) => {
                if (parseInt(item.id) === parseInt(this.refs.model_select.value)) {
                    stock = item.premiumModel.stock
                    modelName = item.name
                }
            })
            this.setState({modelselectId: this.refs.model_select.value, modelselectName: modelName, selectedStock: stock})
        }
        var arrJSX = [];
        this.state.models.forEach((item, index) => {
            arrJSX.push(<option value={item.id}>{item.name}</option>)
        })
        return(
            <label className="dropdown-container">
                <select className="dropdown-select" ref="model_select" onChange={()=>handleModelSelect()}>
                    <option value={0}>SELECT MODEL</option>
                    {arrJSX}
                </select>
                <div className="text">Model</div>
            </label>
        )
    }

    onAddToCart() {
        if (this.props.auth.email !== "") {
            const token = this.props.auth.token
            const headers = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                }
            };
        axios.put(API_URL_1 + `/transaction/addtocart`, {
            catalogueId: this.state.premiumselect,
            phonemodelId: this.state.modelselectId,
            brand: 'IPHONE',
            model: this.state.modelselectName,
            caseType: 'premium',
            amount: document.getElementById("quantity").value,
            price: parseInt(this.state.price)
        }, headers).then((res) => {
            alert('add to cart successful!')
            ReactPixel.track('AddToCart', {
                content_category: 'premium',
                content_name: this.state.item.name,
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
        if (action === "plus") {
            // document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) + 1;
            this.setState({quantity:this.state.quantity+1})
        }
        else if (action === "minus") {
            if(document.getElementById("quantity").value > 1) {
                // document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) - 1;
                this.setState({quantity:this.state.quantity-1})
            }         
        }
    }

    renderImageMagnifier() {
        return <CarouselPremium item={this.state.item}/>
    }

    renderProductDetail() {
        if(this.state.item.length === 0) {
            return
        }
        else {
            return (
                <section>
                    <Row>
                        <Col xsOffset={1} mdOffset={0} md={12}><h3 className="alternate-title">{this.state.item.name}</h3></Col>
                    </Row>
                    <Row>
                        <Col xsOffset={1} mdOffset={0} md={12}><h2 className="price-text">Rp {this.state.price.toLocaleString()}</h2></Col> 
                    </Row>
                </section>
            )
        }
    }

    renderAddToCartButton() {
        if(this.state.premiumselect === 0 || this.state.modelselectId === 0 || this.state.quantity > this.state.selectedStock) {
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
                        <Col xs={0} md={2}></Col>
                        <Col xs={12} md={4}>
                            {this.renderImageMagnifier()}
                        </Col>
                        <Col xs={12} md={4}>
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
                                            <h4 className="detail-option-text">Available Stock</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xsOffset={1} xs={4} mdOffset={0} md={3}>
                                            <div className="general-title-blue">{this.state.modelselectId===0?'-':this.state.selectedStock}</div>
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
                                                <FormControl type="text" readOnly id="quantity" ref="quantity" className="form-control text-center" defaultValue="1" value={this.state.quantity} style={{background:"white", height:'36px',minWidth:'50px'}}/>
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
        if (this.state.item.name !== undefined) {
            return (
                this.renderDetailPage()
            ); 
        } else {
            return (<div>Acquiring Page</div>)
        }
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default withRouter(connect(mapStateToProps, {})(DetailPagePremium));