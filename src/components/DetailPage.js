import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, Button, FormControl  } from 'react-bootstrap';
import axios from 'axios'
import { API_URL_1 } from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import Magnifier from 'react-magnifier';
import CarouselSimilar from './CarouselSimilar';
import { withRouter } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [], 
            brands: [], 
            phonemodels: [], 
            softPrice: 0,
            hardPrice: 0,
            filteredPhoneModels: [], 
            caseselect: {soft: 0, hard: 0}, 
            selected_price: 0,
            selectedBrandId: 0,
            selectedBrand: {},
            selectedPhoneModelId: 0,
            selectedPhoneModel: {},
            selectedCaseType: 0
        };
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id')
        this.getProduct(id);
        this.getBrands();
        this.getphonemodels();
        this.getPrice()
        ReactPixel.pageView();
        ReactPixel.track('ViewContent');
    }

    getProduct(id) {
        axios.get(`${API_URL_1}/catalogue/getproduct/${id}`)
        .then((res)=>{
            // console.log(res)
            this.setState({item:res.data.result})
        })
        .catch(err => {
            // console.log(err)
        })
    }

    getBrands() {
        axios.get(`${API_URL_1}/brand/all`)
        .then((res)=>{
            // console.log(res)
            this.setState({brands:res.data.result})
        })
        .catch(err => {
            // console.log(err)
        })
    }

    getphonemodels() {
        axios.get(`${API_URL_1}/phonemodel/all`)
        .then(res => {
            // console.log(res)
            this.setState({phonemodels:res.data.result})
        })
        .catch(err => {
            // console.log(err)
        })
    }

    getPrice(){
        axios.get(`${API_URL_1}/price/all`)
        .then(res => {
            if (this.props.auth.category === 'customer') {
                this.setState({softPrice: res.data.result[0].price, hardPrice: res.data.result[1].price})
            } else if (this.props.auth.category === 'reseller') {
                this.setState({softPrice: res.data.result[0].resellerPrice, hardPrice: res.data.result[1].resellerPrice})
            } else {
                this.setState({softPrice: res.data.result[0].price, hardPrice: res.data.result[1].price})
            }
        })
        .catch(err => {
            // console.log(err)
        })
    }

    onBrandSelect(brandId){
        var brand = {}
        this.state.brands.forEach((item, index) => {
            if(item.id === parseInt(brandId)){
                brand = item
            }
        })
        this.setState({ selectedBrand: brand, selectedBrandId: brandId, selectedPhoneModelId: 0, selectedPhoneModel: {}, selectedCaseType: 0, selected_price: 0 })
        this.phoneModelFilter(brandId)
    }

    onPhoneModelSelect(phonemodelId){
        var phonemodel = {}
        this.state.filteredPhoneModels.forEach((item, index) => {
            if(item.id === parseInt(phonemodelId)){
                phonemodel = item
            }
        })
        this.setState({selectedPhoneModelId: phonemodelId, selectedPhoneModel: phonemodel, selectedCaseType: 0, selected_price: 0 })
    }

    onCaseTypeSelect(caseType) {
        if (caseType === 'hard') {
            this.setState({selected_price: this.state.hardPrice, selectedCaseType: caseType})
        }
        else if (caseType === 'soft') {
            this.setState({selected_price: this.state.softPrice , selectedCaseType: caseType})
        }
        else {
            this.setState({selected_price: 0, selectedCaseType: 0})
        }
    }

    phoneModelFilter(brandId){
        const { phonemodels } = this.state
        var tempArr = []
        
        phonemodels.forEach((item, map) => {
            if(item.brandId === parseInt(brandId)){
                tempArr.push(item)
            }
        })

        this.setState({filteredPhoneModels: tempArr})   
    }
 
    brandSelectOptions(){
        var arrJSX = this.state.brands.map((item)=>{ 
            return(
                <option value={item.id}>{item.name}</option>)
        })
        return(
            <label className="dropdown-container">
                <select className="dropdown-select" ref="brand_select"  value={this.state.selectedBrandId} onChange={()=>this.onBrandSelect(this.refs.brand_select.value)}>
                    <option value={0}>Merek HP</option>
                    {arrJSX}
                </select>
                <div className="text">Merek HP</div>
            </label>
        )
    }

    modelSelectOptions(){
        var arrJSX = this.state.filteredPhoneModels.map((item, index) => { 
            return(
                <option value={item.id}>{item.name}</option>
            )
        })
        return(
        <label className="dropdown-container">
            <select className="dropdown-select" id="phonemodel_select" ref="phonemodel_select" value={this.state.selectedPhoneModelId} onChange={()=>this.onPhoneModelSelect(this.refs.phonemodel_select.value)}>
                <option value={0}>Tipe HP</option>
                {arrJSX}
            </select>
            <div className="text">Tipe HP</div>
        </label>
        )
    }

    caseSelectOptions(){
        var { selectedPhoneModel } = this.state
        var hardOption = ""
        var softOption = ""

        if(selectedPhoneModel.hard){
            hardOption = <option value="hard">HARD CASE</option>
        }
        else{
            hardOption = <option value="hard" disabled>HARD CASE -- unavailable</option>
        }

        if(selectedPhoneModel.soft){
            softOption = <option value="soft">SOFT CASE</option>
        }
        else{
            softOption = <option value="soft" disabled>SOFT CASE -- unavailable</option>
        }

        return(
            <label className="dropdown-container">
                <select className="dropdown-select" id="case_select" ref="case_select" value={this.state.selectedCaseType} onChange={()=>this.onCaseTypeSelect(this.refs.case_select.value)}>
                    <option value={0} selected>Jenis Case</option>
                    {hardOption}
                    {softOption}
                </select>
                <div className="text">Jenis Case</div>
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
                catalogueId: this.state.item.id,
                phonemodelId: this.state.selectedPhoneModelId,
                brand: this.state.selectedBrand.name,
                model: this.state.selectedPhoneModel.name,
                caseType: this.state.selectedCaseType,
                amount: document.getElementById("quantity").value,
                price: parseInt(this.state.selected_price, 10)
            }, headers).then((res) => {
                alert('add to cart successful!')
                ReactPixel.track('AddToCart', {
                    content_category: 'standard',
                    content_name: this.state.item.name,
                    currency: 'IDR',
                    value: (this.state.selected_price * document.getElementById("quantity").value),
                    contents: [
                        {
                            id: this.state.item.id,
                            quantity: document.getElementById("quantity").value,
                            item_price: this.state.selected_price
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

    async onSimilarClick(target) {
        await this.props.history.push(target)
        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id')
        axios.get(`${API_URL_1}/catalogue/getproduct/${id}`)
        .then((res)=>{
            this.setState({item:res.data.result})
        })
    }

    PlusMinus(action) {
        if (action === "plus") {
            document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) + 1;
        }
        else if (action === "minus") {
            if(document.getElementById("quantity").value > 1) {
                document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) - 1;
            }         
        }
    }

    renderImageMagnifier() {
        if(this.state.item.length === 0) {
            return
        }
        else {
            return <Magnifier zoomFactor={1.1} mgWidth={300} mgHeight={300} src={API_URL_1+this.state.item.image} width={"100%"} />
        }
    }

    renderCarouselSimilar() {
        if(this.state.item.length === 0) {
            return
        }
        else {
            return <CarouselSimilar name={this.state.item.name} id={this.state.item.id} SimilarClick={(temp)=>this.onSimilarClick(temp)}/>
        }
    }

    renderProductDetail() {
        if(this.state.item.length === 0) {
            return
        }
        else {
            if(parseInt(this.state.selected_price, 10) === 0) {
                return (
                    <section>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h3 className="alternate-title">{this.state.item.name} | {this.state.item.code}</h3></Col>
                        </Row>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h2 className="price-text">Rp {this.state.softPrice.toLocaleString()} - Rp {this.state.hardPrice.toLocaleString()}</h2></Col> 
                        </Row>
                    </section>
                )
            }
            else {
                return (
                    <section>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h3 className="alternate-title">{this.state.item.name} | {this.state.item.code}</h3></Col>
                        </Row>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h2 className="price-text">Rp {this.state.selected_price.toLocaleString()}</h2></Col> 
                        </Row>
                    </section>
                )
            }
        }
    }

    renderAddToCartButton() {
        if(this.state.selectedCaseType === undefined || this.state.selectedCaseType === 0) {
            return <input type="button" className="btn-orange-blue disabled" title="Please select Brand, Model and Type First" value="Masukkan ke Keranjang Belanja" onClick={()=>this.onAddToCart()} style={{width:"100%"}} disabled></input>
        }
        else {
            return (
                <input type="button" className="btn-orange-blue" value="Masukkan ke Keranjang Belanja" onClick={()=>this.onAddToCart()} style={{width:"100%"}}></input>
            )
            
        }
    }

    renderDetailPage() {
        return(
                <Grid fluid className="HomePage-css padding-15p">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={3}>
                            {this.renderImageMagnifier()}
                        </Col>
                        <Col md={4}>
                                {this.renderProductDetail()}
                            <Row className="m-t-lg">
                                <Col xsOffset={1} mdOffset={0} md={4}>
                                    <Row>
                                        <Col xs={10} md={12}>
                                            {this.brandSelectOptions()}
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
                                <Col xsOffset={1} mdOffset={0} md={4}>
                                    <Row>
                                        <Col xs={10} md={12}>
                                            {this.caseSelectOptions()}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Row>
                                        <Col xsOffset={1} mdOffset={0} md={1}>
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
                                                <FormControl type="text" readOnly id="quantity" ref="quantity" className="text-center" defaultValue="1" style={{background:"white", height:'36px',minWidth:'50px'}}/>
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
                                <Col xs={12}>
                                    <Row className="m-t-md">
                                        <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                                            {this.renderAddToCartButton()}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <h3 className="text-center">Similar Products</h3>
                            <div className="block-margin-auto similar-product-pointer"></div>
                        </Row>
                        <Row>
                            <Col xsOffset={0} xs={12} mdOffset={2} md={8}>
                                {this.renderCarouselSimilar()}
                            </Col>
                        </Row>
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

export default withRouter(connect(mapStateToProps, {})(DetailPage));