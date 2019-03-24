import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactPixel from 'react-facebook-pixel';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import ReactPasswordStrength from 'react-password-strength'

const { encrypt } = require('../supports/helpers/encryption.js');
const { appKey } = require('../supports/config')

class NewPassword extends Component {
    state = {
        empty_input: [],
        password: '',
        validPassword: false,
        ide: ''
    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        var ide = params.get('ide');
        this.setState({ide: ide})
        ReactPixel.pageView();
    }

    onKeyPress(x) {
        if (x.which === 13) {
            this.onResetClick()
        }
    }

    handlePassword(password) {
        this.setState({password: password.password, validPassword: password.isValid})
    }

    async onResetClick() {
        await this.checkInput()
        var errIndicator = false;
        this.state.empty_input.forEach((item) => {
            if (item) {
                errIndicator = true;
                return;
            }
        })
        if (errIndicator === true) {
            alert('Tolong isi semua kolom!');
            return
        } else if (this.state.validPassword === false) {
            alert('Gunakan password yang lebih kuat!')
        } else if (this.state.password !== this.refs.password2.value) {
            alert('Password anda tidak sesuai!')
        } else {
            const ep = encrypt(appKey, this.state.password)
            const headers = {
                headers: { 
                    'Authorization': `Bearer ${this.state.ide}`,
                }
            }
            axios.post(`${API_URL_1}/auth/newpassword`, {
                ep: ep
            }, headers)
            .then(res => {
                // console.log(res)
                alert('Selamat, Password anda telah diperbaharui. Silahkan login melanjutkan!')
                this.props.history.push('/login')
            })
            .catch(err => {
                // console.log(err)
                alert('Perubahan password gagal, silahkan coba lagi atau hubungi admin kami')
            })
        }
    }

    async checkInput() {
        var tempArr = [];
        if (this.refs.password1.value === '') {
            tempArr[0] = true;
        } else {
            tempArr[0] = false;
        }
        if (this.refs.password2.value === '') {
            tempArr[1] = true;
        } else {
            tempArr[1] = false;
        }
        await this.setState({empty_input: tempArr})
    }


    render() {
        return(
            <div>
                <Grid fluid>
                    <Row className="m-t-xl m-b-xl">
                        <Col xs={12}>
                            <Row>
                                <Col xs={12} mdOffset={4} md={4}>
                                    <div className="general-title-blue">
                                        Form Perubahan Password
                                    </div>
                                    <div className="general-text">
                                        Silahkan masukkan password baru Anda
                                    </div>
                                    <div>
                                        <label className="general-input-container">
                                        <div className="general-input-label">Password</div>
                                        {/* <input type="password" ref="password1" id="inputPassword1" className="general-input" placeholder="Password" onKeyPress={this.onKeyPress.bind(this)}/> */}
                                        <ReactPasswordStrength
                                        style={{border:'none',fontSize:'10pt'}}
                                            minLength={5}
                                            minScore={2}
                                            ref="password1"
                                            changeCallback={this.handlePassword.bind(this)}
                                            onKeyPress={this.onKeyPress.bind(this)}
                                            scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                                            inputProps={{ name: "password_input", autoComplete: "off", className: "general-input no-padding no-margin", placeholder: 'Password'}}
                                        /> 
                                        <input type="password" ref="password2" id="inputPassword2" className="general-input password" placeholder="Confirm Password" onKeyPress={this.onKeyPress.bind(this)}/>
                                    </label>
                                    </div>
                                    <div className="m-t-lg">
                                        <input type="button" className="btn-blue-orange" style={{width:'100%'}} value="Ganti Password Saya" onClick={()=>this.onResetClick()}/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default NewPassword;