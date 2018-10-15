
import React, { Component } from 'react';  // React, { Component } -> destructuring
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../actions';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from '../actions';
import { withRouter } from 'react-router-dom';
import {API_URL_1} from '../supports/api-url/apiurl'

const cookies = new Cookies();

class Header extends Component {

    componentWillMount() {
        const theCookie = cookies.get('myCookie');
        if(theCookie !== undefined) {
            this.props.keepLogin(theCookie);
        } 
        else {
            this.props.cookieChecked();
        }
        console.log(this.props.auth);
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

    onSearchClick() {
        var search = document.getElementById("search").value;
        this.props.history.push(`/shop?search=${search}`)
    }

    renderNavbar = () => {   
        if(this.props.auth.email !== "") {
            return(
                <Grid fluid>
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
                                        <MenuItem eventKey={3.3}>Custom Cases</MenuItem>
                                    </NavDropdown>
                                    <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick("/reseller-dropshipper")}>
                                        <span className="orange-text">Reseller/Dropshipper</span>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/Admin?table=cases")}>
                                        <span className="orange-text">Admin</span>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/payment")}>
                                        <span className="orange-text">Payment</span>
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
                                        <Button type="submit" className="btn btn-tosca" onClick={()=>this.onLinkClick("/cart")}><i class="fa fa-shopping-cart"></i></Button>
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
            </Grid>
            );
        }

        return(
            <Grid fluid>
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
                                        <MenuItem eventKey={3.3}>Custom Cases</MenuItem>
                                    </NavDropdown>
                                    <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick("/reseller-dropshipper")}>
                                        <span className="orange-text">Reseller/Dropshipper</span>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/Admin?table=cases")}>
                                        <span className="orange-text">Admin</span>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/payment")}>
                                        <span className="orange-text">Payment</span>
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
                                        <Button type="submit" className="btn btn-tosca" onClick={()=>this.onLinkClick("/cart")}><i class="fa fa-shopping-cart" ></i></Button>
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
            </Grid>
        );
    }
    render() {
        return (
            this.renderNavbar()              
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}



export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(Header));