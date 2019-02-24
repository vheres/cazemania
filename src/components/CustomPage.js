import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, Button, FormControl  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import Magnifier from 'react-magnifier';
import { withRouter } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';

class CustomPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            phonemodels: [],
            price: [],
            filteredPhoneModels: [],
            caseselect: {soft: 0, hard: 0},
            selected_price: "",
            selectedBrandId: 0,
            selectedBrand: {},
            selectedPhoneModelId: 0,
            selectedPhoneModel: {},
            selectedCaseType: 0,
            fileName: '',
            fileObj: [],
            fileURL: ''
        }
    }

    componentDidMount(){
        this.getBrands();
        this.getphonemodels();
        this.getPrice();
        // axios.get(API_URL_1 + "/custom")
        // .then((res)=>{
        //     console.log(res.data)
        //     this.setState({brands: res.data.brands, type: res.data.type, price: res.data.price})
        // })
        ReactPixel.pageView();
    }

    getBrands() {
        axios.get(`${API_URL_1}/brand/all`)
        .then((res)=>{
            console.log(res)
            this.setState({brands:res.data.result})
        })
        .catch(err => {
            console.log(err);
        })
    }

    getphonemodels() {
        axios.get(`${API_URL_1}/phonemodel/all`)
        .then(res => {
            console.log(res)
            this.setState({phonemodels:res.data.result})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getPrice(){
        axios.get(`${API_URL_1}/price/all`)
        .then(res => {
            console.log(res.data.result)
            this.setState({price:res.data.result})
        })
        .catch(err => {
            console.log(err)
        })
    }

    
    onBrandSelect(brandId){
        var brand = {}
        this.state.brands.forEach((item, index) => {
            if(item.id === parseInt(brandId)){
                brand = item
            }
        })
        this.setState({ selectedBrand: brand, selectedBrandId: brandId, selectedPhoneModelId: 0, selectedPhoneModel: {}, selectedCaseType: 0, selected_price: "" })
        this.phoneModelFilter(brandId)
    }

    onPhoneModelSelect(phonemodelId){
        var phonemodel = {}
        this.state.filteredPhoneModels.forEach((item, index) => {
            if(item.id === parseInt(phonemodelId)){
                phonemodel = item
            }
        })
        console.log(phonemodel)
        this.setState({selectedPhoneModelId: phonemodelId, selectedPhoneModel: phonemodel, selectedCaseType: 0, selected_price: "" })
    }

    onCaseTypeSelect(caseType) {
        if (caseType === 'hard') {
            this.setState({selected_price: this.state.price[4].price, selectedCaseType: caseType})
        }
        else if (caseType === 'soft') {
            this.setState({selected_price: this.state.price[3].price , selectedCaseType: caseType})
        }
        else if (caseType === 0) {
            this.setState({selected_price: "", selectedCaseType: 0})
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
        console.log(this.state.brands)
        var arrJSX = this.state.brands.map((item)=>{ 
            return(
                <option value={item.id}>{item.name}</option>)
        })
        return(
            <label className="dropdown-container">
                <select className="dropdown-select" ref="brand_select"  value={this.state.selectedBrandId} onChange={()=>this.onBrandSelect(this.refs.brand_select.value)}>
                    <option value={0}>SELECT BRAND</option>
                    {arrJSX}
                </select>
                <div className="text">Brand</div>
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
                <option value={0}>SELECT MODEL</option>
                {arrJSX}
            </select>
            <div className="text">Model</div>
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
                    <option value={0} selected>SELECT CASE</option>
                    {hardOption}
                    {softOption}
                </select>
                <div className="text">Type</div>
            </label>
        )
    }

    onAddToCart() {
        if (this.props.auth.email !== "") {
            var formData = new FormData()
            formData.append('customImage', this.state.fileObj)
            formData.append('phonemodelId', this.state.selectedPhoneModelId)
            formData.append('brand', this.state.selectedBrand.name)
            formData.append('model', this.state.selectedPhoneModel.name)
            formData.append('caseType', this.state.selectedCaseType)
            formData.append('amount', document.getElementById("quantity").value,)
            formData.append('price', parseInt(this.state.selected_price))
            const token = this.props.auth.token
            const headers = {
                headers: 
                {'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'}
            }
            axios.put(`${API_URL_1}/transaction/addtocartcustom`, formData, headers)
            .then((res) => {
                alert('add to cart successful!')
                ReactPixel.track('AddToCart', {
                    content_category: 'custom',
                    content_name: 'custom case',
                    currency: 'IDR',
                    value: (this.state.selected_price * document.getElementById("quantity").value),
                    contents: [
                        {
                            id: 'custom',
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

    uploadCustom = (file) => {
        var url = `${API_URL_1}/upload`
        var formData = new FormData()
        formData.append('file', file)
        var config = {
          headers: 
            {'Content-Type': 'multipart/form-data'}
        }
        return axios.post(url, formData, config)
        .then((res)=>{console.log(res)})
      }

      handleFile() {
          var file = document.getElementById('custom_picture').files[0];
          if (file) {
              this.setState({
                  fileName: file.name,
                  fileObj: file,
                  fileURL: URL.createObjectURL(file)
              })
          }
      }

    
    renderCustomImage() {
        var renderLabel = () => {
            if (this.state.fileName.length === 0) {
                return (
                    <Col xs={12} className="upload_custom">
                        <label for="custom_picture" className='inputlabel inputlabel_icon'><i className="fa fa-picture-o"/><p style={{fontSize: '30px'}}>Upload Picture</p></label>
                    </Col> 
                )
            } else {
                return (
                    <div>
                        <Magnifier zoomFactor={1.1} mgWidth={300} mgHeight={300} src={this.state.fileURL} width={"100%"} />
                        <p className="text-ellipsis" style={{fontSize: '20px'}}><i className="fa fa-check"></i>{this.state.fileName}</p>
                        <label for="custom_picture" className="btn-orange-blue">
                            Upload Gambar Lain
                        </label>
                    </div>
                )
            }
        }
        return (
            <div>
                {renderLabel()}
                <div>
                    <form encType="multipart/form-data">
                    <input type="file" name="filename" id="custom_picture" accept="image/*" className="inputfile" onChange={()=>this.handleFile()}/>
                    </form>
                </div>
            </div>
        )
    }

    // renderCarouselSimilar() {
    //     if(this.state.item.length === 0) {
    //         return
    //     }
    //     else {
    //         return <CarouselSimilar name={this.state.item.name} id={this.state.item.id} SimilarClick={(temp)=>this.onSimilarClick(temp)}/>
    //     }
    // }

    renderProductDetail() {
            if(this.state.selected_price.length === 0) {
                return (
                    <section>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h3 className="alternate-title">Custom Case</h3></Col>
                        </Row>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h2 className="price-text">Rp 60,000 - Rp 85,000</h2></Col> 
                        </Row>
                    </section>
                )
            }
            else {
                return (
                    <section>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h3 className="alternate-title">Custom Case</h3></Col>
                        </Row>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h2 className="price-text">Rp {(this.state.selected_price).toLocaleString()}</h2></Col> 
                        </Row>
                    </section>
                )
            }
        }

    renderAddToCartButton() {
        if(this.state.selectedCaseType === undefined || this.state.selectedCaseType === 0 || this.state.fileName === "") {
            return <input type="button" className="btn-orange-blue disabled" title="Please select Brand, Model and Type First" value="Add to Cart" onClick={()=>this.onAddToCart()} style={{width:"100%"}} disabled></input>
        }
        else {
            return (
                <input type="button" className="btn-orange-blue" value="Add to Cart" onClick={()=>this.onAddToCart()} style={{width:"100%"}}></input>
            )
            
        }
    }

    renderCustomPage() {
        return(
                <Grid fluid className="bg-white padding-15p">
                    <Row>
                        <Col xsOffset={0} xs={12} mdOffset={2} md={3}>
                            {this.renderCustomImage()}
                        </Col>
                        <Col xs={12} md={4}>
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
                                                <FormControl type="text" readOnly id="quantity" ref="quantity" className="form-control text-center" defaultValue="1" style={{background:"white",height:'36px',minWidth:'50px'}}/>
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
                    {/* <Row>
                        <Row>
                            <h3 className="text-center">Similar Products</h3>
                            <div className="block-margin-auto similar-product-pointer"></div>
                        </Row>
                        <Row>
                            <Col mdOffset={2} md={8}>
                                {this.renderCarouselSimilar()}
                            </Col>
                        </Row>
                    </Row>                         */}
                </Grid>
            );
        }

    render() {
        return (
        this.renderCustomPage()
        );   
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default withRouter(connect(mapStateToProps, {})(CustomPage));