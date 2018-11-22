import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link, Redirect, Route, withRouter} from 'react-router-dom'
import AdminOrdersTabs from './AdminOrdersTabs'
import AdminCatalogue from './AdminCatalogue'
import AdminCases from './AdminCases';
import AdminSettings from './AdminSettings';

class AdminDashboard extends Component {

    renderDash(){
        const { pathname } = this.props.location
        const { path } = this.props.match
        if(true){
            return(
            <div className="container-fluid" style={{"margin-top":"40px"}}>
                <div className="row">
                    <div className="col-md-offset-1 col-md-2">
                        <ListGroup>
                            <Link to={`${path}`}><ListGroupItem href="" active={`${path}` === pathname} header="Overview">Ringkasan</ListGroupItem></Link>
                            <Link to={`${path}/orders`}><ListGroupItem href="" active={`${path}/orders` === pathname} header="Orders">Lihat semua order</ListGroupItem></Link>
                            <Link to={`${path}/brands`}><ListGroupItem href="" active={`${path}/brands` === pathname} header="Brand">Lihat semua Brand/Tipe HP yang dijual</ListGroupItem></Link>
                            <Link to={`${path}/catalogue`}><ListGroupItem href="" active={`${path}/catalogue` === pathname} header="Catalogue">Ubah catalogue case tipe normal</ListGroupItem></Link>
                            <Link to={`${path}/customcases`}><ListGroupItem href="" active={`${path}/customcases` === pathname} header="Custom Cases">Check pictures for custom cases</ListGroupItem></Link>
                            <Link to={`${path}/premiumcases`}><ListGroupItem href="" active={`${path}/premiumcases` === pathname} header="Premium">Edit Premium Cases</ListGroupItem></Link>
                            <Link to={`${path}/settings`}><ListGroupItem href="" active={`${path}/settings` === pathname} header="Settings">Edit Harga Case/Nomor Rekening</ListGroupItem></Link>
                            <ListGroupItem href="" disabled header="Coming Soon">Pending Feature</ListGroupItem>
                        </ListGroup>
                    </div>
                    <div className="col-md-7">
                        <Route exact path={`${path}`} component={AdminOrdersTabs}/>
                        <Route path={`${path}/orders`} component={AdminOrdersTabs}/>
                        <Route path={`${path}/brands`} component={AdminCases}/>
                        <Route path={`${path}/catalogue`} component={AdminCatalogue}/>
                        <Route path={`${path}/catalogue`} component={AdminCatalogue}/>
                        <Route path={`${path}/settings`} component={AdminSettings}/>
                    </div>
                </div>
            </div>
            )
        }
        else{
            return(
                <Redirect to="/"/>
            )
        }
    }
    render(){
        return(
            this.renderDash()
        )
    }
}

const mapStateToProps = (state) => {

    return {}
}

export default withRouter(connect(mapStateToProps, {})(AdminDashboard))