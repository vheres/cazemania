import React, { Component } from 'react';
import { Grid, Row, Col, Button, Modal, Table } from 'react-bootstrap';
import CartDetail from './CartDetail';
import {API_URL_1} from '../supports/api-url/apiurl'
import axios from 'axios'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Select from 'react-select';


class ProfilePage extends Component {
    state = {profile: [], edit_modal: false, selectedOption: [], destination: [], filtered_destination: [], orders: [], transactions: []}

    componentWillMount(){
        this.getUserInfo()
        this.getTransaction()
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

    getTransaction = () => {
        axios.get(API_URL_1 + "/users/transactions/" + this.props.auth.id)
        .then((response) => {
            var orders= []
            var transactions= []
            console.log(response);
            response.data.map((item, count) => {
                if (item.status == 'pendingPayment') {
                    orders.push(item)
                }
                else {
                    transactions.push(item)
                }
            })
            this.setState({orders: orders, transactions: transactions})
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
                <Col xs={8}>
                    <input type="radio" id="male" name="gender" value="male" checked></input> Male{' '}
                    <input type="radio" id="female" name="gender" value="female"></input> Female{' '}
                </Col>
            )
        } else {
            return (
                <Col xs={8}>
                    <input type="radio" id="male" name="gender" value="male"></input> Male{' '}
                    <input type="radio" id="female" name="gender" value="female" checked></input> Female{' '}
                </Col>
            )
        }
    }

    renderUserInfo() {
        return (
            <Col mdOffset={2} md={3}>
                <Row>
                    <Col md={12}>
                        <span style={{"font-size": "28px"}}>My Profile</span><span className="profile-edit-button"><i class="fa fa-edit" title="Edit Profile" onClick={this.handleShow.bind(this)}></i></span>
                    </Col>
                </Row>
                <Row>
                <div className="my-profile-pointer"></div>
                </Row>
                <Row>
                    <Col md={12}>
                        <span style={{"font-size": "22px"}}>{this.state.profile.firstname} {this.state.profile.lastname}</span><span class="label bg-info profile-category-label">{this.state.profile.category}</span>
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
    
    renderOrderList() {
        return (
            <Col md={5}>
                <Table fluid>
                    {this.renderOrderDetail()}
                </Table>
            </Col>
        )
    }

    renderOrderDetail() {
        return (
            this.state.orders.map((item, count) => {
                
            })
        )
    }

    renderProfilePage() {
            return (
                <Grid fluid>
                {this.renderUserInfo()}
                {this.renderOrderList()}
                    <Modal show={this.state.edit_modal} onHide={this.handleClose.bind(this)} bsSize="large">
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id="Register">
                                <Row>
                                    <Col xs={2}>
                                    <p className="text-right register-form-text">Nama:</p> 
                                    </Col>
                                    <Col xs={8}>
                                        <p>{this.state.profile.firstname} {this.state.profile.lastname}</p><br/>
                                    </Col>
                                </Row>
                                <Row className="register-form">
                                    <Col xs={2}>
                                    <p className="text-right">Gender:</p>  
                                    </Col>
                                    {this.renderGenderOption()}
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    <p className="text-right register-form-text">Email:</p> 
                                    </Col>
                                    <Col xs={8}>
                                    <p>{this.state.profile.email}</p><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    <p className="text-right register-form-text">Phone:</p> 
                                    </Col>
                                    <Col xs={8}>
                                        <input type="text" ref="phone" class="form-control" id="inputPhone" placeholder="Phone" defaultValue={this.state.profile.phone} onKeyPress={this.onKeyPress.bind(this)}/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    <p className="text-right register-form-text">Alamat:</p>  
                                    </Col>
                                    <Col xs={8}>
                                        <textarea type="text" ref="alamat" class="form-control" id="inputAdress" placeholder="Alamat" defaultValue={this.state.profile.address} onKeyPress={this.onKeyPress.bind(this)} style={{resize:"none"}} rows= '4' cols= '80'/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    <p className="text-right register-form-text">Kota atau Kecamatan:</p>  
                                    </Col>
                                    <Col xs={3}>
                                <Row>
                                    <Col xs={12}>
                                        <Select
                                            value={this.state.selectedOption}
                                            onChange={this.handleChange}
                                            options={this.state.filtered_destination}
                                            onInputChange={this.handleInputChange.bind(this)}
                                            placeholder={`Pilih Kota/Kecamatan`}
                                            defaultValue={{value: this.state.profile.destination_code, label: this.state.profile.kota}}
                                            defaultInputValue={this.state.profile.kota}
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
                                <input ref="kodepos" type="text" className="form-control" placeholder="Kode Pos" defaultValue={this.state.profile.kodepos}></input>
                                </Col>        
                                </Row>                     
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <input type="button" className="btn btn-danger" onClick={this.handleClose.bind(this)} value="Cancel"/>
                            <input type="button" className="btn btn-success" onClick={()=>this.onEditSave()} value="Save"/>
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