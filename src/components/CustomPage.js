import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, Button, FormControl  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import Magnifier from 'react-magnifier';
import CarouselSimilar from './CarouselSimilar';
import { withRouter } from 'react-router-dom';
import FileUploader from './FileUploader';

class CustomPage extends Component {
    state={picture: '', brands: [], types: [], typeselect: [""], caseselect: {soft: 0, hard: 0}, price: [], selected_price: "", inputfile: []}

    componentWillMount(){
        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id')
        axios.get(API_URL_1 + "/custom")
        .then((res)=>{
            console.log(res.data)
            this.setState({brands: res.data.brands, type: res.data.type, price: res.data.price})
        })
    }

    brandSelectOptions(){
        console.log(this.state.brands)
        var arrJSX = this.state.brands.map((item)=>{ 
            return(
                <option value={item.id}>{item.name}</option>)
        })
        return(
            <label className="dropdown-container">
                <select className="dropdown-select" ref="brand_select"  onChange={()=>this.typeFilter()}>
                    <option value={0}>SELECT BRAND</option>
                    {arrJSX}
                </select>
                <div className="text">Brand</div>
            </label>
        )
    }

    typeFilter(){
        var data = this.state.type
        console.log(data)
        var tempArr = new Array
        for(var num in data){
            if(data[num].brand_id === parseInt(this.refs.brand_select.value)){
                tempArr.push(data[num])
            }
        }
        this.setState({typeselect: tempArr})   
        document.getElementById("model_select").selectedIndex = "0";  
        document.getElementById("case_select").selectedIndex = "0";
        this.state.selected_case = 0; 
        this.state.selected_price = ""
    }

    modelSelectOptions(){
        var arrJSX = this.state.typeselect.map((item)=>{ return(
            <option value={item.id}>{item.name}</option>)
        })
        console.log(this.state.typeselect)
        return(
            <label className="dropdown-container">
                <select className="dropdown-select" id="model_select" ref="type_select"  onChange={()=>this.onModelSelect()}>
                    <option value={0}>SELECT MODEL</option>
                    {arrJSX}
                </select>
                <div className="text">Model</div>
            </label>
        )
    }

    onModelSelect(){
        var data = this.state.type
        var tempVar = {soft: 0, hard: 0}
        for(var num in data){
            if(data[num].id === parseInt(this.refs.type_select.value)){
                tempVar = data[num]
            }
        }
        this.setState({caseselect: tempVar})
        document.getElementById("case_select").selectedIndex = "0";
        this.state.selected_case = 0;
        this.state.selected_price = ""
    }

    caseSelectOptions(){
        return(
            [
                [
                    <label className="dropdown-container">
                        <select className="dropdown-select" id="case_select" ref="case_select" onChange={()=>this.onTypeSelect()}>
                            <option value={0} selected>SELECT CASE</option>
                            <option value="customhard" disabled>HARD CASE -- unavailable</option>
                            <option value="customsoft" disabled>SOFT CASE -- unavailable</option>
                        </select>
                        <div className="text">Type</div>
                    </label>,
                    <label className="dropdown-container">
                        <select className="dropdown-select" id="case_select" ref="case_select" onChange={()=>this.onTypeSelect()}>
                            <option value={0}>SELECT CASE</option>
                            <option value="customhard" disabled>HARD CASE -- unavailable</option>
                            <option value="customsoft" >SOFT CASE</option>
                        </select>
                        <div className="text">Type</div>
                    </label>
                ],
                [
                    <label className="dropdown-container">
                        <select className="dropdown-select" id="case_select" ref="case_select" onChange={()=>this.onTypeSelect()}>
                            <option value={0}>SELECT CASE</option>
                            <option value="customhard">HARD CASE</option>
                            <option value="customsoft"  disabled>SOFT CASE -- unavailable</option>
                        </select>
                        <div className="text">Type</div>
                    </label>,
                    <label className="dropdown-container">
                        <select className="dropdown-select" id="case_select" ref="case_select" onChange={()=>this.onTypeSelect()}>
                            <option value={0}>SELECT CASE</option>
                            <option value="customhard">HARD CASE</option>
                            <option value="customsoft">SOFT CASE</option>
                        </select>
                        <div className="text">Type</div>
                    </label>
                ]
            ]
        )
    }

    onTypeSelect() {
        console.log(this.state.inputfile);
        if (this.refs.case_select.value === 'customhard') {
            this.setState({selected_price: this.state.price[1].price, selected_case: this.refs.case_select.value})
        }
        else if (this.refs.case_select.value === 'customsoft') {
            this.setState({selected_price: this.state.price[0].price , selected_case: this.refs.case_select.value})
        }
        else if (this.refs.case_select.value == 0) {
            this.setState({selected_price: "", selected_case: 0})
        }
    }

    onAddToCart() {
        var formData = new FormData()
        var data =  {
            user_id: this.props.auth.id,
            brand_id: this.refs.brand_select.value,
            model_id: this.refs.type_select.value,
            case_type: this.refs.case_select.value,
            amount: document.getElementById("quantity").value
        }
        formData.append('file', this.state.inputfile)
        formData.append('data', JSON.stringify(data))
        var config = {
            headers: 
              {'Content-Type': 'multipart/form-data'}
          }
        axios.post(API_URL_1 + `/custom_cart`, formData, config).then((res) => {
            alert('add to cart successful!')
        }).catch((err) => {
            alert(err);
        })
    }

    // async onSimilarClick(target) {
    //     await this.props.history.push(target)
    //     const params = new URLSearchParams(this.props.location.search);
    //     const id = params.get('id')
    //     console.log(id);
    //     axios.get(API_URL_1 + "/item/" + id)
    //     .then((res)=>{
    //         console.log(res.data)
    //         this.setState({item:res.data.item[0], brands: res.data.brands, type: res.data.type, price: res.data.price})
    //     })
    // }

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

    
    renderCustomImage() {
        if(this.state.picture === "") {
            if (this.state.inputfile.length == 0) {
                return (
                    <Col xs={12} className="upload_custom">
                    <label for="custom_picture" className='inputlabel inputlabel_icon'><i className="fa fa-picture-o"/><p style={{'font-size': '30px'}}>Upload Picture</p></label>
                        <div>
                            <form encType="multipart/form-data">
                            <input type="file" name="filename" id="custom_picture" accept="image/*" className="inputfile" onChange={()=>this.setState({inputfile: document.getElementById('custom_picture').files[0]})}/>
                            </form>
                        </div>
                    </Col> 
                )
            } else {
                return (
                    <Col xs={12} className="upload_custom">
                    <label for="custom_picture" className='inputlabel inputlabel_icon'><i className="fa fa-picture-o"/><p style={{'font-size': '30px'}}>Upload Picture</p></label><p className="text-ellipsis" style={{'font-size': '20px'}}><i className="fa fa-check"></i>{this.state.inputfile.name}</p>
                        <div>
                            <form encType="multipart/form-data">
                            <input type="file" name="filename" id="custom_picture" accept="image/*" className="inputfile" onChange={()=>this.setState({inputfile: document.getElementById('custom_picture').files[0]})}/>
                            </form>
                        </div>
                    </Col> 
                )
            }
            
        }
        else {
            return <Magnifier src={this.state.picture+'.jpg'} width={"100%"} />
        }
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
                            <Col xsOffset={1} mdOffset={0} md={12}><h3 className="detail-title-text">Custom Case</h3></Col>
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
                            <Col xsOffset={1} mdOffset={0} md={12}><h3 className="detail-title-text">Custom Case</h3></Col>
                        </Row>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h2 className="price-text">Rp {(this.state.selected_price + 10000).toLocaleString()}</h2></Col> 
                        </Row>
                    </section>
                )
            }
        }

    renderAddToCartButton() {
        if(this.state.selected_case === undefined || this.state.selected_case === 0 || this.state.namafile === "") {
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
                                            {this.caseSelectOptions()[this.state.caseselect.hard][this.state.caseselect.soft]}
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
                                                <FormControl type="text" readOnly id="quantity" ref="quantity" className="form-control text-center" defaultValue="1" style={{background:"white",height:'36px'}}/>
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