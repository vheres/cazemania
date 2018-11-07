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

const cookies = new Cookies();

class RegisterPage extends Component {
    state = { selectedOption: [], destination: [], filtered_destination: [], empty_input: [], input_style: [] }

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
            response.data.map((item, count) => {
                arrJSX.push({value:item.destination_code, label:`${item.province}, ${item.city}, ${item.subdistrict}`})
            })
            this.setState({destination: arrJSX})
            console.log(arrJSX)
            console.log(this.state.destination)
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
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
        if (x.which == 13 ) {
            this.onRegisterClick();
        }
    }

    async onRegisterClick() {
        await this.checkInput();
        this.selectClass();
        var errIndicator = false;
        var gender = '';
        if (document.getElementById('male').checked == true) {
            gender = document.getElementById('male').value
        } else {
            gender = document.getElementById('female').value
        }
        this.state.empty_input.map((item, index) => {
            if (item) {
                errIndicator = true;
                return;
            }
        })
        if (errIndicator === true) {
            alert('Please fill everything!');
            return
        } else if (this.refs.password1.value !== this.refs.password2.value) {
            alert('Your passwords does not match!')
            var inputArr = this.state.input_style.slice();
            inputArr[3] = 'password_diff'
            inputArr[4] = 'password_diff'
            this.setState({input_style: inputArr})
        } else if(this.refs.password1.value.length < 5) {
            alert('Password must be at least 5 characters long!')
            var inputArr = this.state.input_style.slice();
            inputArr[3] = 'password_diff'
            inputArr[4] = 'password_diff'
            this.setState({input_style: inputArr})
        } else {
            this.props.onRegister({
                firstname: this.refs.firstName.value,
                lastname: this.refs.lastName.value,
                gender: gender,
                email: this.refs.email.value,
                password: this.refs.password1.value,
                phone: this.refs.phone.value,
                address: this.refs.alamat.value,
                destination_code: this.state.selectedOption.value,
                kota: this.state.selectedOption.label,
                kodepos: this.refs.kodepos.value
            });
        }
    }

    checkInput() {
        var tempArr = [];
        if (this.refs.firstName.value == '') {
            tempArr[0] = true;
        } else {
            tempArr[0] = false;
        }
        if (this.refs.lastName.value == '') {
            tempArr[1] = true;
        } else {
            tempArr[1] = false;
        }
        if (this.refs.email.value == '') {
            tempArr[2] = true;
        } else {
            tempArr[2] = false;
        }
        if (this.refs.password1.value == '') {
            tempArr[3] = true;
        } else {
            tempArr[3] = false;
        }
        if (this.refs.password2.value == '') {
            tempArr[4] = true;
        } else {
            tempArr[4] = false;
        }
        if (this.refs.phone.value == '') {
            tempArr[5] = true;
        } else {
            tempArr[5] = false;
        }
        if (this.refs.alamat.value == '') {
            tempArr[6] = true;
        } else {
            tempArr[6] = false;
        }
        if (this.state.selectedOption.value == undefined) {
            tempArr[7] = true;
        } else {
            tempArr[7] = false;
        }
        if (this.refs.kodepos.value == '') {
            tempArr[8] = true;
        } else {
            tempArr[8] = false;
        }
        this.setState({empty_input: tempArr})
    }

    selectClass() {
        var inputArr = this.state.input_style.slice()
        this.state.empty_input.map((item, index) => {
            if (this.state.empty_input[index] == true) {
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
                <Grid fluid className="margin-bot-15">
                    <Row className="no-margin">
                        <img src={`${API_URL_1}/others/banner.jpg`} alt="banner" className="homepage-banner"></img>
                    </Row>        
                    <Row className="margin-top-15">
                        <Col mdOffset={2} md={6}>
                            <Row className="m-b-md">
                                <Col xsOffset={1} xs={11}>
                                    <span className="login-register-title">Register</span>
                                </Col>
                            </Row>
                            <form id="Register">
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Nama:</p> 
                                    </Col>
                                    <Col xs={4}>
                                        <input type="text" ref="firstName" className={`form-control ${this.state.input_style[0]}`} id="inputUsername" placeholder="First Name" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                    <Col xs={4}>
                                        <input type="text" ref="lastName" className={`form-control ${this.state.input_style[1]}`} id="inputUsername" placeholder="Last Name" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row className="register-form">
                                    <Col xs={3}>
                                    <p className="text-right">Gender:</p>  
                                    </Col>
                                    <Col xs={9}>
                                        <input type="radio" id="male" name="gender" value="male" checked></input> Male{' '}
                                        <input type="radio" id="female" name="gender" value="female"></input> Female{' '}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Email:</p> 
                                    </Col>
                                    <Col xs={9}>
                                        <input type="email" ref="email" className={`form-control ${this.state.input_style[2]}`} id="inputEmail" placeholder="Email" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Password:</p>  
                                    </Col>
                                    <Col xs={9}>
                                        <input type="password" ref="password1" className={`form-control ${this.state.input_style[3]}`} id="inputPassword1" placeholder="Password" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                        <input type="password" ref="password2" className={`form-control ${this.state.input_style[4]}`} id="inputPassword2" placeholder="Confirm Password" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Phone:</p> 
                                    </Col>
                                    <Col xs={9}>
                                        <input type="number" ref="phone" className={`form-control ${this.state.input_style[5]}`} id="inputPhone" placeholder="Phone" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Alamat:</p>  
                                    </Col>
                                    <Col xs={9}>
                                        <textarea type="text" ref="alamat" className={`form-control ${this.state.input_style[6]}`} id="inputAdress" placeholder="Alamat" onKeyPress={this.onKeyPress.bind(this)} style={{resize:"none"}} rows= '4' cols= '80'/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Kota atau Kecamatan:</p>  
                                    </Col>
                                    <Col xs={4}>
                                    <Row>
                                        <Col xs={12}>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={this.state.filtered_destination}
                                                onInputChange={this.handleInputChange.bind(this)}
                                                placeholder={`Pilih Kota/Kecamatan`}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <p className="small-font">*please input 3 or more characters</p>
                                        </Col>
                                    </Row> 
                                    </Col>
                                    <Col xs={2}>
                                    <p className="text-right register-form-text">Kode Pos:</p>
                                    </Col>
                                    <Col xs={3}>
                                    <input ref="kodepos" type="number" className={`form-control ${this.state.input_style[8]}`} placeholder="Kode Pos"></input>
                                    </Col>        
                                </Row>
                                <Row>
                                    <Row>
                                        <input type="button" class="btn btn-primary login-button" value="Register" onClick={()=>this.onRegisterClick()}/>
                                    </Row>
                                    <Row className="pull-right m-r-sm m-t-sm">
                                        Sudah punya Akun? <Link to="/login">Login disini</Link>    
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