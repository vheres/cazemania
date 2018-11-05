import React, { Component } from 'react';
import { Grid, Row, Col, PanelGroup, Panel  } from 'react-bootstrap';

class InformationPage extends Component {

    renderInformationPage() {
        return(
            <Grid fluid className="m-b-sm">
                <Row>
                    <Col md={12}>
                        <img src="https://www.dtn.com.vn/skin/frontend/dtn_website/default/images/banner-package1.jpg" alt="banner" style={{width:"100%"}}></img>
                    </Col>
                </Row>
                <Row className="margin-top-15">
                    <Col md={2}></Col>
                    <Col md={8}>
                        <Row>
                            <h1 className="text-center" style={{color:"orange"}}><strong>Yuk dapatkan penghasilan jutaan rupiah dari bisnis online.</strong></h1>
                        </Row>
                        <Row>
                            <h2 className="text-center" style={{color:"#38AFFE"}}><strong>Program Reseller & Dropshipper @Cazemania</strong></h2>
                        </Row>
                        <Row>
                            <h3 style={{color:"#38AFFE"}}>Kenapa harus jual case hp?</h3>
                        </Row>
                        <Row>
                        <Panel style={{background:"#FEC664"}}>
                            <Panel.Body>
                                <p>Jaman sekarang ini case hp sudah menjadi kebutuhan banyak orang loh. Coba lihat orang2 di sekitar kk, pasti punya hp. Nah tingginya penggunaan hp / smartphone sekarang ini, menyebabkan tingginya kebutuhan case sebagai pelindung hp :D Selain itu, orang2 suka gonta ganti case loh! Jadi bisa kebayang kan kak berapa besar permintaan akan case hp?</p>
                            </Panel.Body>
                        </Panel>
                        </Row>
                        <Row>
                            <h3 style={{color:"#38AFFE"}}>Kenapa harus join dan apa keuntungan menjadi reseller / dropsipper di @cazemania?</h3>
                        </Row>
                        <Row>
                            <Panel style={{background:"#FEC664"}}>
                                <Panel.Body>
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
                                </Panel.Body>
                            </Panel>
                        </Row>
                        <Row>
                            <h3 style={{color:"#38AFFE"}}>Syarat menjadi reseller / dropsipper di Cazemania?</h3>
                        </Row>
                        <Row>
                            <Panel style={{background:"#FEC664"}}>
                                <Panel.Body>
                                    <ul>
                                        <li>Biaya pendaftaran hanya 99rb cukup bayar sekali dan berlaku seumur hidup, setelah itu berhak menikmati fasilitas2 diatas. </li>
                                    </ul>
                                </Panel.Body>
                            </Panel>
                        </Row>
                        <Row>
                            <h3 style={{color:"#38AFFE"}}><strong>KUOTA TERBATAS! Yuk buruan daftar jadi reseller / dropshipper @cazemania sekarang juga.</strong></h3>
                        </Row>
                        <Row>
                            <input type="button" className="btn btn-primary btn-lg block-margin-auto" value="Daftar Reseller/Dropshipper" onClick={()=>this.props.history.push('/register_reseller_dropshipper')}></input>
                        </Row>
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

export default InformationPage;