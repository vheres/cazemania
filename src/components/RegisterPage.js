import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { onRegister } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


const cookies = new Cookies();

class RegisterPage extends Component {
    componentWillReceiveProps(newProps) {
        if(newProps.auth.email !== "") {
            cookies.set('myCookie', newProps.auth.email, { path: '/' })
        }
    }

    onKeyPress(x) {
        if (x.which == 13 ) {
            this.onRegisterClick();
        }
    }

    onRegisterClick = () => {
        if(this.refs.firstName.value == '' || this.refs.lastName.value == '' || this.refs.email.value == '' || this.refs.password.value == '' || this.refs.address.value == '') {
            alert('Please fill everything!');
        }
        else {
            this.props.onRegister({
                firstname: this.refs.firstName.value,
                lastname: this.refs.lastName.value,
                email: this.refs.email.value,
                password: this.refs.password.value,
                address: this.refs.address.value
            });
        }
        
    }


    render() {
        console.log(this.props.auth)
        if(this.props.auth.email === "") {
            return(
                    <Grid fluid className="margin-15p margin-bot-15">
                        <Row>
                            <img src="https://www.dtn.com.vn/skin/frontend/dtn_website/default/images/banner-package1.jpg" alt="banner" style={{width:"100%"}}/>
                        </Row>
                        <Row className="margin-top-15">
                            <Col mdOffset={2} md={8}>
                            <Row>             
                                <span>Already has an account? </span><span><Link to="/login">Login here</Link></span>
                                <h1>Create Account</h1> 
                            </Row>
                            <Row className="margin-top-15">
                                <Col xs={10}>
                                        <form id="Login">
                                            <Row>
                                                <Col xs={2}>
                                                <p className="text-right">Name:</p> 
                                                </Col>
                                                <Col xs={5}>
                                                    <input type="text" ref="firstName" class="form-control" id="inputUsername" placeholder="First Name" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                                </Col>
                                                <Col xs={5}>
                                                    <input type="text" ref="lastName" class="form-control" id="inputUsername" placeholder="Last Name" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2}>
                                                <p className="text-right">Email:</p> 
                                                </Col>
                                                <Col xs={10}>
                                                    <input type="email" ref="email" class="form-control" id="inputEmail" placeholder="Email Address" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2}>
                                                <p className="text-right">Password:</p>  
                                                </Col>
                                                <Col xs={10}>
                                                    <input type="password" ref="password" class="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2}>
                                                <p className="text-right">Address:</p>  
                                                </Col>
                                                <Col xs={10}>
                                                    <textarea type="text" ref="address" class="form-control" id="inputAdress" placeholder="Address" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <input type="button" class="btn btn-primary login-button" value="Register" onClick={this.onRegisterClick}/>
                                            </Row>                              
                                        </form>
                                    </Col>
                                </Row> 
                            </Col>
                        </Row>
                    </Grid>
            );
        }
        return <Redirect to="/" />; 
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, { onRegister })(RegisterPage);