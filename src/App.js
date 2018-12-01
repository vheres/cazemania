import React, { Component } from 'react';
import AdminDashboard from './components/AdminDashboard'
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import ShopPage from './components/ShopPage';
import CustomPage from './components/CustomPage';
import PremiumPage from './components/PremiumPage';
import DetailPage from './components/DetailPage';
import DetailPagePremium from './components/DetailPagePremium';
import InformationPage from './components/InformationPage';
import ResellerPage from './components/ResellerPage';
import PaymentPage from './components/PaymentPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import RegisterRD from './components/RegisterRD';
import LinkTree from './components/LinkTree';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { keepLogin, onLogout, cookieChecked } from './actions';
import { Route, withRouter, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './supports/css/bootstrap.css';
import './App.css';
import './supports/css/app.css';
import './supports/css/font-awesome.css';
import './supports/css/simple-line-icons.css';
import ReactPixel from 'react-facebook-pixel';

const cookies = new Cookies();

class App extends Component {  
  componentWillMount() {
    const theCookie = cookies.get('myCookie');
    if (theCookie !== undefined) {
      this.props.keepLogin(theCookie);
    }
    else {
      this.props.cookieChecked();
    }
    console.log(this.props.auth);
    ReactPixel.init('769774673361971', {}, { debug: true, autoConfig: false });
    ReactPixel.pageView(); 	
  }

  componentWillReceiveProps(newProps) {
    if(newProps.auth.email === "") {
      cookies.remove('myCookie');
    }
  }

  render() {
    if (this.props.auth.cookieCheck === true) {
      return (
        <Grid fluid className="no-margin no-padding">
          <Row>
            <Header />
          </Row>
          <Row>
            <Col xs={12} className="no-margin no-padding">
              <Route exact path="/" component={HomePage}/>
              <Route path="/links" component={LinkTree}/>
              <Route path="/shop" component={ShopPage}/>
              <Route path="/custom" component={CustomPage}/>
              <Route path="/premium_cases" component={PremiumPage}/>
              <Route path="/product" component={DetailPage}/>
              <Route path="/premium" component={DetailPagePremium}/>
              <Route path="/information" component={InformationPage}/>
              <Route path="/payment" component={PaymentPage}/>
              <Route path="/reseller-dropshipper" component={ResellerPage}/>
              <Switch>
                <Route path="/admin/dashboard" component={AdminDashboard}/>
              </Switch>
              <Route path="/profile" component={ProfilePage}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
              <Route path="/register_reseller_dropshipper" component={RegisterRD}/>
            </Col>
          </Row>
          <Row className="no-margin no-padding">
            <Footer />
          </Row>
          <Row>   
          </Row>
        </Grid>
      );
    }
    else {
      return <div className="general-title-blue text-center">Authentication Checking</div>
    }
    
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;

  return { auth };
}

export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(App));
