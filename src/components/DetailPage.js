import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, Button, FormControl  } from 'react-bootstrap';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import Magnifier from 'react-magnifier';

class DetailPage extends Component {
    state={item: [], brands: [], types: [], typeselect: [""], caseselect: {soft: 0, hard: 0}}

    componentWillMount(){
        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id')
        axios.get(API_URL_1 + "/item/" + id)
        .then((res)=>{
            console.log(res.data)
            this.setState({item:res.data.item[0], brands: res.data.brands, type: res.data.type})
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
            console.log(data[num].brand_id)
            console.log(this.refs.brand_select.value)
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
                    <select ref="case_select" className="form-control" style={{width:"80%"}}>
                        <option value={0}>SELECT CASE</option>
                        <option value="hard" disabled>HARD CASE -- unavailable</option>
                        <option value="soft" disabled>SOFT CASE -- unavailable</option>
                    </select>,
                    <select ref="case_select" className="form-control" style={{width:"80%"}}>
                        <option value={0}>SELECT CASE</option>
                        <option value="hard" disabled>HARD CASE -- unavailable</option>
                        <option value="soft" >SOFT CASE</option>
                    </select>
                ],
                [
                    <select ref="case_select" className="form-control" style={{width:"80%"}}>
                        <option value={0}>SELECT CASE</option>
                        <option value="hard">HARD CASE</option>
                        <option value="soft"  disabled>SOFT CASE -- unavailable</option>
                    </select>,
                    <select ref="case_select" className="form-control" style={{width:"80%"}}>
                        <option value={0}>SELECT CASE</option>
                        <option value="hard">HARD CASE</option>
                        <option value="soft">SOFT CASE</option>
                    </select>
                ]
            ]
        )

    }

    onPlusClick() {
        this.refs.quantity.value += 1;
        console.log(this.refs.quantity.value)
    }

    renderDetailPage() {
        return(
                <Grid fluid className="HomePage-css margin-15 padding-15p">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={3}>
                            <Magnifier src="https://cf.shopee.co.id/file/d5d8b0b37ff26c33d554b48cf24bf7b4" width={"100%"} />
                        </Col>
                        <Col md={4}>
                            <Row>
                                <h3>Flamingo</h3>    
                            </Row>
                            <Row>
                                <h2 className="price-text">Rp50.000 - Rp150.000</h2>    
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Row>
                                        <h4>Brand</h4>
                                    </Row>
                                    <Row>
                                        {this.brandSelectOptions()}
                                    </Row>     
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <h4>Model</h4>
                                    </Row>
                                    <Row>
                                        {this.modelSelectOptions()}
                                    </Row>   
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <h4>Type</h4>
                                    </Row>
                                    <Row>
                                        {this.caseSelectOptions()[this.state.caseselect.hard][this.state.caseselect.soft]}
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={1}>
                                    <Row>
                                        <br/>
                                        <h4>Quantity</h4>
                                    </Row>
                                </Col>
                                <Col md={3}>
                                    <br/>
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
                            <Row>
                                <Col md={3}>
                                    <Row>
                                        <br/>
                                        <input type="button" className="btn btn-success" value="Add to Cart" style={{width:"100%"}}></input>
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