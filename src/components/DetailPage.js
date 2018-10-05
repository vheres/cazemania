import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, Button, FormControl  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import Magnifier from 'react-magnifier';

class DetailPage extends Component {
    state={item: [], brands: [], types: [], typeselect: [""], caseselect: {soft: 0, hard: 0}, price: [], selected_price: "", selected_case: 0}

    componentWillMount(){
        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id')
        console.log(id)
        axios.get(API_URL_1 + "/item/" + id)
        .then((res)=>{
            console.log(res.data)
            this.setState({item:res.data.item[0], brands: res.data.brands, type: res.data.type, price: res.data.price})
        })
    }

    brandSelectOptions(){
        console.log(this.state.brands)
        var arrJSX = this.state.brands.map((item)=>{ 
            return(
                <option value={item.id}>{item.name}</option>)
        })
        return(
            <select ref="brand_select" className="form-control" style={{width:"80%"}} onChange={()=>this.typeFilter()}>
                <option value={0}>SELECT BRAND</option>
                {arrJSX}
            </select>
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
    }
    modelSelectOptions(){
        var arrJSX = this.state.typeselect.map((item)=>{ return(
            <option value={item.id}>{item.name}</option>)
        })
        console.log(this.state.typeselect)
        return(
        <select ref="type_select" className="form-control" style={{width:"80%"}} onChange={()=>this.onModelSelect()}>
            <option value={0}>SELECT MODEL</option>
            {arrJSX}
        </select>
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
    }

    caseSelectOptions(){
        return(
            [
                [
                    <select ref="case_select" className="form-control" onChange={()=>this.onTypeSelect()} style={{width:"80%"}}>
                        <option value={0} selected>SELECT CASE</option>
                        <option value="hard" disabled>HARD CASE -- unavailable</option>
                        <option value="soft" disabled>SOFT CASE -- unavailable</option>
                    </select>,
                    <select ref="case_select" className="form-control" onChange={()=>this.onTypeSelect()} style={{width:"80%"}}>
                        <option value={0}>SELECT CASE</option>
                        <option value={0} disabled>HARD CASE -- unavailable</option>
                        <option value="soft" >SOFT CASE</option>
                    </select>
                ],
                [
                    <select ref="case_select" className="form-control" onChange={()=>this.onTypeSelect()} style={{width:"80%"}}>
                        <option value={0}>SELECT CASE</option>
                        <option value="hard">HARD CASE</option>
                        <option value={0}  disabled>SOFT CASE -- unavailable</option>
                    </select>,
                    <select ref="case_select" className="form-control" onChange={()=>this.onTypeSelect()} style={{width:"80%"}}>
                        <option value={0}>SELECT CASE</option>
                        <option value="hard">HARD CASE</option>
                        <option value="soft">SOFT CASE</option>
                    </select>
                ]
            ]
        )
    }

    onTypeSelect() {
        if (this.refs.case_select.value === 'hard') {
            this.setState({selected_price: this.state.price[1].price, selected_case: this.refs.case_select.value})
        }
        else if (this.refs.case_select.value === 'soft') {
            this.setState({selected_price: this.state.price[0].price , selected_case: this.refs.case_select.value})
        }
        else if (this.refs.case_select.value == 0) {
            this.setState({selected_price: "", selected_case: 0})
        }
    }

    onAddToCart() {

    }

    onPlusClick() {
        this.refs.quantity.value += 1;
        console.log(this.refs.quantity.value)
    }

    renderImageMagnifier() {
        if(this.state.item.length === 0) {
            return
        }
        else {
            return <Magnifier src={this.state.item.image} width={"100%"} />
        }
    }

    renderProductDetail() {
        if(this.state.item.length === 0) {
            return
        }
        else {
            if(this.state.selected_price.length === 0) {
                return (
                    <section>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h3>{this.state.item.code}</h3></Col>  
                        </Row>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h2 className="price-text">Rp 50000 - Rp 75000</h2></Col> 
                        </Row>
                    </section>
                )
            }
            else {
                return (
                    <section>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h3>{this.state.item.code}</h3></Col>  
                        </Row>
                        <Row>
                            <Col xsOffset={1} mdOffset={0} md={12}><h2 className="price-text">Rp {this.state.selected_price}</h2></Col> 
                        </Row>
                    </section>
                )
            }
        }
    }

    renderAddToCartButton() {
        console.log(this.state.selected_case)
        if(this.state.selected_case === undefined || this.state.selected_case === 0) {
            return <input type="button" className="btn btn-success" value="Add to Cart" onClick={()=>this.onAddToCart()} style={{width:"100%"}} disabled></input>
        }
        else {
            return (
                <input type="button" className="btn btn-success" value="Add to Cart" onClick={()=>this.onAddToCart()} style={{width:"100%"}}></input>
            )
            
        }
    }

    renderDetailPage() {
        return(
                <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={3}>
                            {this.renderImageMagnifier()}
                        </Col>
                        <Col md={4}>
                            {this.renderProductDetail()}
                            <Row>
                                <Col xsOffset={1} mdOffset={0} md={4}>
                                    <Row>
                                        <h4><strong>Brand</strong></h4>
                                    </Row>
                                    <Row>
                                        {this.brandSelectOptions()}
                                    </Row>     
                                </Col>
                                <Col xsOffset={1} mdOffset={0} md={4}>
                                    <Row>
                                        <h4><strong>Model</strong></h4>
                                    </Row>
                                    <Row>
                                        {this.modelSelectOptions()}
                                    </Row>   
                                </Col>
                                <Col xsOffset={1} mdOffset={0} md={4}>
                                    <Row>
                                        <h4><strong>Type</strong></h4>
                                    </Row>
                                    <Row>
                                        {this.caseSelectOptions()[this.state.caseselect.hard][this.state.caseselect.soft]}
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Row>
                                    <Col xsOffset={1} mdOffset={0} md={1}>
                                        <br/>
                                        <h4><strong>Quantity</strong></h4>
                                    </Col>
                                </Row>
                                <Row>
                                <Col xsOffset={1} xs={4} mdOffset={0} md={3}>
                                        <FormGroup>
                                            <InputGroup>
                                            <InputGroup.Button>
                                                <Button className="btn btn-danger">-</Button>
                                            </InputGroup.Button>
                                            <FormControl type="text" ref="quantity" className="form-control text-center" defaultValue="1"/>
                                            <InputGroup.Button>
                                                <Button className="btn btn-danger" onClick={()=>this.onPlusClick()}>+</Button>
                                            </InputGroup.Button>
                                            </InputGroup>
                                        </FormGroup>
                                </Col>
                                </Row>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <Row>
                                        <br/>
                                        {this.renderAddToCartButton()}
                                    </Row>
                                    <Row>
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

export default connect(mapStateToProps, {})(DetailPage);