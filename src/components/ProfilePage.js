import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import CartDetail from './CartDetail';
import {API_URL_1} from '../supports/api-url/apiurl'
import axios from 'axios'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProfilePage extends Component {
    state = {profile: [], edit: 0}

    componentWillMount(){
        this.getUserInfo()
    }

    getUserInfo = () => {
        axios.get(API_URL_1 + "/profile", {
            params: {
                id: this.props.auth.id
            }
        })
        .then((response) => {
            this.setState({profile: response.data.profile[0]})
        })
    }

    onEditClick() {
        this.setState({edit: !this.state.edit})
    }

    onSaveClick() {
        this.setState({edit: !this.state.edit})
    }

    renderProfilePage() {
        if (this.state.edit == 0) {
            return (
                <Grid fluid>
                    <Col mdOffset={2} md={8}>
                        <Row>
                            <Col md={2}>
                                <h3>My Profile</h3>
                            </Col>
                            <Col md={2}>
                                <i class="fa fa-edit" onClick={()=>this.onEditClick()}></i>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <h3>{this.state.profile.firstname} {this.state.profile.lastname}</h3>
                            </Col>
                            <Col md={1}>
                                <span class="label bg-info">{this.state.profile.category}</span>
                            </Col>   
                        </Row>
                        <Row>
                            <Col md={1}  style={{width:"20px"}}>
                                <i className="fa fa-envelope"></i>
                            </Col>
                            <Col md={2}>
                                {this.state.profile.email}
                            </Col> 
                        </Row>
                        <Row>
                            <Col md={1} style={{width:"20px"}}>
                                <i className="fa fa-phone"></i>
                            </Col>
                            <Col md={2}>
                                {this.state.profile.phone}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1} style={{width:"20px"}}>
                                <i className="fa fa-user"></i>
                            </Col>
                            <Col md={2}>
                                {this.state.profile.gender}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1} style={{width:"20px"}}>
                                <i className="fa fa-home"></i>
                            </Col>
                            <Col md={8}>
                                {this.state.profile.address1}<br/>
                                {this.state.profile.address2}<br/>
                                {this.state.profile.kabupaten}, {this.state.profile.city}<br/>
                                {this.state.profile.province}
                            </Col>
                        </Row>
                    </Col>
                </Grid>
            )
        }
        else if (this.state.edit == 1) {
            return (
                <Grid fluid>
                    <Col mdOffset={2} md={8}>
                        <Row>
                            <Col md={2}>
                                <h3>My Profile</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <input type="text" ref="firstname" className="form-control" defaultValue={this.state.profile.firstname}></input>
                                <input type="text" ref="lastname" className="form-control" defaultValue={this.state.profile.lastname}></input>
                            </Col>   
                        </Row>
                        <Row>
                            <Col md={1}  style={{width:"20px"}}>
                                <i className="fa fa-envelope"></i>
                            </Col>
                            <Col md={2}>
                                <input type="text" ref="email" className="form-control" defaultValue={this.state.profile.email}></input>
                            </Col> 
                        </Row>
                        <Row>
                            <Col md={1} style={{width:"20px"}}>
                                <i className="fa fa-phone"></i>
                            </Col>
                            <Col md={2}>
                                <input type="text" ref="phone" className="form-control" defaultValue={this.state.profile.phone}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1} style={{width:"20px"}}>
                                <i className="fa fa-user"></i>
                            </Col>
                            <Col md={2}>
                                <input type="text" ref="gender" className="form-control" defaultValue={this.state.profile.gender}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1} style={{width:"20px"}}>
                                <i className="fa fa-home"></i>
                            </Col>
                            <Col md={8}>
                                <input type="text" ref="address1" className="form-control" defaultValue={this.state.profile.address1}></input>
                                <input type="text" ref="address2" className="form-control" defaultValue={this.state.profile.address2}></input>
                                <input type="text" ref="kabupaten" className="form-control" defaultValue={this.state.profile.kabupaten}></input>
                                <input type="text" ref="city" className="form-control" defaultValue={this.state.profile.city}></input>
                                <input type="text" ref="province" className="form-control" defaultValue={this.state.profile.province}></input>
                            </Col>
                        </Row>
                        <Row>
                            <input type="button" className="btn btn-success" onClick={()=>this.onSaveClick()} value="Save"></input>
                        </Row>
                    </Col>
                </Grid>
            )
        }
        
    }

    render() {
        if(this.props.auth.email != "") {
            return (
            this.renderProfilePage()
            );
        }
        return <Redirect to="/login" />;    
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
  
    return { auth };
  }


  
export default connect(mapStateToProps, {})(ProfilePage);