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
                                <Panel.Title toggle>FAQ</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <Grid fluid>
                                        <Row>
                                            <h4>Barangnya READY atau PO kak?</h4>
                                        </Row>
                                        <Row>
                                            <p>Barang PO ya kak :) kurang lebih 7-14hr ya kak untuk proses cetak casenya (tidak termasuk tgl merah n hari Sabtu Minggu) :) kita usahakan secepatnya, tapi semua tergantung antrian cetak ya kak :)</p>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>PO berapa lama kak?</h4>
                                        </Row>
                                        <Row>
                                            <p>kurang lebih 7-14hr ya kak untuk proses cetak casenya (tidak termasuk tgl merah n hari Sabtu Minggu) :) kita usahakan secepatnya, tp semua tergantung antrian cetak ya kak :)</p>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>Bisa Custom? Syarat & Ketentuan Custom apa kak?</h4>
                                        </Row>
                                        <Row>
                                            <p>Bisa custom kak :) untuk custom ada biaya tambahan 10rb per case, & file design gambar dari kamu ya kak :)</p>
                                            <img src="https://lh4.googleusercontent.com/wjKWUzK9ePBaOLCq4pf-1mWiTOPfuy0QtWZ7Fjf8WUfQGbLADYz-Lszie3q2VC8YWNvSNuodqlaC9T_lMnVGUBMTQ9ptSUFp455cqnA" alt="custom"></img>
                                            <p>File design harus seperti yang kiri ya kak bukan yg kanan. Jadi, harus berupa file design bukan foto case hp yang ada designnya</p>
                                            <p>Tambahan:</p>
                                            <ul>
                                                <li>Sebaiknya file design memiliki resolusi yg tinggi (supaya hasil cetak tidak pecah)</li>
                                                <li>Sebaiknya bentuk file design memanjang ke bawah seperti bentuk case hp.</li>
                                            </ul>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>Jenis casenya ada apa aja kak?</h4>
                                        </Row>
                                        <Row>
                                            <p>Ada 2 jenis case kak:</p>
                                            <ul>
                                                <li>Softcase    : tidak full print, bahan elastis & bisa ditekuk-tekuk</li>
                                                <li>Hardcase	: full print, bahan kaku & tidak bisa ditekuk-tekuk</li>
                                            </ul>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>Harganya berapa kak?</h4>
                                        </Row>
                                        <Row>
                                            <ul>
                                                <li>Softcase	: Rp 50.000,-</li>
                                                <li>Hardcase	: Rp 70.000,-</li>
                                            </ul>
                                            <p>Beli 2 Gratis 1, bisa campur tipe hp & design case bisa beda-beda juga</p>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>Gratisnya hardcase atau softcase kak?</h4>
                                        </Row>
                                        <Row>
                                            <p>Beli 2 gratis 1</p>
                                            <ul>
                                                <li>Gratisnya adalah softcase</li>
                                                <li>Bisa gratis hardcase kok kak :)  Tapi, semua pesanan hardcase ya kak.</li>
                                            </ul>
                                            <p>Contoh: kalau beli 6 pcs campur softcase & hardcase maka yg dianggap sebagai gratisnya adalah softcase, tp kl beli 6pcs dan semua hardcase maka bisa dapat hardcase sebagai freenya. :)</p>
                                            <hr/>
                                        </Row>
                                        <Row>
                                            <h4>Punya pertanyaan lain?</h4>
                                        </Row>
                                        <Row>
                                            <p>Silahkan chat admin melalui Line / Whatsapp :)</p>
                                        </Row>
                                    </Grid>
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="2">
                                <Panel.Heading>
                                <Panel.Title toggle>Cara Order</Panel.Title>
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
                                <Panel.Title toggle>Pembayaran</Panel.Title>
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
                                <Panel.Title toggle>Informasi Pengiriman</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                <ul>
                                    <li>Caze Mania menggunakan jasa kurir pengiriman Sicepat Ekspress.</li>
                                    <li>Setelah case selesai dicetak, kami akan mengirimkan barang pesanan ke alamat yang diberikan dan customer akan mendapatkan e-mail notifikasi bahwa barang telah dikirim serta nomor resi pengiriman.</li>
                                    <li>Pihak kurir Sicepat Ekspress juga akan memberikan informasi mengenai pengiriman barang melalui SMS ke nomor hp customer.</li>
                                    <li>Status pengiriman juga dapat dicek melalui http://sicepat.com/cek-resi dengan memasukkan nomor resi yang telah diberikan.</li>
                                </ul>
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