import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPixel from 'react-facebook-pixel';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'

class ResetPassword extends Component {
    componentDidMount() {
        ReactPixel.pageView();
    }

    onKeyPress(x) {
        if (x.which === 13) {
            this.onResetClick()
        }
    }

    onResetClick() {
        if (this.refs.email.value.length !== 0) {
            axios.post(`${API_URL_1}/auth/forgotpassword`, {
                email: this.refs.email.value
            })
            .then(res => {
                alert('Email Anda telah diterima, kami telah mengirimkan email untuk mengubah password Anda')
                this.props.history.push('/')
            })
            .catch(err => {
                // console.log(err)
            })
        } else {
            alert('Masukkan email Anda')
        }

    }


    render() {
        if(this.props.auth.email === "") {
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
                                            <input type="button" className="btn-blue-orange" style={{width:'100%'}} value="Reset Password" onClick={()=>this.onResetClick()}/>
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