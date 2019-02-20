import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Footer extends Component { //kalo gak pake destructuring, tulisnya React.Component
    onLinkClick = (target) => {
        this.props.history.push(target)
    }

    renderFooter = () => {   
        return(
            <Grid fluid className="Footer-css text-left" style={{marginRight:'0', paddingRight:'0', paddingTop:'30px',paddingBottom:'30px'}}>
                <Row style={{marginBottom:'30px'}}>
                    <Col xsOffset={1} xs={10}>
                        <Row>
                            <Col xs={12} md={4} className="m-t-lg">
                                <Row>
                                    <Col xs={12}>
                                        <div className="general-title-orange" style={{textAlign:'center'}}>
                                            Support
                                        </div>
                                        <div className="border" style={{borderColor:'white',paddingTop:'0.5rem'}}/>
                                        <div className="m-t-xl">
                                            <Link to="/information?info=faq"><h5 className="footer-text">FAQ</h5></Link>
                                        </div>
                                        <div className="m-t-md">
                                            <Link to="/information?info=caraorder"><h5 className="footer-text">Cara Order</h5></Link>
                                        </div>
                                        <div className="m-t-md">
                                            <Link to="/information?info=pembayaran"><h5 className="footer-text"Konfirmasi>Pembayaran</h5></Link>
                                        </div>
                                        <div className="m-t-md">
                                            <Link to="/information?info=informasipengiriman"><h5 className="footer-text">Informasi Pengiriman</h5></Link>
                                        </div>
                                        <div className="m-t-md">
                                            <Link to="/information?info=penukarandanpengembalian"><h5 className="footer-text">Penukaran dan Pengembalian</h5></Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={4} className="m-t-lg">
                                <Row>
                                    <Col xs={12}>
                                        <div className="general-title-orange" style={{textAlign:'center'}}>
                                            Follow Us
                                        </div>
                                        <div className="border" style={{borderColor:'white',paddingTop:'0.5rem'}}/>
                                        <div className="m-t-xl">
                                            <a href="https://www.instagram.com/cazemania/?hl=en" target="_blank"><img src="https://diylogodesigns.com/wp-content/uploads/2016/05/instagram-Logo-PNG-Transparent-Background-download-768x768.png" alt="instagram" style={{width:"30px"}}></img><h5 className="footer-text instagram-text" style={{display:'inline-block'}}>@Cazemania</h5></a>
                                        </div>
                                        <div className="m-t-sm">
                                            <a href="https://www.facebook.com/Cazemania-145129639470441/" target="_blank"><img src="http://www.dfmalherbe.co.za/wp-content/uploads/2016/01/facebook-logo-png-transparent-background.png" alt="facebook" style={{width:"25px", 'marginLeft':'2px'}}></img><h5 className="footer-text facebook-text" style={{display:'inline-block'}}>Cazemania</h5></a>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={4} className="m-t-lg">
                                <Row>
                                    <Col xs={12}>
                                        <div className="general-title-orange" style={{textAlign:'center'}}>
                                            Contact us
                                        </div>
                                        <div className="border" style={{borderColor:'white',paddingTop:'0.5rem'}}/>
                                        <div className="m-t-xl">
                                            <a href="https://www.instagram.com/cazemania/?hl=en" target="_blank"><img src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c523.png" alt="line" style={{width:"30px"}}></img></a>
                                        </div>
                                        <div className="m-t-sm">
                                            <a href="https://www.facebook.com/Cazemania-145109639470441/" target="_blank"><img src="https://images.sftcdn.net/images/t_optimized,f_auto/p/cc03a0ea-96d0-11e6-9905-00163ed833e7/1398466786/whatsapp-logo.png" alt="whatsapp" style={{width:"30px"}}></img></a>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
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