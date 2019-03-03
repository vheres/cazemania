import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactPixel from 'react-facebook-pixel';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'

class InformationPage extends Component {
    componentDidMount() {
        ReactPixel.pageView();
    }

    onRegisterClick() {
        if (this.props.auth.email !== "") {
            if(window.confirm(`Daftar menjadi Reseller / Dropshipper?`)) {
                const token = this.props.auth.token
                const headers = {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                    }
                };
                axios.post(`${API_URL_1}/reseller/request`, headers)
                .then(res => {
                    alert('request untuk menjadi reseller telah di kirim')
                })
                .catch(err => {
                    console.log(err)
                })
            }
        } else {
            alert('Please Login First')
            this.props.history.push('/login')
        }
    }

    renderInformationPage() {
        return(
            <Grid fluid className="m-b-sm">
                <Row className="margin-top-15">
                    <Col xsOffset={1} xs={10} mdOffset={2} md={8}>
                        <div className="alternate-title">
                            <strong>Yuk dapatkan penghasilan jutaan rupiah dari bisnis online.</strong>
                        </div>
                        <div className="general-title">
                            <strong>Program Reseller & Dropshipper @Cazemania</strong>
                        </div>
                        <div className="m-t-lg m-b-lg">
                            <input type="button" className="btn-blue-orange" value="Daftar Reseller/Dropshipper" onClick={()=>this.onRegisterClick()}></input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={1} xs={10} mdOffset={2} md={5}>
                        <div className="general-title">
                            Kenapa harus jual case hp?
                        </div>
                        <div className="panel-container" style={{paddingTop:'60px'}}>
                            Jaman sekarang ini case hp sudah menjadi kebutuhan banyak orang loh. Coba lihat orang2 di sekitar kk, pasti punya hp. Nah tingginya penggunaan hp / smartphone sekarang ini, menyebabkan tingginya kebutuhan case sebagai pelindung hp :D Selain itu, orang2 suka gonta ganti case loh! Jadi bisa kebayang kan kak berapa besar permintaan akan case hp?
                        </div> 
                    </Col>
                    <Col xsOffset={2} xs={8} mdOffset={0} md={3}>
                        <img className="panel-image" src="https://scontent-sin2-1.cdninstagram.com/vp/46f95c4fdaf27320ebbfef2e74f33f48/5CB20369/t51.2885-15/e35/43914696_285115715674926_40493325195562597_n.jpg" alt="case" style={{'width':'100%','object-fit':'cover'}}/>
                    </Col>
                </Row>
                <Row style={{'margin-top':'100px'}}>
                    <Col xsHidden smHidden mdOffset={2} md={3}>
                        <img className="panel-image" src="https://scontent-sin2-1.cdninstagram.com/vp/4329008dcaafcb88fb65825393d240bf/5C8B275E/t51.2885-15/e35/26066544_2258446541048558_3589484128396902400_n.jpg" alt="case" style={{'width':'100%','object-fit':'cover'}}/>
                    </Col>
                    <Col xsOffset={1} xs={10} mdOffset={0} md={5}>
                        <div className="general-title">
                            Kenapa harus join dan apa keuntungan menjadi reseller / dropsipper di @cazemania?
                        </div>
                        <div className="panel-container" style={{paddingTop:'60px'}}>
                            <ul>
                                <li>Tanpa modal, karena tidak perlu stock. Hanya perlu pesan sesuai orderan yang diterima.</li>
                                <li>Barang mudah dijual karena kebutuhan akan case sangat tinggi</li>
                                <li>Dapat Harga khusus reseller! Softcase 30rb/pcs, Hardcase 40rb/pcs</li>
                                <li>Keuntungan BESAR! Harga biasa dinaikkan 10rb - 30rb dari harga reseller</li>
                                <li>Waktu kerja yang fleksibel dan tidak mengikat. ( lagi jalan2, lagi diluar kota, lagi kerja di kantor, lg kuliah / sekolah, onlineshop kk ttp bisa jalan :D )</li>
                                <li>Admin khusus reseller yang ramah dan fast response :)</li>
                                <li>Tidak pusing masalah pengiriman karena @cazemania yang akan mengurus pengiriman dengan menggunakan nama kamu sebagai pengirimnya (dropship)</li>
                                <li>FREE konsultasi bisnis langsung dengan owner sampai onlineshop kamu jalan dan menghasilkan.</li>
                                <li>Tips & Trick jualan online ala @cazemania (update setiap minggu)</li>
                                <li>Dapat katalog design case dan update katalog design case terbaru.</li>
                                <li>Bisa custom / request design case sesuai keinginan juga loh :)</li>
                            </ul>
                        </div> 
                    </Col>
                    <Col mdHidden lgHidden xsOffset={2} xs={8}>
                        <img className="panel-image" src="https://scontent-sin2-1.cdninstagram.com/vp/4329008dcaafcb88fb65825393d240bf/5C8B275E/t51.2885-15/e35/26066544_2258446541048558_3589484128396902400_n.jpg" alt="case" style={{'width':'100%','object-fit':'cover'}}/>
                    </Col>
                </Row>
                <Row style={{'margin-top':'100px'}}>
                    <Col xsOffset={1} xs={10} mdOffset={2} md={5}>
                        <div className="general-title">
                            Syarat menjadi reseller / dropsipper di Cazemania?
                        </div>
                        <div className="panel-container" style={{paddingTop:'60px'}}>
                        Biaya pendaftaran hanya 99rb cukup bayar sekali dan berlaku seumur hidup, setelah itu berhak menikmati fasilitas2 diatas.
                        </div> 
                    </Col>
                    <Col xsOffset={2} xs={8} mdOffset={0} md={3}>
                        <img className="panel-image" src="https://scontent-sin2-1.cdninstagram.com/vp/6c075725884f3be5039afc70a2db4698/5CA2B04D/t51.2885-15/e35/27891893_200998550644182_3707945378029502464_n.jpg" alt="case" style={{'width':'100%','object-fit':'cover'}}/>
                    </Col>
                </Row>
                <Row style={{'margin-top':'100px'}}>
                    <Col xsOffset={2} xs={8} className="alternate-title" style={{'font-size':'20pt'}}>
                        KUOTA TERBATAS! Yuk buruan daftar jadi reseller / dropshipper @cazemania sekarang juga.
                    </Col>
                </Row>
            </Grid>
        )
    }

    render() {
        return (
            this.renderInformationPage()
        );   
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default withRouter(connect(mapStateToProps, {})(InformationPage));