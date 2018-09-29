import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { onRegister } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class RegisterPage extends Component {
    componentWillReceiveProps(newProps) {
        if(newProps.auth.username !== "") {
            cookies.set('myCookie', newProps.auth.email, { path: '/' })
        }
    }

    onRegisterClick = () => {
        this.props.onRegister({
            username: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
        });
    }


    render() {
        console.log(this.props.auth)
        if(this.props.auth.username === "") {
            return(
                <div>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={2}>
                            </Col>
                            <Col xs={8}>
                                <PageHeader>
                                REGISTER
                                </PageHeader>
                            </Col>
                        </Row>
                        </Grid>
                        <Grid>
                        <Row>
                            <Col xs={12}>
                                <form id="Login" className="login-form">
                                <Row>
                                    <Col xs={2}>
                                    Username: 
                                    </Col>
                                    <Col xs={10}>
                                        <input type="text" ref="username" class="form-control" id="inputUsername" placeholder="Username" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    Email: 
                                    </Col>
                                    <Col xs={10}>
                                        <input type="email" ref="email" class="form-control" id="inputEmail" placeholder="Email Address" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    Password: 
                                    </Col>
                                    <Col xs={10}>
                                        <input type="password" ref="password" class="form-control" id="inputPassword" placeholder="Password" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <input type="button" class="btn btn-primary login-button" value="Register" onClick={this.onRegisterClick}/>
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

export default connect(mapStateToProps, { onRegister })(RegisterPage);