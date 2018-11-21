import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Footer extends Component { //kalo gak pake destructuring, tulisnya React.Component
    onLinkClick = (target) => {
        this.props.history.push(target)
    }

    renderFooter = () => {   
        return(
            <Grid fluid className="Footer-css text-left">
                <Row style={{'margin-bottom':'30px'}}>
                        <Col xsOffset={2} xs={10} mdOffset={2} md={3} className="m-t-lg">
                            <Row>
                                <span className="general-title-blue">S </span><span className="footer-title">upport</span>
                            </Row>
                            <Row>
                                <div className="pointer"></div>
                            </Row>
                            <Row>
                                <Link to="/information?info=faq"><h5 className="footer-text">FAQ</h5></Link>
                            </Row>
                            <Row>
                                <Link to="/information?info=caraorder"><h5 className="footer-text">Cara Order</h5></Link>
                            </Row>
                            <Row>
                                <Link to="/information?info=pembayaran"><h5 className="footer-text"Konfirmasi>Pembayaran</h5></Link>
                            </Row>
                            <Row>
                                <Link to="/information?info=informasipengiriman"><h5 className="footer-text">Informasi Pengiriman</h5></Link>
                            </Row>
                            <Row>
                                <Link to="/information?info=penukarandanpengembalian"><h5 className="footer-text">Penukaran dan Pengembalian</h5></Link>
                            </Row>
                        </Col>
                        <Col xsOffset={2} xs={10} mdOffset={0} md={3} className="m-t-lg">
                            <Row>
                                <span className="general-title-blue">F </span><span className="footer-title">ollow Us</span>
                            </Row>
                            <Row>
                                <div className="pointer"></div>
                            </Row>
                            <Row>
                                <a href="https://www.instagram.com/cazemania/?hl=en" target="_blank"><img src="https://diylogodesigns.com/wp-content/uploads/2016/05/instagram-Logo-PNG-Transparent-Background-download-768x768.png" alt="instagram" style={{width:"30px"}}></img></a> <span className="text-white">@cazemania</span>
                            </Row>
                            <Row style={{'margin-top':'5px'}}>
                                <a href="https://www.facebook.com/Cazemania-145109639470441/" target="_blank"><img src="http://www.dfmalherbe.co.za/wp-content/uploads/2016/01/facebook-logo-png-transparent-background.png" alt="facebook" style={{width:"25px", 'marginLeft':'2px'}}></img></a><span className="text-white facebook-text">Cazemania</span>
                            </Row>
                        </Col>
                        <Col xsOffset={2} xs={10} mdOffset={0} md={4} className="m-t-lg">
                            <Row>
                                <span className="general-title-blue">C </span><span className="footer-title">ontact Us</span>     
                            </Row>
                            <Row>
                                <div className="pointer"></div>
                            </Row>
                            <Row>
                                <a href="https://www.instagram.com/cazemania/?hl=en" target="_blank"><img src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c523.png" alt="line" style={{width:"30px"}}></img></a>
                            </Row>
                            <Row style={{'margin-top':'5px'}}>
                                <a href="https://www.facebook.com/Cazemania-145109639470441/" target="_blank"><img src="https://images.sftcdn.net/images/t_optimized,f_auto/p/cc03a0ea-96d0-11e6-9905-00163ed833e7/1398466786/whatsapp-logo.png" alt="whatsapp" style={{width:"30px"}}></img></a>
                            </Row>
                        </Col>
                </Row>
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