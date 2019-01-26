import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { onLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import ReactPixel from 'react-facebook-pixel';

const cookies = new Cookies();

class ResetPassword extends Component {
    componentDidMount() {
        ReactPixel.pageView();
    }

    onKeyPress(x) {
        if (x.which == 13) {
            this.onResetClick()
        }
    }

    onResetClick = () => {
        var email = this.refs.email.value;

    }


    render() {
        console.log(this.props.auth)
        if(this.props.auth.email == "") {
            return(
                <div>
                    <Grid fluid>
                        <Row className="m-t-xl m-b-xl">
                            <Col xs={12}>
                                <Row>
                                    <Col xs={12} mdOffset={4} md={4}>
                                        <div className="general-title-blue">
                                            Lupa Password kamu?
                                        </div>
                                        <div className="general-text">
                                            Silahkan masukkan email kamu ke dalam form dibawah ini untuk mendapatkan password baru.
                                        </div>
                                        <div>
                                            <label className="general-input-container m-t-xl">
                                                <div className="general-input-label">Enter your email :</div>
                                                <input type="email" ref="email" id="inputEmail" className="general-input" placeholder="Your email" onKeyPress={this.onKeyPress.bind(this)}/>
                                            </label> 
                                        </div>
                                        <div className="m-t-lg">
                                            <input type="button" className="btn-blue-orange" style={{width:'100%'}} value="Reset Password"/>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
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

export default connect(mapStateToProps, {})(ResetPassword);