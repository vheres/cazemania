import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { connect } from 'react-redux';
import CartDetail from './CartDetail';
import Select from 'react-select';

class PaymentPage extends Component {
    state = ({ profile: [], cart: [], totalPrice: 0, edit_modal: false, selectedOption: [], destination: [], filtered_destination: [] })

    componentWillMount() {
        this.getUserInfo()
    }

    getUserInfo() {
        axios.get(API_URL_1 + "/checkout/" + this.props.auth.id)
        .then((response) => {
            console.log(response)
            this.setState({profile: response.data.user[0], cart: response.data.cart})
            this.calculateTransactionSummary()
        })
    }

    onCheckOutClick() {
        axios.post(API_URL_1 + "/transaction", {
            id: this.props.auth.id,
            subtotal: this.state.totalPrice,
            shipping: '10000',
            target_bank: 'BCA',
            cart: this.state.cart
        })
        .then(response => {
            alert('transaction success')
            this.props.history.push('/profile')
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
        if(this.refs.alamat.value == '' || this.state.selectedOption.label == '' || this.refs.kodepos.value == '') {
            alert('Please fill everything!');
        } else {
            axios.put(API_URL_1 + '/users/' + this.props.auth.id, {
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

    renderUserInfo() {
        return (
            <Row>
                <Col md={8} className="alamat-pengiriman">
                    <Row>
                        <span><strong>{this.state.profile.firstname} {this.state.profile.lastname}</strong></span>
                    </Row>
                    <Row>
                        <span>{this.state.profile.address}</span>
                    </Row>
                    <Row>
                        <span>{this.state.profile.kota}</span>
                    </Row>
                    <Row>
                        <span>{this.state.profile.kodepos}</span>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row>
                        <Button type="submit" onClick={this.handleShow.bind(this)} className="btn btn-default pull-right ganti-alamat-pengiriman"><span><i style={{'font-size': '20px'}} className="fa fa-edit"></i> Ganti Alamat</span></Button> 
                    </Row>
                </Col>
            </Row>
        )
    }

    renderCartList() {
        var arrJSX = [];
        arrJSX = this.state.cart.map((item,count) => {
            return <CartDetail key={item.id} id={item.id} count={count} name={item.name} code={item.code} image={item.image} brand={item.brand_name} model={item.model_name} type={item.case_type} quantity={item.amount} price={item.price}></CartDetail>
        })
        console.log(arrJSX)
        return arrJSX
    }

    renderTransactionSummary() {
        return (
            <Row>
                <Row>
                    <Col md={12}><h3>Ringkasan Belanja</h3></Col>
                </Row>
                <Row>
                    <Table responsive>
                    {this.renderTransactionDetail()}
                    </Table>
                </Row>
                <Row>
                    <input type="button" className="btn btn-primary" onClick={()=>this.onCheckOutClick()} style={{width:"100%"}} value="Checkout"/>
                </Row>
            </Row>
        )     
    }

    calculateTransactionSummary() {
        console.log(this.state.cart)
        var subTotal = 0;
        var totalPrice = 0;
        var countHardCase = 0;
        var countSoftCase = 0;
        var totalCase = 0;
        var countFree = 0;
        var freeSoft = 0;
        var freeHard = 0;
        var hardPrice = 0;
        var softPrice = 0;
        this.state.cart.map((item,count) => {
            if (item.case_type == "hard") {
                countHardCase += parseInt(item.amount);
                hardPrice = item.price;
            }
            else {
                countSoftCase += parseInt(item.amount)
                softPrice = item.price;
            }
            subTotal += item.amount * item.price;
        })
        totalCase = countHardCase + countSoftCase;
        countFree = Math.floor(totalCase/3);
        for(var i=0; i<countFree; i++) {
            if(countSoftCase > 0) {
                countSoftCase--;
                freeSoft++;
            }
            else {
                freeHard++;
            }
        }
        totalPrice = subTotal - (freeSoft*softPrice) - (freeHard*hardPrice)
        this.setState({totalPrice: totalPrice})
    }

    renderTransactionDetail() {
        var arrJSX = [];
        var subTotal = 0;
        var totalPrice = 0;
        var countHardCase = 0;
        var countSoftCase = 0;
        var totalCase = 0;
        var countFree = 0;
        var freeSoft = 0;
        var freeHard = 0;
        var hardPrice = 0;
        var softPrice = 0;
        this.state.cart.map((item,count) => {
            if (item.case_type == "hard") {
                countHardCase += parseInt(item.amount);
                hardPrice = item.price;
            }
            else {
                countSoftCase += parseInt(item.amount)
                softPrice = item.price;
            }
            subTotal += item.amount * item.price;
            arrJSX.push(<tr><td style={{width:"5%"}}>{count +1}.</td><td><strong>{item.name} | {item.code}</strong>, {item.model_name}, {item.case_type} case</td><td className="text-right">(Qty:{item.amount}) Rp.{item.amount * item.price}</td></tr>)
        })
        arrJSX.push(<br/>)
        arrJSX.push(<tr><td/><td><strong>Sub Total</strong></td><td className="text-right"><strong>Rp.{subTotal}</strong></td></tr>)
        totalCase = countHardCase + countSoftCase;
        countFree = Math.floor(totalCase/3);
        for(var i=0; i<countFree; i++) {
            if(countSoftCase > 0) {
                countSoftCase--;
                freeSoft++;
            }
            else {
                freeHard++;
            }
        }
        if(freeSoft>0) {
            arrJSX.push(<tr><td/><td>Free Soft Case:</td><td className="text-right">(Qty:{freeSoft}) - Rp.{freeSoft*softPrice}</td></tr>)
        }
        if(freeHard>0) {
            arrJSX.push(<tr><td/><td>Free Hard Case:</td><td className="text-right">(Qty:{freeHard}) - Rp.{freeHard*hardPrice}</td></tr>)
        }
        totalPrice = subTotal - (freeSoft*softPrice) - (freeHard*hardPrice)
        arrJSX.push(<br/>)
        arrJSX.push(<tr><td/><td><strong>Total Price</strong></td><td className="text-right"><strong>Rp.{totalPrice}</strong></td></tr>)
        return arrJSX
    }

    renderPaymentPage() {
        return(
            <Grid fluid className="HomePage-css padding-15p">
                    <Col md={2}></Col>
                    <Col md={5}>
                        <Row>
                            <h3>Checkout</h3>
                            <hr/>
                        </Row>
                        <Row>
                            <h4>Alamat Pengiriman</h4>
                        </Row>
                        <Row>
                            <Panel>
                                <Panel.Body>
                                    {this.renderUserInfo()}
                                </Panel.Body>
                            </Panel>
                        </Row>
                        <Row>
                            <h4>Keranjang Anda</h4>
                        </Row>
                        <Row>
                            <Panel>
                                <Panel.Body>
                                    {this.renderCartList()}
                                </Panel.Body>
                            </Panel>
                        </Row>
                        <Row>
                            <h4>Biaya Pengiriman</h4>
                        </Row>
                        <Row>
                            <Panel>
                                <Panel.Body>
                                    
                                </Panel.Body>
                            </Panel>
                        </Row>
                    </Col>
                    <Col mdOffset={1} md={3}>
                        {this.renderTransactionSummary()}
                    </Col>
                    <Modal show={this.state.edit_modal} onHide={this.handleClose.bind(this)} bsSize="large">
                        <Modal.Header closeButton>
                            <Modal.Title>Ganti Alamat</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id="Alamat">
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
        return (
            this.renderPaymentPage()
        );   
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
  
    return { auth };
  }


  
export default connect(mapStateToProps, {})(PaymentPage);