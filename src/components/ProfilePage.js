import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Clearfix } from 'react-bootstrap';
import ProfileOrder from './ProfileOrder';
import {API_URL_1} from '../supports/api-url/apiurl'
import axios from 'axios'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import ReactPixel from 'react-facebook-pixel';


class ProfilePage extends Component {
    state = {profile: [], edit_modal: false, selectedOption: [], destination: [], filtered_destination: []}

    componentDidMount(){
        this.getUserInfo()
        ReactPixel.pageView();
    }

    getUserInfo = () => {
        axios.get(API_URL_1 + "/profile", {
            params: {
                id: this.props.auth.id
            }
        })
        .then((response) => {
            this.setState({profile: response.data.profile[0]})
        })
    }

    getDestinationList() {
        axios.get(API_URL_1 + '/destination')
        .then(response => {
            var arrJSX = [];
            response.data.map((item, count) => {
                arrJSX.push({value:item.destination_code, label:`${item.province}, ${item.city}, ${item.subdistrict}`})
            })
            this.setState({destination: arrJSX})
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

    handleClose() {
        this.setState({ edit_modal: false });
    }
    
    handleShow() {
        this.getDestinationList();
        this.setState({ selectedOption:{value:this.state.profile.destination_code, label:this.state.profile.kota} ,edit_modal: true });
    }

    onKeyPress(enter) {
        console.log(enter.which)
    }

    onEditSave() {
        var gender = '';
        if (document.getElementById('male').checked == true) {
            gender = document.getElementById('male').value
        } else {
            gender = document.getElementById('female').value
        }
        if(this.refs.phone.value == '' || this.refs.alamat.value == '' || this.state.selectedOption.label == '' || this.refs.kodepos.value == '') {
            alert('Please fill everything!');
        } else {
            axios.put(API_URL_1 + '/users/' + this.props.auth.id, {
                gender: gender,
                phone: this.refs.phone.value,
                address: this.refs.alamat.value,
                destination_code: this.state.selectedOption.value,
                kota: this.state.selectedOption.label,
                kodepos: this.refs.kodepos.value
            }).then((response) => {
                alert('Edit Success')
                this.getUserInfo()
                this.setState({ edit_modal: false });
            })
        }
    }

    renderGenderOption() {
        if (this.state.profile.gender == 'male') {
            return (
                <Col xs={12} mdOffset={2} md={8}>
                    <div style={{fontSize:'12pt', fontWeight:'bold', color: 'rgb(100, 100, 100)', marginTop:'20px'}}>Gender</div>
                    <label className="container">Male
                    <input type="radio" name="gender" id="male" value="male" checked/>
                    <span className="checkmark"/>
                    </label>
                    <label className="container">Female
                        <input type="radio" name="gender" id="female" value="female"/>
                        <span className="checkmark"/>
                    </label>
                </Col>
            )
        } else {
            return (
                <Col xs={12} mdOffset={2} md={8}>
                    <div style={{fontSize:'12pt', fontWeight:'bold', color: 'rgb(100, 100, 100)', marginTop:'20px'}}>Gender</div>
                    <label className="container">Male
                    <input type="radio" name="gender" id="male" value="male"/>
                    <span className="checkmark"/>
                    </label>
                    <label className="container">Female
                        <input type="radio" name="gender" id="female" value="female" checked/>
                        <span className="checkmark"/>
                    </label>
                </Col>
            )
        }
    }

    renderUserInfo() {
        return (
            <Col xsOffset={1} xs={10} lgOffset={1} lg={3}>
                <Row>
                    <Col md={12}>
                        <span style={{fontSize: "28px"}}>My Profile</span><span className="profile-edit-button"><i className="fa fa-edit" title="Edit Profile" onClick={this.handleShow.bind(this)}></i></span>
                    </Col>
                </Row>
                <Row>
                <div className="my-profile-pointer"></div>
                </Row>
                <Row>
                    <Col md={12}>
                        <span style={{fontSize: "22px"}}>{this.state.profile.firstname} {this.state.profile.lastname}</span><span className="label bg-info profile-category-label">{this.state.profile.category}</span>
                    </Col>
                </Row>
                <Row>
                    <Col md={1}  style={{width:"20px"}}>
                        <i className="fa fa-envelope"></i>
                    </Col>
                    <Col md={11}>
                        {this.state.profile.email}
                    </Col> 
                </Row>
                <Row>
                    <Col md={1} style={{width:"20px"}}>
                        <i className="fa fa-phone"></i>
                    </Col>
                    <Col md={11}>
                        {this.state.profile.phone}
                    </Col>
                </Row>
                <Row>
                    <Col md={1} style={{width:"20px"}}>
                        <i className="fa fa-user"></i>
                    </Col>
                    <Col md={11}>
                        {this.state.profile.gender}
                    </Col>
                </Row>
                <Row>
                    <Col md={1} style={{width:"20px"}}>
                        <i className="fa fa-home"></i>
                    </Col>
                    <Col md={11}>
                        {this.state.profile.address}<br/>
                        {this.state.profile.kota}<br/>
                        {this.state.profile.kodepos}
                    </Col>
                </Row>
            </Col>
        )
    }

    renderProfilePage() {
            return (
                <Grid fluid style={{minHeight:'51.6vh'}}>
                <Row style={{'margin-top':'30px'}}>
                    {this.renderUserInfo()}
                    <Col xsOffset={1} xs={10} lgOffset={0} lg={7}>
                        <Row>
                            <Col md={12}>
                                <span style={{fontSize: "28px"}}>My Transactions</span>
                            </Col>
                        </Row>
                        <Row>
                            <div className="my-profile-pointer"></div>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <ProfileOrder/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                    <Modal show={this.state.edit_modal} onHide={this.handleClose.bind(this)} bsSize="large">
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id="Register">
                                <Row>
                                    <Col xs={12} mdOffset={2} md={8}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Nama</div>
                                            <input type="text" ref="nama" className="general-input" style={{'border':'none'}} placeholder="nama" defaultValue={`${this.state.profile.firstname} ${this.state.profile.lastname}`} disabled/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="register-form">
                                    {this.renderGenderOption()}
                                </Row>
                                <Row>
                                    <Col xs={12} mdOffset={2} md={8}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Email</div>
                                            <input type="text" ref="email" className="general-input" style={{'border':'none'}} placeholder="email" defaultValue={this.state.profile.email} disabled/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} mdOffset={2} md={8}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Phone</div>
                                            <input type="text" ref="phone" id="inputPhone" className="general-input" placeholder="Phone" defaultValue={this.state.profile.phone} onKeyPress={this.onKeyPress.bind(this)}/>
                                        </label> 
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} mdOffset={2} md={8}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Address</div>
                                            <textarea type="text" ref="alamat" id="inputAdress" className="general-input" placeholder="Alamat" defaultValue={this.state.profile.address} onKeyPress={this.onKeyPress.bind(this)} style={{resize:"none"}}/>
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} mdOffset={2} md={4}>
                                        <Row>
                                            <Col xs={12}>
                                                <label className="general-input-container">
                                                    <div className="general-input-label m-b">Kota atau Kecamatan</div>
                                                    <Select
                                                    value={this.state.selectedOption}
                                                    onChange={this.handleChange}
                                                    options={this.state.filtered_destination}
                                                    onInputChange={this.handleInputChange.bind(this)}
                                                    placeholder={`Pilih Kota/Kecamatan`}
                                                    defaultValue={{value: this.state.profile.destination_code, label: this.state.profile.kota}}
                                                    defaultInputValue={this.state.profile.kota}
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
                                    <Clearfix visibleXsBlock visibleSmBlock></Clearfix>
                                    <Col xs={12} mdOffset={0} md={4}>
                                        <label className="general-input-container">
                                            <div className="general-input-label">Kode Pos</div>
                                            <input type="text" ref="kodepos" className="general-input" placeholder="Kode Pos" defaultValue={this.state.profile.kodepos}/>
                                        </label>
                                    </Col>        
                                </Row>                     
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <input type="button" className="btn-orange-blue m-r" onClick={this.handleClose.bind(this)} value="Cancel"/>
                            <input type="button" className="btn-blue-orange" onClick={()=>this.onEditSave()} value="Save"/>
                        </Modal.Footer>
                    </Modal>
                </Grid>
            )
    }

    render() {
        if(this.props.auth.email != "") {
            return (
            this.renderProfilePage()
            );
        }
        return <Redirect to="/login" />;    
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
  
    return { auth };
  }


  
export default connect(mapStateToProps, {})(ProfilePage);