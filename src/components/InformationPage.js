import React, { Component } from 'react';
import { Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import ReactPixel from 'react-facebook-pixel';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { Link } from 'react-router-dom';

class InformationPage extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    
        this.state = {
        buttonCSS: ['btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default']
        };
    }

    componentWillReceiveProps(newProps) {
        const params = new URLSearchParams(newProps.location.search);
        const info = params.get('info')
        document.getElementById(info).scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const params = new URLSearchParams(this.props.location.search);
        const info = params.get('info');
        document.getElementById(info).scrollIntoView({behavior: 'smooth', block: 'start'});
        ReactPixel.pageView();
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        var tempCSS = this.state.buttonCSS.slice();
        if (this.isInViewport(document.getElementById('faq'))) {
            tempCSS = ['btn btn-info', 'btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default']
        } else if (this.isInViewport(document.getElementById('caraorder'))) {
            tempCSS = ['btn btn-default', 'btn btn-info', 'btn btn-default', 'btn btn-default', 'btn btn-default']
        } else if (this.isInViewport(document.getElementById('pembayaran'))) {
            tempCSS = ['btn btn-default', 'btn btn-default', 'btn btn-info', 'btn btn-default', 'btn btn-default']
        } else if (this.isInViewport(document.getElementById('informasipengiriman'))) {
            tempCSS = ['btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-info', 'btn btn-default']
        } else if (this.isInViewport(document.getElementById('penukarandanpengembalian'))) {
            tempCSS = ['btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-info']
        }
        this.setState({buttonCSS: tempCSS})
    }

    isInViewport(elem) {
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    async handleSelect(target) {
        document.getElementById(target).scrollIntoView({behavior: 'smooth', block: 'start'})
    }

    renderInformationPage() {
        return(
            <Grid fluid className="HomePage-css">
                <Row className="margin-top-15">
                    <Col mdOffset={1} md={2} xsHidden smHidden className="information-quick-link">
                        <div className="general-title-blue">
                            Menu
                        </div>
                        <ButtonGroup vertical>
                            <Button onClick={()=>this.handleSelect('faq')} className={`${this.state.buttonCSS[0]}`}>FAQ</Button>
                            <Button onClick={()=>this.handleSelect('caraorder')} className={`${this.state.buttonCSS[1]}`}>Cara Order</Button>
                            <Button onClick={()=>this.handleSelect('pembayaran')} className={`${this.state.buttonCSS[2]}`}>Pembayaran</Button>
                            <Button onClick={()=>this.handleSelect('informasipengiriman')} className={`${this.state.buttonCSS[3]}`}>Informasi Pengiriman</Button>
                            <Button onClick={()=>this.handleSelect('penukarandanpengembalian')} className={`${this.state.buttonCSS[4]}`}>Penukaran dan Pengembalian</Button>
                        </ButtonGroup>
                    </Col>
                    <Col xsOffset={1} xs={10} mdOffset={0} md={6} style={{'line-height':'1.8'}}>
                        <Row>
                            <Col xs={12} className="general-title-blue" style={{'position':'absolute'}}>
                                Information Page
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} id="faq" className="information-list-title" style={{paddingTop:'80px'}}>
                                FAQ
                            </Col>
                        </Row>
                        <Row>
                            <div className="my-profile-pointer"></div>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Barangnya READY atau PO kak?
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <p>Untuk softcase & hardcase, PO kurang lebih 7-14 hari untuk proses mencetak case (tidak termasuk tanggal merah dan hari Sabtu Minggu). Caze Mania selalu mengusahakan agar case bisa jadi secepatnya, tetapi semua tergantung antrian cetak.</p>
                            <p>Untuk premium case, barang ready stock.</p>
                            <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Berapa lama waktu PO?
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <p>kurang lebih 7-14 hari untuk proses cetak casenya (tidak termasuk tanggal merah dan hari Sabtu Minggu). Caze Mania selalu mengusahakan agar case bisa jadi secepatnya, tetapi semua tergantung antrian cetak.</p>
                            <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Apakah bisa Custom? Apa Syarat & Ketentuan untuk custom case?
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <p>Cazemania menerima pesanan custom case. Untuk custom ada biaya tambahan sebesar Rp 10.000,- per case, & file design gambar dari customer.</p>
                            <img src={`${API_URL_1}/others/customimage.png`} alt="custom" style={{width:'300px'}}></img>
                            <p>File design harus seperti gambar sebelah kiri, tidak bisa seperti yang sebelah kanan. Jadi, harus berupa file design bukan foto case hp yang ada designnya.</p>
                            <p>Tambahan:</p>
                            <ul>
                                <li>Sebaiknya file design memiliki resolusi yg tinggi (supaya hasil cetak tidak pecah)</li>
                                <li>Sebaiknya bentuk file design memanjang ke bawah seperti bentuk case hp.</li>
                            </ul>
                            <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Apa jenis case yang tersedia?
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <p>Caze Mania menjual 2 jenis case:</p>
                            <ul>
                                <li>Softcase    : Tidak full print, bahan elastis & bisa ditekuk-tekuk</li>
                                <li>Hardcase	: Full print, bahan kaku & tidak bisa ditekuk-tekuk</li>
                            </ul>
                            <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Berapa Harganya?
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <ul>
                                <li>Softcase	: Rp. 50.000,-</li>
                                <li>Hardcase	: Rp. 75.000,-</li>
                            </ul>
                            <p>Beli 2 Gratis 1, bisa campur tipe hp & design case bisa berbeda.</p>
                            <ul>
                                <li>Premium Case    : Rp. 100.000,-</li>
                            </ul>
                            <p>Tidak berlaku beli 2 gratis 1</p>
                            <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Apakah gratisnya berupa softcase / hardcase?
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <p>Beli 2 gratis 1</p>
                            <ul>
                                <li>Gratisnya adalah softcase</li>
                                <li>Gratis hardcase hanya bisa didapatkan apabila semua pesanan adalah hardcase.</li>
                            </ul>
                            <p>Contoh: kalau beli 6 pcs campur softcase & hardcase maka yg dianggap sebagai gratisnya adalah softcase, tetapi jika membeli 6 pcs dan semua hardcase maka bisa dapat hardcase sebagai gratisnya.</p>
                            <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Punya pertanyaan lain?
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <p>Silahkan chat admin melalui Line / Whatsapp</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} id="caraorder" className="information-list-title" style={{paddingTtop:'80px'}}>
                            Cara Order
                            </Col>
                        </Row>
                        <Row>
                            <div className="my-profile-pointer"></div>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                            richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                            moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                            wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                            aesthetic synth nesciunt you probably haven't heard of them accusamus
                            labore sustainable VHS.
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} id="pembayaran" className="information-list-title" style={{paddingTop:'80px'}}>
                                Pembayaran
                            </Col>
                        </Row>
                        <Row>
                            <div className="my-profile-pointer"></div>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <ul>
                                    <li>
                                        Untuk cek order Anda & nominal yang perlu dibayarkan, Anda dapat melihat melalui halaman "My Transactions" <Link to="/profile" style={{color:'rgb(9, 175, 204)'}}>http://cazemania.id/profile</Link> atau Anda juga dapat mengecek kembali E-mail Anda.
                                    </li>
                                    <li>
                                        Silahkan m elakukan pembayaran dengan cara transfer ke nomor rekening:
                                        <ul>
                                            <li>
                                                BCA 5725203613 atas nama Catharina Evelyn
                                            </li>
                                            <li>
                                                Mandiri 1330011915279 atas nama Catharina Evelyn
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Setelah melakukan pembayaran, langkah selanjutnya adalah mengkonfirmasi pembayaran
                                    </li>
                                    <li>
                                        Pada halaman "My Transactions" / <Link to="/profile" style={{color:'rgb(9, 175, 204)'}}>http://cazemania.id/profile</Link> klik pada bagian nomor order ID dari transaksi yang sudah dibayarkan.
                                    </li>
                                    <li>
                                        Klik tombol "pilih gambar" untuk memasukkan bukti pembayaran. Lau, klik upload untuk meng-upload bukti pembayaran Anda.
                                    </li>
                                    <li>
                                        Setelah berhasil mengupload bukti pembayaran, admin Caze Mania akan melakukan pengecekan, apabila admin telah mengkonfirmasi pembayaran Anda, maka Anda akan mendapatkan e-mail konfirmasi pembayaran.
                                    </li>
                                    <li>
                                        Selanjutnya mohon menunggu kurang lebih 7-14 hari kerja (tidak termasuk tanggal merah & hari Minggu) karena pesanan case akan kami proses cetak terlebih dahulu.
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} id="informasipengiriman" className="information-list-title" style={{paddingTop:'80px'}}>
                                Informasi Pengiriman
                            </Col>
                        </Row>
                        <Row>
                            <div className="my-profile-pointer"></div>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <ul>
                                <li>Caze Mania menggunakan jasa kurir pengiriman Sicepat Ekspress.</li>
                                <li>Setelah case selesai dicetak, kami akan mengirimkan barang pesanan ke alamat yang diberikan dan customer akan mendapatkan e-mail notifikasi bahwa barang telah dikirim serta nomor resi pengiriman.</li>
                                <li>Pihak kurir Sicepat Ekspress juga akan memberikan informasi mengenai pengiriman barang melalui SMS ke nomor hp customer.</li>
                                <li>Status pengiriman juga dapat dicek melalui http://sicepat.com/cek-resi dengan memasukkan nomor resi yang telah diberikan.</li>
                            </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} id="penukarandanpengembalian" className="information-list-title" style={{paddingTop:'80px'}}>
                                Penukaran dan Pengembalian
                            </Col>
                        </Row>
                        <Row>
                            <div className="my-profile-pointer"></div>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Ongkos Kirim
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <ul>
                                <li>Ongkos kirim dari pihak pembeli / customer ke alamat kami, ditanggung oleh pihak customer / reseller / dropshipper.</li>
                                <li>Ongkos kirim dari pihak kami ke alamat pembeli / customer, ditanggung oleh pihak kami.</li>
                            </ul>
                            <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Case DAPAT diretur / ditukar apabila:
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <ul>
                                <li>Gambar yg dicetak tidak sesuai dengan pesanan / salah gambar. (contoh: pesan case kode FLMG1, tp yg dikirim FLMG2)</li>
                                <li>Case yang dikirim tidak sesuai dengan tipe hp yang dipesan. (contoh: pesan case untuk iphone 6, dikirim case untuk iphone X)</li>
                                <li>Pesan softcase tp yg dikirim hardcase ataupun sebaliknya.</li>
                                <li>Dalam kondisi rusak/cacat saat barang sampai di alamat tujuan (contoh: hasil cetak ada yang terkelupas,  ada bagian case yang seperti meleleh, ada bagain case yang putus)</li>
                            </ul>
                            <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Case TIDAK BISA diretur / ditukar apabila:
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
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
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Prosedur Retur
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <ul>
                                <li>Harap laporkan terlebih dahulu ke admin apabila ada keluhan untuk retur barang.</li>
                                <li>Admin akan memeriksa apakah barang bisa diretur / tidak.</li>
                                <li>Setelah mendapat persetujuan retur, makan admin akan mengirimkan alamat retur & info mengenai notes retur.</li>
                                <li>Setelah case diperbaiki  / dicetak ulang, kami akan mengirimkan case tersebut ke alamat tujuan.</li>
                            </ul>
                            <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="information-list-subtitle">
                            Refund
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <ul>
                                <li>Bisa refund, dengan syarat barang dikembalikan ke pihak kami telebih dahulu. Setelah barang sampai ke alamat kami maka kami akan melakukan refund uang ke rekening reseller / dropsipper.</li>
                            </ul>
                            </Col>
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