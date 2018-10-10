
import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Footer extends Component { //kalo gak pake destructuring, tulisnya React.Component
    onLinkClick = (target) => {
        this.props.history.push(target)
    }

    renderFooter = () => {   
        return(
            <Grid fluid className="no-margin Footer-css text-left">
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={3}>
                        <Row>
                            <h2 className="text-white">Support</h2>
                        </Row>
                        <Row>
                            <div className="pointer"></div>
                        </Row>
                        <Row>
                            <Link to="/information?active=1"><h5 className="text-white">FAQ</h5></Link>
                        </Row>
                        <Row>
                            <Link to="/information?active=2"><h5 className="text-white">Cara Order</h5></Link>
                        </Row>
                        <Row>
                            <Link to="/information?active=3"><h5 className="text-white"Konfirmasi>Pembayaran</h5></Link>
                        </Row>
                        <Row>
                            <Link to="/information?active=4"><h5 className="text-white">Informasi Pengiriman</h5></Link>
                        </Row>
                        <Row>
                            <Link to="/information?active=5"><h5 className="text-white">Penukaran dan Pengembalian</h5></Link>
                        </Row>
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={3}>
                        <Row>
                            <h2 className="text-white">Follow Us</h2>
                        </Row>
                        <Row>
                            <div className="pointer"></div>
                        </Row>
                        <Row>
                            <a href="https://www.instagram.com/cazemania/?hl=en" target="_blank"><img src="https://diylogodesigns.com/wp-content/uploads/2016/05/instagram-Logo-PNG-Transparent-Background-download-768x768.png" alt="instagram" style={{width:"50px"}}></img></a> <span className="text-white">@cazemania</span>
                        </Row>
                        <Row>
                            <a href="https://www.facebook.com/Cazemania-145129639470441/" target="_blank"><img src="http://www.dfmalherbe.co.za/wp-content/uploads/2016/01/facebook-logo-png-transparent-background.png" alt="facebook" style={{width:"45px"}}></img></a><span className="text-white facebook-text">Cazemania</span>
                        </Row>
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={3}>
                        <Row>
                            <h2 className="text-white">Contact Us</h2>        
                        </Row>
                        <Row>
                            <div className="pointer"></div>
                        </Row>
                        <Row>
                            <a href="https://www.instagram.com/cazemania/?hl=en" target="_blank"><img src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c523.png" alt="line" style={{width:"50px"}}></img></a>
                        </Row>
                        <Row>
                            <a href="https://www.facebook.com/Cazemania-145129639470441/" target="_blank"><img src="https://images.sftcdn.net/images/t_optimized,f_auto/p/cc03a0ea-96d0-11e6-9905-00163ed833e7/1398466786/whatsapp-logo.png" alt="whatsapp" style={{width:"50px"}}></img></a>
                        </Row>
                    </Col>
                </Row>
                <br/>
                <br/>
            </Grid>
        );
    }
    render() {
        return (
            this.renderFooter()
    );
}
}

export default Footer;