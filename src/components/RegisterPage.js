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
    state = { selectedOption: null, destination: [] }

    componentWillMount() {
        axios.get(API_URL_1 + '/destination')
        .then(response => {
            // var arrJSX = [];
            // response.data.sicepat.results.map((item, count) => {
            //     arrJSX.push({value: item.destination_code, label: `${item.province}, ${item.city}, ${item.subdistrict}`})
            // })
            // console.log(arrJSX)
            // this.setState({destination: arrJSX})
            this.setState({destination: response.data.sicepat.results})
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

    postToBackEnd() {
        axios.post(API_URL_1 + '/copydata', this.state.destination)
        .then(response => {
            console.log('success')
        })
    }

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
        if(this.refs.firstName.value == '' || this.refs.lastName.value == '' || this.refs.email.value == '' || this.refs.password1.value == '' || this.refs.password2.value == '' || this.refs.alamat.value == '' || this.refs.kota.value == '' || this.refs.kodepos.value == '' ) {
            alert('Please fill everything!');
        }
        else if (this.refs.password1.value !== this.refs.password2.value) {
            alert('Your passwords does not match!')
        }
        else {
            // this.props.onRegister({
            //     firstname: this.refs.firstName.value,
            //     gender: ,
            //     lastname: this.refs.lastName.value,
            //     email: this.refs.email.value,
            //     password: this.refs.password.value,
            //     address: this.refs.address.value,
            //     province:,
            //     city:,
            //     kecamatan:
            // });
        }
        
    }


    render() {
        const { selectedOption } = this.state;
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
                                <Col mdOffset={2} md={8}>
                                        <form id="Login">
                                            <Row>
                                                <Col xs={2}>
                                                <p className="text-right">Nama:</p> 
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
                                                <p className="text-right">Gender:</p>  
                                                </Col>
                                                <Col xs={10}>
                                                    <input type="radio" id="male" name="gender" value="1"></input> Male{' '}
                                                    <input type="radio" id="female" name="gender" value="0"></input> Female{' '}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2}>
                                                <p className="text-right">Email:</p> 
                                                </Col>
                                                <Col xs={10}>
                                                    <input type="email" ref="email" class="form-control" id="inputEmail" placeholder="Email" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2}>
                                                <p className="text-right">Password:</p>  
                                                </Col>
                                                <Col xs={10}>
                                                    <input type="password" ref="password1" class="form-control" id="inputPassword1" placeholder="Password" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                                    <input type="password" ref="password2" class="form-control" id="inputPassword2" placeholder="Confirm Password" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2}>
                                                <p className="text-right">Alamat:</p>  
                                                </Col>
                                                <Col xs={10}>
                                                    <textarea type="text" ref="alamat" class="form-control" id="inputAdress" placeholder="Alamat" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2}>
                                                <p className="text-right">Kota atau Kecamatan:</p>  
                                                </Col>
                                                <Col xs={5}>
                                                <Select
                                                    value={selectedOption}
                                                    onChange={this.handleChange}
                                                    options={this.state.destination}
                                                    onKeyPress={()=>console.log('test')}
                                                />
                                                </Col>
                                                <Col xs={2}>
                                                <p className="text-right">Kode Pos:</p>
                                                </Col>
                                                <Col xs={3}>
                                                <input ref="kodepos" type="text" className="form-control" placeholder="Kode Pos"></input>
                                                </Col>        
                                            </Row>
                                            <Row className="margin-top-15">
                                                <input type="button" class="btn btn-primary login-button" value="Register" onClick={this.onRegisterClick}/>
                                                <input type="button" class="btn btn-primary login-button" value="INPUTTTTT" onClick={()=>this.postToBackEnd()}/>
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