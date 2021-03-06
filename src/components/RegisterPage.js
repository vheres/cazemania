import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { onRegister } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import ReactPasswordStrength from 'react-password-strength'

const cookies = new Cookies();

class RegisterPage extends Component {
    state = {
        selectedOption: [],
        destination: [],
        filtered_destination:
        [], empty_input: [],
        input_style: [],
        password: '',
        validPassword: false
    }

    componentWillMount() {
        this.getDestinationList();
        this.setState({empty_input: [false, false, false, false, false, false, false, false, false], input_style: ['','','','','','','','',''] })
    }

    componentWillReceiveProps(newProps) {
        if(newProps.auth.email !== "") {
            cookies.set('myCookie', newProps.auth.email, { path: '/' })
        }
    }

    getDestinationList() {
        axios.get(API_URL_1 + '/destination')
        .then(response => {
            var arrJSX = [];
            response.data.result.forEach(item => {
                arrJSX.push({value:item.destination_code, label:`${item.province}, ${item.city}, ${item.subdistrict}`})
            })
            this.setState({destination: arrJSX})
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    handlePassword(password) {
        this.setState({password: password.password, validPassword: password.isValid})
    }

    handleInputChange(selectedOption) {
        if (selectedOption.length >= 3) {
            var filterArr = [];
            var regex = new RegExp(selectedOption, "i")
            for (var num in this.state.destination) {
                if ( regex.test(this.state.destination[num].label)) {
                    filterArr.push(this.state.destination[num])
                }
            }
            this.setState({filtered_destination: filterArr})
        } else if (selectedOption.length < 3) {
            this.setState({filtered_destination: []})
        }
    }   

    onKeyPress(x) {
        if (x.which === 13 ) {
            this.onRegisterClick();
        }
    }

    async onRegisterClick() {
        await this.checkInput();
        this.selectClass();
        var errIndicator = false;
        var gender = '';
        var inputArr= [];
        if (document.getElementById('male').checked === true) {
            gender = document.getElementById('male').value
        } else {
            gender = document.getElementById('female').value
        }
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
            inputArr = this.state.input_style.slice();
            inputArr[3] = 'password_diff'
            inputArr[4] = 'password_diff'
            this.setState({input_style: inputArr})
        } else {
            this.props.onRegister({
                firstName: this.refs.firstName.value,
                lastName: this.refs.lastName.value,
                gender: gender,
                email: this.refs.email.value,
                password: this.state.password,
                phone: this.refs.phone.value,
                address: this.refs.alamat.value,
                destination_code: this.state.selectedOption.value,
                kota: this.state.selectedOption.label,
                kodepos: this.refs.kodepos.value
            });
        }
    }

    async checkInput() {
        var tempArr = [];
        if (this.refs.firstName.value === '') {
            tempArr[0] = true;
        } else {
            tempArr[0] = false;
        }
        if (this.refs.lastName.value === '') {
            tempArr[1] = true;
        } else {
            tempArr[1] = false;
        }
        if (this.refs.email.value === '') {
            tempArr[2] = true;
        } else {
            tempArr[2] = false;
        }
        if (this.refs.password1.value === '') {
            tempArr[3] = true;
        } else {
            tempArr[3] = false;
        }
        if (this.refs.password2.value === '') {
            tempArr[4] = true;
        } else {
            tempArr[4] = false;
        }
        if (this.refs.phone.value === '') {
            tempArr[5] = true;
        } else {
            tempArr[5] = false;
        }
        if (this.refs.alamat.value === '') {
            tempArr[6] = true;
        } else {
            tempArr[6] = false;
        }
        if (this.state.selectedOption.value === undefined) {
            tempArr[7] = true;
        } else {
            tempArr[7] = false;
        }
        if (this.refs.kodepos.value === '') {
            tempArr[8] = true;
        } else {
            tempArr[8] = false;
        }
        await this.setState({empty_input: tempArr})
    }

    selectClass() {
        var inputArr = this.state.input_style.slice()
        this.state.empty_input.forEach((item, index) => {
            if (this.state.empty_input[index] === true) {
                inputArr[index] = 'empty_input'
            } else {
                inputArr[index] = ''
            }
        })
        this.setState({input_style: inputArr})
    }

    render() {
        const { selectedOption } = this.state;
        if(this.props.auth.email === "") {
            return(
                <Grid fluid>
                    <Row>
                        <Col xsOffset={1} xs={10} mdOffset={4} md={4} className="m-t-xl m-b-xl">
                            <Row className="m-b-md">
                                <Col xs={12}>
                                    <span className="general-title-blue">Register</span>
                                </Col>
                            </Row>
                            <form id="Register">
                                <Row>
                                    <Col xs={12} md={6}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Nama Depan</div>
                                            <input type="text" ref="firstName" id="inputFirstName" className="general-input" placeholder="First Name" onKeyPress={this.onKeyPress.bind(this)}/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Nama Belakang</div>  
                                            <input type="text" ref="lastName" id="inputLastName" className="general-input" placeholder="Last Name" onKeyPress={this.onKeyPress.bind(this)}/>
                                        </label>
                                    </Col>
                                </Row>
                                {/* <Row className="register-form">
                                    <Col xs={12}>
                                        <input type="radio" id="male" name="gender" value="male" checked></input> Male{' '}
                                        <input type="radio" id="female" name="gender" value="female"></input> Female{' '}
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col xs={12}>
                                        <div style={{fontSize:'12pt', fontWeight:'bold', color: 'rgb(100, 100, 100)', marginTop:'20px'}}>Gender</div>
                                        <label className="container">Male
                                            <input type="radio" name="gender" id="male" value="male"/>
                                            <span className="checkmark"/>
                                        </label>
                                        <label className="container">Female
                                            <input type="radio" name="gender" id="female" value="female"/>
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Email</div>
                                            <input type="email" ref="email" id="inputEmail" className="general-input" placeholder="Email" onKeyPress={this.onKeyPress.bind(this)}/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
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
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Phone</div>
                                            <input type="number" ref="phone" id="inputPhone" className="general-input" placeholder="081x-xxxx-xxxx" onKeyPress={this.onKeyPress.bind(this)}/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Address</div>
                                            <textarea type="text" ref="alamat" id="inputAdress" className="general-input" placeholder="Alamat"/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={6}>
                                    <Row>
                                        <Col xs={12}>
                                        <label className="general-input-container">
                                            <div className="general-input-label m-b">Kota dan Kecamatan</div>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={this.state.filtered_destination}
                                                onInputChange={this.handleInputChange.bind(this)}
                                                placeholder={`Pilih Kota/Kecamatan`}
                                            />
                                        </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <p className="small-font">*please input 3 or more characters</p>
                                        </Col>
                                    </Row> 
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Kode Pos</div>
                                            <input type="number" ref="kodepos" className="general-input" placeholder="Kode Pos"/>
                                        </label>
                                    </Col>        
                                </Row>
                                <Row>
                                    <Row className="m-t">
                                        <Col xs={12}>
                                            <input type="button" className="btn-blue-orange pull-right" style={{'width':'100%'}} value="Register" onClick={()=>this.onRegisterClick()}/>
                                        </Col>
                                    </Row>
                                    <Row className="pull-right m-t-sm">
                                        <Col xs={12} className="general-text">
                                            Sudah punya Akun? <Link to="/login" className="general-link" style={{fontSize:'12pt'}}>Login disini</Link>   
                                        </Col>
                                    </Row> 
                                </Row>                       
                            </form>
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