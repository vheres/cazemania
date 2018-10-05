import React, { Component } from 'react';
import { Grid, Row, Col, PanelGroup, Panel  } from 'react-bootstrap';

class InformationPage extends Component {

    renderInformationPage() {
        return(
            <Grid fluid className="HomePage-css margin-15">
                <Row>
                    <Col md={12}>
                        <img src="https://www.dtn.com.vn/skin/frontend/dtn_website/default/images/banner-package1.jpg" alt="banner" style={{width:"100%"}}></img>
                    </Col>
                </Row>
                <Row className="margin-top-15">
                    <Col md={2}></Col>
                    <Col md={8}>
                        <PanelGroup accordion id="accordion-example">
                            <Panel eventKey="1">
                                <Panel.Heading>
                                <Panel.Title toggle>Collapsible Group Item #1</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                                aesthetic synth nesciunt you probably haven't heard of them accusamus
                                labore sustainable VHS.
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="2">
                                <Panel.Heading>
                                <Panel.Title toggle>Collapsible Group Item #2</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                                aesthetic synth nesciunt you probably haven't heard of them accusamus
                                labore sustainable VHS.
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="3">
                                <Panel.Heading>
                                <Panel.Title toggle>Collapsible Group Item #3</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                                aesthetic synth nesciunt you probably haven't heard of them accusamus
                                labore sustainable VHS.
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="4">
                                <Panel.Heading>
                                <Panel.Title toggle>Collapsible Group Item #3</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                                aesthetic synth nesciunt you probably haven't heard of them accusamus
                                labore sustainable VHS.
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="5">
                                <Panel.Heading>
                                <Panel.Title toggle>Penukaran dan Pengembalian</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <Grid fluid>
                                        <Row>
                                            <h4>1. Ongkos Kirim</h4>
                                        </Row>
                                        <Row>
                                            <ul>
                                                <li>Ongkos kirim dari pihak pembeli / customer ke alamat kami, ditanggung oleh pihak customer / reseller / dropshipper.</li>
                                                <li>Ongkos kirim dari pihak kami ke alamat pembeli / customer, ditanggung oleh pihak kami.</li>
                                            </ul>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>2. Case DAPAT diretur / ditukar apabila:</h4>
                                        </Row>
                                        <Row>
                                            <ul>
                                                <li>Gambar yg dicetak tidak sesuai dengan pesanan / salah gambar. (contoh: pesan case kode FLMG1, tp yg dikirim FLMG2)</li>
                                                <li>Case yang dikirim tidak sesuai dengan tipe hp yang dipesan. (contoh: pesan case untuk iphone 6, dikirim case untuk iphone X)</li>
                                                <li>Pesan softcase tp yg dikirim hardcase ataupun sebaliknya.</li>
                                                <li>Dalam kondisi rusak/cacat saat barang sampai di alamat tujuan (contoh: hasil cetak ada yang terkelupas,  ada bagian case yang seperti meleleh, ada bagain case yang putus)</li>
                                            </ul>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>3. Case TIDAK BISA diretur / ditukar apabila:</h4>
                                        </Row>
                                        <Row>
                                            <ul>
                                                <li>Kesalahan pengisian format order dari pihak pemesan. (contoh: di format order, pesannya case untuk samsung A3 2015, tetapi sebenarnya hp customer tsb bukan A3 2015 tetapi A3 2016)</li>
                                                <li>Pemberian keterangan  / deskripsi case custom yang tidak jelas. (contoh: Minta ditambah tulisan di casenya, tetapi tidak ada keterangan apa-apa, jadi disarankan kalau pesan custom harap dicantumkan penjelasan / keterangan yang jelas, seperti warna tulisan, posisi, dll.)</li>
                                                <li>Hasil cetak dianggap tidak sesuai / gambar dianggap blur.
                                                    Untuk hasil cetak case, warna & ketajamannya tidak bisa 100% sama seperti gambar karena faktor tinta & printer. Seperti hal-nya jika kita mencetak foto di percetakan terkadang hasilnya warna lebih gelap, atau tidak setajam yang seperti terlihat di kamera / komputer, begitu juga hal-nya dalam mencetak gambar / foto di case hp.
                                                    <ul>
                                                        <li>Info tambahan: Biasanya warna muda hasilnya akan lebih cenderung ke putih / lebih muda daripada yang terlihat pada file gambar.</li>
                                                    </ul>
                                                </li>
                                                <li>Case kebesaran sedikit
                                                    Apabila case kebesaran sedikit hal tersebut masih bisa diakali dengan diselipkan tissue di bagian belakang case dan dianggap masih merupakan hal yang dapat ditolerir (hal ini banyak terjadi pada Hardcase, disebabkan oleh proses sublimasi saat mencetak case).</li>
                                            </ul>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>4. Prosedur Retur</h4>
                                        </Row>
                                        <Row>
                                            <ul>
                                                <li>Harap laporkan terlebih dahulu ke admin apabila ada keluhan untuk retur barang.</li>
                                                <li>Admin akan memeriksa apakah barang bisa diretur / tidak.</li>
                                                <li>Setelah mendapat persetujuan retur, makan admin akan mengirimkan alamat retur & info mengenai notes retur.</li>
                                                <li>Setelah case diperbaiki  / dicetak ulang, kami akan mengirimkan case tersebut ke alamat tujuan.</li>
                                            </ul>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>5. Refund</h4>
                                        </Row>
                                        <Row>
                                            <ul>
                                                <li>Bisa refund, dengan syarat barang dikembalikan ke pihak kami telebih dahulu. Setelah barang sampai ke alamat kami maka kami akan melakukan refund uang ke rekening reseller / dropsipper.</li>
                                            </ul>
                                        </Row>
                                    </Grid>
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
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