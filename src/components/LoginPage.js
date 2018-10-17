import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { onLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class LoginPage extends Component {
    componentWillReceiveProps(newProps) {
        if(newProps.auth.email !== "") {
            cookies.set('myCookie', newProps.auth.email, { path: '/' });
        }
    }

    onKeyPress(x) {
        if (x.which == 13) {
            this.onLoginClick()
        }
    }

    onLoginClick = () => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        this.props.onLogin({ email, password });
    }


    render() {
        console.log(this.props.auth)
        if(this.props.auth.email == "") {
            return(
                <div>
                    <Grid fluid className="margin-15p margin-bot-15">
                        <Row>
                            <img src="https://www.dtn.com.vn/skin/frontend/dtn_website/default/images/banner-package1.jpg" alt="banner" style={{width:"100%"}}/>
                        </Row>
                        <Row className="margin-top-15">
                            <Col mdOffset={2} md={9}>
                            <form id="Login" className="login-form">
                                <Row>
                                    <Col xs={3} className="text-right register-form-text">
                                    Email: 
                                    </Col>
                                    <Col xs={6}>
                                        <input type="email" ref="email" class="form-control" id="inputEmail" placeholder="Email Address" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} className="text-right register-form-text">
                                    Password: 
                                    </Col>
                                    <Col xs={6}>
                                        <input type="password" ref="password" class="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={9}>
                                        <Row>
                                            <a href="reset.html" className="pull-right login-forgot">Forgot password?</a>
                                        </Row>
                                        <Row>
                                            <input type="button" class="btn btn-primary login-button" value="Login" onClick={this.onLoginClick}/>
                                        </Row>
                                        <Row>
                                            <h2 className="badge badge-danger pull-right login-error">{this.props.auth.error}</h2>
                                        </Row>
                                    </Col>
                                </Row>                              
                                </form>
                            </Col>
                        </Row>
                        <hr />
                    </Grid>
                </div>
            );
        }
        return <Redirect to="/" />; 
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, { onLogin })(LoginPage);