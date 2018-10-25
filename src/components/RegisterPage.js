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
    state = { selectedOption: [], destination: [], filtered_destination: [] }

    componentWillMount() {
        this.getDestinationList();
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

    onRegisterClick = () => {
        // console.log(this.refs.phone.value)
        var gender = '';
        if (document.getElementById('male').checked == true) {
            gender = document.getElementById('male').value
        } else {
            gender = document.getElementById('female').value
        }
        if(this.refs.firstName.value == '' || this.refs.lastName.value == '' || this.refs.email.value == '' || this.refs.password1.value == '' || this.refs.password2.value == '' || this.refs.phone.value == '' || this.refs.alamat.value == '' || this.state.selectedOption.label == '' || this.refs.kodepos.value == '' ) {
            alert('Please fill everything!');
        }
        else if (this.refs.password1.value !== this.refs.password2.value) {
            alert('Your passwords does not match!')
        }
        else {
            this.props.onRegister({
                firstname: this.refs.firstName.value,
                lastname: this.refs.lastName.value,
                gender: gender,
                email: this.refs.email.value,
                phone: this.refs.phone.value,
                address: this.refs.alamat.value,
                destination_code: this.state.selectedOption.value,
                kota: this.state.selectedOption.label,
                kodepos: this.refs.kodepos.value
            });
        }
    }


    render() {
        const { selectedOption } = this.state;
        if(this.props.auth.email === "") {
            return(
                <Grid fluid className="margin-bot-15">
                    <Row>
                        <img src="https://www.dtn.com.vn/skin/frontend/dtn_website/default/images/banner-package1.jpg" alt="banner" style={{width:"100%"}}/>
                    </Row>        
                    <Row className="margin-top-15">
                        <Col mdOffset={2} md={6}>
                            <form id="Register">
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Nama:</p> 
                                    </Col>
                                    <Col xs={4}>
                                        <input type="text" ref="firstName" class="form-control" id="inputUsername" placeholder="First Name" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                    <Col xs={4}>
                                        <input type="text" ref="lastName" class="form-control" id="inputUsername" placeholder="Last Name" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row className="register-form">
                                    <Col xs={3}>
                                    <p className="text-right">Gender:</p>  
                                    </Col>
                                    <Col xs={9}>
                                        <input type="radio" id="male" name="gender" value="male"></input> Male{' '}
                                        <input type="radio" id="female" name="gender" value="female"></input> Female{' '}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Email:</p> 
                                    </Col>
                                    <Col xs={9}>
                                        <input type="email" ref="email" class="form-control" id="inputEmail" placeholder="Email" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Password:</p>  
                                    </Col>
                                    <Col xs={9}>
                                        <input type="password" ref="password1" class="form-control" id="inputPassword1" placeholder="Password" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                        <input type="password" ref="password2" class="form-control" id="inputPassword2" placeholder="Confirm Password" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Phone:</p> 
                                    </Col>
                                    <Col xs={9}>
                                        <input type="number" ref="phone" class="form-control" id="inputPhone" placeholder="Phone" onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>
                                    <p className="text-right register-form-text">Alamat:</p>  
                                    </Col>
                                    <Col xs={9}>
                                        <textarea type="text" ref="alamat" class="form-control" id="inputAdress" placeholder="Alamat" onKeyPress={this.onKeyPress.bind(this)} style={{resize:"none"}} rows= '4' cols= '80'/><br/>
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
                                    <input ref="kodepos" type="text" className="form-control" placeholder="Kode Pos"></input>
                                    </Col>        
                                </Row>
                                <Row>
                                    <Row>
                                        <input type="button" class="btn btn-primary login-button" value="Register" onClick={this.onRegisterClick}/>
                                    </Row>
                                    <Row className="margin-top-15">
                                        <span className="pull-right">Already has an account?<Link to="/login">Login here</Link></span>
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