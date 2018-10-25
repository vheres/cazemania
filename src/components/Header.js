
import React, { Component } from 'react';  // React, { Component } -> destructuring
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Col, FormGroup, FormControl, Button, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../actions';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from '../actions';
import { withRouter } from 'react-router-dom';
import {API_URL_1} from '../supports/api-url/apiurl'
import axios from 'axios'
import CartDetail from './CartDetail';

const cookies = new Cookies();

class Header extends Component {
    state = { cart: [], edit_modal: false }

    componentWillMount() {
        const theCookie = cookies.get('myCookie');
        if(theCookie !== undefined) {
            this.props.keepLogin(theCookie);
        } 
        else {
            this.props.cookieChecked();
        }
        this.getCartList();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.auth.email === "") {
            cookies.remove('myCookie');
        }
    }

    onLogoutClick = () => {
        this.props.onLogout();
    }

    onLinkClick = (target) => {
        this.props.history.push(target)
    }

    onKeyPress (x) {
        if (x.which == 13) {
            this.onSearchClick();
        }
    }
    // CART SECTION
    getCartList() {
        axios.get(API_URL_1 + `/cart/` + this.props.auth.id)
        .then((response) => {
            this.setState({cart: response.data.results})
        })
    }

    onPaymentClick() {
        this.setState({edit_modal: false})
        this.props.history.push('/payment')
    }

    onDeleteClick(id) {
        axios.delete(API_URL_1 + `/cart/` + this.props.auth.id + "/" + id, )
        .then((response) => {
            console.log(response.data)
            this.setState({cart: response.data.results1})
            alert(`delete item success!`)
        }).catch((err) => {
            console.log(err);
        })
    }

    onClearCartClick() {
        axios.delete(API_URL_1 + `/clear_cart/` + this.props.auth.id)
        .then((response) => {
            this.setState({cart:[]})
            alert(`clear cart success!`)
        }).catch((err) => {
            console.log(err);
        })
    }

    renderCartList() {
        var arrJSX = [];
        console.log(this.state.cart)
        arrJSX = this.state.cart.map((item,count) => {
            return <CartDetail key={item.id} id={item.id} count={count} name={item.name} code={item.code} image={item.image} brand={item.brand_name} model={item.model_name} type={item.case_type} quantity={item.amount} price={item.price} DeleteClick={(temp)=>this.onDeleteClick(temp)}></CartDetail>
        })
        console.log(arrJSX)
        return arrJSX
    }

    renderCartPage() {
        console.log(this.state.cart)
        if (this.state.cart.length == 0) {
            return(
                <Grid fluid>
                    <Row>
                        <Col mdOffset={2} md={8}>
                            <img src="https://cdn3.iconfinder.com/data/icons/flat-icons-big-sized/64/shopping-card-512.png" alt="empty cart" className="empty-cart"></img>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-center">Your cart is empty, shop now!</h4>
                    </Row>
                    <Row>
                        <input type="button" className="btn btn-success gotoshop-button" value="Go to shop!" onClick={()=>{this.setState({edit_modal: false});this.props.history.push('/shop')}}/>
                    </Row>
                </Grid>
            )
        }
        else {
            return(
                <Grid fluid>
                <Row>
                    <Col md={12}>
                        {this.renderCartList()}              
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h3>Ringkasang Belanja</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    <Table responsive>
                        {this.renderTransactionDetail()}
                    </Table>
                    </Col>
                </Row>   
                </Grid>
            );
        }
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
                arrJSX.push(<tr><td style={{width:"5%"}}>{count +1}.</td><td style={{width:"50%"}}><strong>{item.name} | {item.code}</strong>, {item.model_name}, {item.case_type}</td><td style={{width:"45%"}} className="text-right">(Qty:{item.amount}) Rp.{item.amount * item.price}</td></tr>)
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
    // END CART SECTION

    // MODAL SECTION
    handleClose() {
        this.setState({ edit_modal: false });
    }
    
    handleShow() {
        this.getCartList();
        this.setState({ edit_modal: true });
    }
    // END MODAL SECTION

    onSearchClick() {
        var search = document.getElementById("search").value;
        this.props.history.push(`/shop?search=${search}`)
    }

    renderNavbar = () => {   
        if(this.props.auth.email !== "") {
            return(
                <Row>
                    <Navbar fixedTop={true} collapseOnSelect fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/"><img src={`${API_URL_1}/others/logo.png`} alt="Caze Mania" style={{height:"400%"}}></img></Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>                       
                                <Nav>
                                    <NavDropdown eventKey={3} title={<span className="orange-text">Shop</span>} id="basic-nav-dropdown" className="header-button">
                                        <MenuItem eventKey={3.1} onClick={()=>this.onLinkClick("/shop")}>Collections</MenuItem>
                                        <MenuItem eventKey={3.2} onClick={()=>this.onLinkClick("/premium_cases")}>Premium Cases</MenuItem>
                                        <MenuItem eventKey={3.3} onClick={()=>this.onLinkClick("/custom")}>Custom Cases</MenuItem>
                                    </NavDropdown>
                                    <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick("/reseller-dropshipper")}>
                                        <span className="orange-text">Reseller/Dropshipper</span>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/admin/cases")}>
                                        <span className="orange-text">Admin</span>
                                    </NavItem>
                                </Nav>
                                <Nav pullRight>
                                    <Navbar.Form pullLeft>
                                        <FormGroup className="header-search-container">
                                        <FormControl type="text" id="search" placeholder="Search Code / Name" class="form-control" style={{width:"450px"}} onKeyPress={this.onKeyPress.bind(this)}/>{' '}
                                        <Button type="submit" className="btn btn-tosca" onClick={()=>this.onSearchClick()}><i class="icon-magnifier"></i></Button>
                                        </FormGroup>
                                    </Navbar.Form>
                                    <NavItem eventKey={5} className="margin-cart">
                                        <Button type="submit" className="btn btn-tosca" onClick={this.handleShow.bind(this)}><i class="fa fa-shopping-cart"></i></Button>
                                    </NavItem>
                                    <NavDropdown eventKey={6} title={<i class="fa fa-user"></i>} id="basic-nav-dropdown" className="margin-user account-css">
                                        <MenuItem eventKey={6.1} onClick={()=>this.onLinkClick(`/profile`)}>
                                            <span>Profile</span>
                                        </MenuItem>
                                        <MenuItem eventKey={6.1} onClick={()=>this.onLogoutClick()}>
                                            <span>Logout</span>
                                        </MenuItem>
                                    </NavDropdown>
                                </Nav>
                        </Navbar.Collapse>       
                    </Navbar> 
                </Row>
            );
        }

        return(
                <Row>
                    <Navbar fixedTop={true} collapseOnSelect fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/"><img src={`${API_URL_1}/others/logo.png`} alt="Caze Mania" className="img.responsive"></img></Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>                       
                                <Nav>
                                    <NavDropdown eventKey={3} title={<span className="orange-text">Shop</span>} id="basic-nav-dropdown" className="header-button">
                                        <MenuItem eventKey={3.1} onClick={()=>this.onLinkClick("/shop")}>Collections</MenuItem>
                                        <MenuItem eventKey={3.2} onClick={()=>this.onLinkClick("/premium_cases")}>Premium Cases</MenuItem>
                                        <MenuItem eventKey={3.3} onClick={()=>this.onLinkClick("/custom")}>Custom Cases</MenuItem>
                                    </NavDropdown>
                                    <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick("/reseller-dropshipper")}>
                                        <span className="orange-text">Reseller/Dropshipper</span>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/admin/cases")}>
                                        <span className="orange-text">Admin</span>
                                    </NavItem>
                                </Nav>
                                <Nav pullRight>
                                    <Navbar.Form pullLeft>
                                        <FormGroup className="header-search-container">
                                        <FormControl type="text" id="search"placeholder="Search Code / Name" class="form-control" style={{width:"450px"}} onKeyPress={this.onKeyPress.bind(this)}/>{' '}
                                        <Button type="submit" className="btn btn-tosca" onClick={()=>this.onSearchClick()}><i class="icon-magnifier"></i></Button>
                                        </FormGroup>
                                    </Navbar.Form>
                                    <NavItem eventKey={5} className="margin-cart" >
                                        <Button type="submit" className="btn btn-tosca" onClick={()=>this.onLinkClick("/login")}><i class="fa fa-shopping-cart" ></i></Button>
                                    </NavItem>
                                    <NavDropdown eventKey={6} title={<i class="fa fa-user"></i>} id="basic-nav-dropdown" className="margin-user account-css">
                                        <MenuItem eventKey={6.1} onClick={()=>this.onLinkClick("/login")}>
                                            <span>Login</span>
                                        </MenuItem>
                                        <MenuItem eventKey={6.2} onClick={()=>this.onLinkClick("/register")}>
                                            <span>Register</span>
                                        </MenuItem>
                                    </NavDropdown>
                                </Nav>
                        </Navbar.Collapse>       
                    </Navbar> 
                </Row>
        );
    }
    render() {
        return (
            <div>
                <Grid fluid>
                {this.renderNavbar()} 
                </Grid>              
                <Modal show={this.state.edit_modal} onHide={this.handleClose.bind(this)} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title><span>Keranjang Anda</span><span><input type="button" style={{'margin-right':'30px'}} className="btn btn-warning pull-right" value="Clear Cart" onClick={()=>this.onClearCartClick()}/></span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {this.renderCartPage()}
                </Modal.Body>
                <Modal.Footer>
                    <input type="button" className="btn btn-danger" onClick={this.handleClose.bind(this)} value="Back"/>
                    <input type="button" className="btn btn-success" onClick={()=>this.onPaymentClick()} value="Proceed to Payment"/>
                </Modal.Footer>
                </Modal>
            </div>
                
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}



export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(Header));