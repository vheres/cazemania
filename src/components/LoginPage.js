import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { onLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import {API_URL_1} from '../supports/api-url/apiurl'
import ReactPixel from 'react-facebook-pixel';

const cookies = new Cookies();

class LoginPage extends Component {
    componentDidMount() {
        ReactPixel.pageView();
    }

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
                        {/* <Row className="no-margin">
                            <img src={`${API_URL_1}/others/banner.jpg`} alt="banner" className="homepage-banner"></img>
                        </Row> */}
                        <Row className="margin-top-15">
                            <Col xsOffset={1} xs={10} mdOffset={2} md={4}>
                                <Row>
                                    <Col xs={12} className="m-b-sm">
                                        <span className="general-title-blue">Belum Punya Akun?</span><br/>
                                    </Col>
                                </Row>
                                <Row className="m-b-sm">
                                    <Col xs={12} className="general-text">
                                    Yuk bergabung dengan Cazemania. Dengan membuat akun, kamu akan dimudahkan dalam berbelanja dan melacak pesanan kamu.
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                                        <input type="button" className="btn-blue-orange" value="Register" onClick={()=>this.props.history.push('/register')}></input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xsOffset={1} xs={10} mdOffset={0} md={6}>
                                <Row className="m-b-md">
                                    <Col xs={12}>
                                        <span className="general-title-blue">Login Member</span>
                                    </Col>
                                </Row>
                                <form id="Login" className="login-form">
                                    <Row>
                                        {/* <Col xs={2} className="text-right register-form-text">
                                        Email: 
                                        </Col> */}
                                        <Col xs={12} md={8}>
                                            {/* <input type="email" ref="email" class="form-control" id="inputEmail" placeholder="Email Address" onKeyPress={this.onKeyPress.bind(this)}/><br/> */}
                                            <label className="general-input-container">
                                                <div className="general-input-label">Email</div>
                                                <input type="email" ref="email" id="inputEmail" className="general-input" placeholder="Your email" onKeyPress={this.onKeyPress.bind(this)}/>
                                            </label> 
                                        </Col>
                                    </Row>
                                    <Row className="m-t">
                                        {/* <Col xs={2} className="text-right register-form-text">
                                        Password: 
                                        </Col> */}
                                        <Col xs={12} md={8}>
                                            <label className="general-input-container">
                                                <div className="general-input-label">Password</div>
                                                <input type="password" ref="password" id="inputPassword" className="general-input" placeholder="Your password" onKeyPress={this.onKeyPress.bind(this)}/>
                                            </label> 
                                            {/* <input type="password" ref="password" class="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.onKeyPress.bind(this)}/><br/> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={8}>
                                            <Row className="m-t">
                                                <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                                                    <a href="reset.html" className="pull-right general-link">Forgot password?</a>
                                                </Col>
                                            </Row>
                                            <Row className="m-t">
                                                <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                                                    <input type="button" class="btn-orange-blue" style={{'float': 'right', 'width':'100%'}} value="Login" onClick={this.onLoginClick}/>
                                                </Col>
                                            </Row>
                                            <Row className="m-t">
                                                <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                                                    <h2 className="badge badge-danger pull-right">{this.props.auth.error}</h2>
                                                </Col>
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