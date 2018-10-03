
import React, { Component } from 'react';  // React, { Component } -> destructuring
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../actions';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from '../actions';
import { withRouter } from 'react-router-dom';

const cookies = new Cookies();

class Header extends Component { //kalo gak pake destructuring, tulisnya React.Component

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
        if(newProps.auth.username === "") {
            cookies.remove('myCookie');
        }
    }

    onLogoutClick = () => {
        this.props.onLogout();
    }

    onLinkClick = (target) => {
        this.props.history.push(target)
    }

    renderNavbar = () => {   
        if(this.props.auth.username !== "") {
            return(
                <Grid fluid>
                <Row>
                    <Navbar fixedTop={true} collapseOnSelect fluid>
                        <Navbar.Header style={{height:"100px"}}>
                            <Navbar.Brand>
                                <Link to="/"><img src="https://lh4.googleusercontent.com/k-yGYjiEqNwiYU-Dmc7wLVUSPaCd22hLU-CYmIHBaK7cfXYeKQJa4oUoQWWaQaskQzWK6WzHDIh-e4eTnsY=w1920-h969" alt="Caze Mania" style={{height:"400%"}}></img></Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>                       
                                <Nav>
                                    <NavItem eventKey={1} className="header-button" onClick={()=>this.onLinkClick("/shop")}>
                                        <h4 className="orange-text">Shop</h4>
                                    </NavItem>
                                    <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick("/")}>
                                        <h4 className="orange-text">Reseller/Dropshipper</h4>
                                    </NavItem>
                                    <NavItem eventKey={3} className="header-button" onClick={()=>this.onLinkClick("/")}>
                                        <h4 className="orange-text">Contact Us</h4>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/Admin?table=cases")}>
                                        <h4 className="orange-text">Admin</h4>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/product")}>
                                        <h4 className="orange-text">Detail</h4>
                                    </NavItem>
                                </Nav>
                                <Nav pullRight>
                                    <NavItem eventKey={5} className="header-button" onClick={()=>this.onLinkClick("/cart")}>
                                        <h4 className="orange-text">Cart</h4>
                                    </NavItem>
                                    <NavDropdown eventKey={6} title={"Hello, " + this.props.auth.username} className="header-button">
                                        <MenuItem eventKey={6.1} onClick={()=>this.onLogoutClick()}>
                                        <h4>Logout</h4>
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
                                <Link to="/"><img src="https://lh4.googleusercontent.com/k-yGYjiEqNwiYU-Dmc7wLVUSPaCd22hLU-CYmIHBaK7cfXYeKQJa4oUoQWWaQaskQzWK6WzHDIh-e4eTnsY=w1920-h969" alt="Caze Mania" className="img.responsive"></img></Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>                       
                                <Nav>
                                    <NavItem eventKey={1} className="header-button" onClick={()=>this.onLinkClick("/shop")}>
                                        <h4 className="orange-text">Shop</h4>
                                    </NavItem>
                                    <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick("/")}>
                                        <h4 className="orange-text">Reseller/Dropshipper</h4>
                                    </NavItem>
                                    <NavItem eventKey={3} className="header-button" onClick={()=>this.onLinkClick("/")}>
                                        <h4 className="orange-text">Contact Us</h4>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/Admin?table=cases")}>
                                        <h4 className="orange-text">Admin</h4>
                                    </NavItem>
                                    <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick("/product")}>
                                        <h4 className="orange-text">Detail</h4>
                                    </NavItem>
                                </Nav>
                                <Nav pullRight>
                                    <NavItem eventKey={5} className="header-button" onClick={()=>this.onLinkClick("/cart")}>
                                        <h4 className="orange-text">Cart</h4>
                                    </NavItem>
                                    <NavDropdown eventKey={6} title="Account" className="header-button">
                                        <MenuItem eventKey={6.1} onClick={()=>this.onLinkClick("/login")}>
                                        <h4>Login</h4>
                                        </MenuItem>
                                        <MenuItem eventKey={6.2} onClick={()=>this.onLinkClick("/register")}>
                                        <h4>Register</h4>
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