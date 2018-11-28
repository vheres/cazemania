
import React, { Component } from 'react';
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
import ReactPixel from 'react-facebook-pixel';

const cookies = new Cookies();

class Header extends Component {
    state = { cart: [], edit_modal: false }

    componentDidMount() {
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
        this.props.history.push('/')
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
            console.log(response.data.results)
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
            this.setState({cart: response.data.results1})
            console.log(response.data.results1)
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
        arrJSX = this.state.cart.map((item,count) => {
            return <CartDetail key={item.id} id={item.id} category={item.category} count={count} name={item.name} code={item.code} image={item.image} brand={item.brand_name} model={item.model_name} type={item.case_type} quantity={item.amount} price={item.price} DeleteClick={(temp)=>this.onDeleteClick(temp)}></CartDetail>
        })
        return arrJSX
    }

    renderCartPage() {
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
            var hardPrice = 75000;
            var softPrice = 50000;
            this.state.cart.map((item,count) => {
                if (item.case_type == "hard" || item.case_type =="customhard" || item.case_type =="premium") {
                    countHardCase += parseInt(item.amount);
                }
                else {
                    countSoftCase += parseInt(item.amount)
                }
                subTotal += item.amount * item.price;
                arrJSX.push(<tr><td style={{width:"5%"}}>{count +1}.</td><td style={{width:"50%"}}><strong>{item.name} | {item.code}</strong>, {item.model_name}, {item.case_type}</td><td style={{width:"45%"}} className="text-right">(Qty:{item.amount}) Rp. {(item.amount * item.price).toLocaleString()}</td></tr>)
            })
            arrJSX.push(<br/>)
            arrJSX.push(<tr><td/><td><strong>Sub Total</strong></td><td className="text-right"><strong>Rp. {subTotal.toLocaleString()}</strong></td></tr>)
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
                arrJSX.push(<tr><td/><td>Free Soft Case:</td><td className="text-right">(Qty:{freeSoft}) - Rp. {(freeSoft*softPrice).toLocaleString()}</td></tr>)
            }
            if(freeHard>0) {
                arrJSX.push(<tr><td/><td>Free Hard Case:</td><td className="text-right">(Qty:{freeHard}) - Rp. {(freeHard*hardPrice).toLocaleString()}</td></tr>)
            }
            totalPrice = subTotal - (freeSoft*softPrice) - (freeHard*hardPrice)
            arrJSX.push(<br/>)
            arrJSX.push(<tr><td/><td><strong>Total Price</strong></td><td className="text-right"><strong>Rp. {totalPrice.toLocaleString()}</strong></td></tr>)
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
        if (window.innerWidth >= 768) {
            var search = document.getElementById("search").value;
            this.props.history.push(`/shop?search=${search}`)
            ReactPixel.track('Search', search)
        } else {
            var searchMobile = document.getElementById("mobilesearch").value;
            this.props.history.push(`/shop?search=${searchMobile}`)
            ReactPixel.track('Search', searchMobile)
        }
    }

    renderPaymentButton() {
        if (this.state.cart.length === 0) {
            return (
                <input type="button" className="btn btn-success" onClick={()=>this.onPaymentClick()} value="Proceed to Payment" title="Your cart is empty!" disabled/>
            )
        } else {
            return (
                <input type="button" className="btn btn-success" onClick={()=>this.onPaymentClick()} value="Proceed to Payment"/>
            )
        }
    }

    renderNavbar = () => {   
        if(this.props.auth.email !== "") {
            return(
                <Row>
                    <Navbar fixedTop={true} collapseOnSelect fluid className="nav-style">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/"><img src={`${API_URL_1}/others/logo.png`} alt="Caze Mania" className="nav-logo"></img></Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                                <Col xsHidden smHidden md={3} lg={4} style={{'padding':'0', 'margin':'0'}}>
                                    <Nav>
                                        <NavDropdown eventKey={3} title={<span className="orange-text">Shop</span>}>
                                            <MenuItem eventKey={3.1} onClick={()=>this.onLinkClick("/shop")}>Collections</MenuItem>
                                            <MenuItem eventKey={3.2} onClick={()=>this.onLinkClick("/premium_cases")}>Premium Cases</MenuItem>
                                            <MenuItem eventKey={3.3} onClick={()=>this.onLinkClick("/custom")}>Custom Cases</MenuItem>
                                        </NavDropdown>
                                        <NavItem className="cursor-default">
                                            <span className="orange-text" onClick={()=>this.onLinkClick("/reseller-dropshipper")}>Reseller</span>
                                        </NavItem>
                                        <NavItem>
                                            <span className="orange-text" onClick={()=>this.onLinkClick("/admin/cases")}>Admin</span>
                                        </NavItem>
                                        
                                    </Nav>
                                </Col>                   
                                <Col xsHidden smHidden md={6} lg={6} style={{'padding':'0', 'margin':'0'}} className="pull-right">
                                    <Nav style={{'width':'100%'}}>
                                        <NavDropdown eventKey={6} title={<i class="fa fa-user"></i>} id="basic-nav-dropdown" className="m-r pull-right" style={{'font-size': '22px', 'margin-top':'6px'}}>
                                            <MenuItem eventKey={6.1} onClick={()=>this.onLinkClick(`/profile`)}>
                                                <span>Profile</span>
                                            </MenuItem>
                                            <MenuItem eventKey={6.1} onClick={()=>this.onLogoutClick()}>
                                                <span>Logout</span>
                                            </MenuItem>
                                        </NavDropdown>
                                        <NavItem eventKey={5} className="pull-right" >
                                            <Button type="submit" className="btn btn-tosca" onClick={()=>this.handleShow()}><i class="fa fa-shopping-cart" ></i></Button>
                                        </NavItem>
                                        <NavItem eventKey={4} className="pull-right">
                                            <Button type="submit" className="btn btn-tosca" onClick={()=>this.onSearchClick()}><i class="fa fa-search"></i></Button>
                                        </NavItem>
                                        <NavItem eventKey={4} className="pull-right">
                                            <input type="text" id="search" placeholder="Search Code / Name" class="search-bar" onKeyPress={this.onKeyPress.bind(this)}/>{' '}
                                        </NavItem>
                                    </Nav>
                                </Col>
                                <Col xs={12} sm={10} mdHidden lgHidden style={{'padding':'0', 'margin':'0'}}>
                                    <Nav style={{'width':'100%'}}>
                                        <NavDropdown eventKey={3} title={<span className="orange-text">Shop</span>} id="basic-nav-dropdown" className="header-button">
                                            <MenuItem eventKey={3.1} onClick={()=>this.onLinkClick("/shop")}>Collections</MenuItem>
                                            <MenuItem eventKey={3.2} onClick={()=>this.onLinkClick("/premium_cases")}>Premium Cases</MenuItem>
                                            <MenuItem eventKey={3.3} onClick={()=>this.onLinkClick("/custom")}>Custom Cases</MenuItem>
                                        </NavDropdown>
                                        <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick("/reseller-dropshipper")}>
                                            <span className="orange-text">Reseller</span>
                                        </NavItem>
                                        <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/admin/cases")}>
                                            <span className="orange-text">Admin</span>
                                        </NavItem>
                                        <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick(`/profile`)}>
                                            <span className="orange-text">Profile</span>
                                        </NavItem>
                                        <NavItem eventKey={4} className="header-button" onClick={()=>this.onLogoutClick()}>
                                            <span className="orange-text">Logout</span>
                                        </NavItem>
                                    </Nav>
                                </Col>
                        </Navbar.Collapse>       
                    </Navbar>
                    <Col xs={12} mdHidden lgHidden style={{'padding-top':'0px'}}>
                        <input type="text" id="mobilesearch" placeholder="Search Code / Name" class="search-bar-mobile" onKeyPress={this.onKeyPress.bind(this)}/>
                        <Button type="submit" className="btn-mobile" onClick={()=>this.onSearchClick()}><i class="fa fa-search" style={{'color':'white'}}></i></Button>
                        <Button type="submit" className="btn-mobile" onClick={()=>this.handleShow()}><i class="fa fa-shopping-cart" style={{'color':'white'}}></i></Button>
                    </Col>
                </Row>
            );
        }
        return(
                <Row>
                    <Navbar fixedTop={true} collapseOnSelect fluid className="nav-style">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/"><img src={`${API_URL_1}/others/logo.png`} alt="Caze Mania" className="nav-logo"></img></Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                                <Col xsHidden smHidden md={3} lg={4} style={{'padding':'0', 'margin':'0'}}>
                                    <Nav>
                                        <NavDropdown eventKey={3} title={<span className="orange-text">Shop</span>}>
                                            <MenuItem eventKey={3.1} onClick={()=>this.onLinkClick("/shop")}>Collections</MenuItem>
                                            <MenuItem eventKey={3.2} onClick={()=>this.onLinkClick("/premium_cases")}>Premium Cases</MenuItem>
                                            <MenuItem eventKey={3.3} onClick={()=>this.onLinkClick("/custom")}>Custom Cases</MenuItem>
                                        </NavDropdown>
                                        <NavItem className="cursor-default">
                                            <span className="orange-text" onClick={()=>this.onLinkClick("/reseller-dropshipper")}>Reseller</span>
                                        </NavItem>
                                        <NavItem>
                                            <span className="orange-text" onClick={()=>this.onLinkClick("/admin/dashboard")}>Admin</span>
                                        </NavItem>            
                                    </Nav>
                                </Col>                   
                                <Col xsHidden smHidden md={6} lg={6} style={{'padding':'0', 'margin':'0'}} className="pull-right">
                                    <Nav style={{'width':'100%'}}>
                                        <NavDropdown eventKey={6} title={<i class="fa fa-user"></i>} id="basic-nav-dropdown" className="m-r pull-right" style={{'font-size': '22px', 'margin-top':'6px'}}>
                                            <MenuItem eventKey={6.1} onClick={()=>this.onLinkClick("/login")}>
                                                <span><i className="fa fa-sign-in"></i> Login</span>
                                            </MenuItem>
                                            <MenuItem eventKey={6.2} onClick={()=>this.onLinkClick("/register")}>
                                                <span><i className="fa fa-user-plus"></i> Register</span>
                                            </MenuItem>
                                        </NavDropdown>
                                        <NavItem eventKey={5} className="pull-right" >
                                            <Button type="submit" className="btn btn-tosca" onClick={()=>{alert('Please Login First');this.onLinkClick("/login")}}><i class="fa fa-shopping-cart" ></i></Button>
                                        </NavItem>
                                        <NavItem eventKey={4} className="pull-right">
                                            <Button type="submit" className="btn btn-tosca" onClick={()=>this.onSearchClick()}><i class="fa fa-search"></i></Button>
                                        </NavItem>
                                        <NavItem eventKey={4} className="pull-right">
                                            <input type="text" id="search" placeholder="Search Code / Name" class="search-bar" onKeyPress={this.onKeyPress.bind(this)}/>{' '}
                                        </NavItem>
                                    </Nav>
                                </Col>
                                <Col xs={12} sm={6} mdHidden lgHidden style={{'padding':'0', 'margin':'0'}} className="pull-right">
                                    <Nav style={{'width':'100%'}}>
                                        <NavDropdown eventKey={3} title={<span className="orange-text">Shop</span>} id="basic-nav-dropdown" className="header-button">
                                            <MenuItem eventKey={3.1} onClick={()=>this.onLinkClick("/shop")}>Collections</MenuItem>
                                            <MenuItem eventKey={3.2} onClick={()=>this.onLinkClick("/premium_cases")}>Premium Cases</MenuItem>
                                            <MenuItem eventKey={3.3} onClick={()=>this.onLinkClick("/custom")}>Custom Cases</MenuItem>
                                        </NavDropdown>
                                        <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick("/reseller-dropshipper")}>
                                            <span className="orange-text">Reseller</span>
                                        </NavItem>
                                        <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/admin/dashboard")}>
                                            <span className="orange-text">Admin</span>
                                        </NavItem>
                                        <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/login")}>
                                            <span className="orange-text">Login</span>
                                        </NavItem>
                                        <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/register")}>
                                            <span className="orange-text">Register</span>
                                        </NavItem>
                                    </Nav>
                                </Col>
                        </Navbar.Collapse>       
                    </Navbar>
                    <Col xs={12} mdHidden lgHidden style={{'padding-top':'0px'}}>
                        <input type="text" id="mobilesearch" placeholder="Search Code / Name" class="search-bar-mobile" onKeyPress={this.onKeyPress.bind(this)}/>
                        <Button type="button" className="btn-mobile" onClick={()=>this.onSearchClick()}><i class="fa fa-search" style={{'color':'white'}}></i></Button>
                        <Button type="submit" className="btn-mobile" onClick={()=>{alert('Please Login First');this.onLinkClick("/login")}}><i class="fa fa-shopping-cart" style={{'color':'white'}}></i></Button>
                    </Col>
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
                    {this.renderPaymentButton()}
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