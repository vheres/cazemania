import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { onLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import {API_URL_1} from '../supports/api-url/apiurl'

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
                    <Grid fluid className="margin-bot-15">
                        <Row className="no-margin">
                            <img src={`${API_URL_1}/others/banner.jpg`} alt="banner" className="homepage-banner"></img>
                        </Row>
                        <Row className="margin-top-15">
                            <Col mdOffset={2} md={3}>
                                <Row>
                                    <Col xs={12} className="m-b-sm">
                                        <span className="login-register-title">Belum Punya Akun?</span><br/>
                                    </Col>
                                </Row>
                                <Row className="m-b-sm">
                                    <Col xs={12}>
                                    Yuk bergabung dengan Cazemania. Dengan membuat akun, kamu akan dimudahkan dalam berbelanja dan melacak pesanan kamu.
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <input type="button" className="btn btn-primary" value="Register" onClick={()=>this.props.history.push('/register')}></input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={7}>
                                <Row className="m-b-md">
                                    <Col xsOffset={1} xs={11}>
                                        <span className="login-register-title">Login Member</span>
                                    </Col>
                                </Row>
                                <form id="Login" className="login-form">
                                    <Row>
                                        <Col xs={2} className="text-right register-form-text">
                                        Email: 
                                        </Col>
                                        <Col xs={7}>
                                            <input type="email" ref="email" class="form-control" id="inputEmail" placeholder="Email Address" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={2} className="text-right register-form-text">
                                        Password: 
                                        </Col>
                                        <Col xs={7}>
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