import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link, Redirect, Route, withRouter} from 'react-router-dom'
import AdminOrders from './AdminOrders'
import AdminCatalogue from './AdminCatalogue'
import AdminCases from './AdminCases';

class AdminDashboard extends Component {

    renderDash(){
        const { pathname } = this.props.location
        const { path } = this.props.match
        if(true){
            return(
            <div className="container-fluid margin-top-15">
                <div className="row">
                    <div className="col-md-offset-1 col-md-2">
                        <ListGroup>
                            <Link to={`${path}/orders`}><ListGroupItem href="" active={`${path}/orders` === pathname} header="Orders">Lihat semua order</ListGroupItem></Link>
                            <Link to={`${path}/brands`}><ListGroupItem href="" active={`${path}/brands` === pathname} header="Brand">Lihat semua Brand/Tipe HP yang dijual</ListGroupItem></Link>
                            <Link to={`${path}/catalogue`}><ListGroupItem href="" active={`${path}/catalogue` === pathname} header="Catalogue">Ubah catalogue case tipe normal</ListGroupItem></Link>
                            <Link to={`${path}/customcases`}><ListGroupItem href="" active={`${path}/customcases` === pathname} header="Custom Cases">Check pictures for custom cases</ListGroupItem></Link>
                            <Link to={`${path}/premiumcases`}><ListGroupItem href="" active={`${path}/premiumcases` === pathname} header="Premium">Edit Premium Cases</ListGroupItem></Link>
                            <ListGroupItem href="" disabled header="Coming Soon">Pending Feature</ListGroupItem>
                        </ListGroup>
                    </div>
                    <div className="col-md-7">
                        <Route path={`${path}/orders`} component={AdminOrders}/>
                        <Route path={`${path}/brands`} component={AdminCases}/>
                        <Route path={`${path}/catalogue`} component={AdminCatalogue}/>
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