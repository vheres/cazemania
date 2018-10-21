import React, { Component } from 'react';
import Admin from './components/Admin'
import AdminOrders from './components/AdminOrders'
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import ShopPage from './components/ShopPage';
import PremiumPage from './components/PremiumPage';
import CartPage from './components/CartPage';
import DetailPage from './components/DetailPage';
import InformationPage from './components/InformationPage';
import ResellerPage from './components/ResellerPage';
import PaymentPage from './components/PaymentPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
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
  }

  componentWillReceiveProps(newProps) {
    if(newProps.auth.email === "") {
      cookies.remove('myCookie');
    }
  }

  render() {
    if (this.props.auth.cookieCheck === true) {
      return (
        <Grid fluid>
          <Row>
            <Header />
          </Row>
          <Row>
            <Col xs={12} >
              <Route exact path="/" component={HomePage}/>
              <Route path="/shop" component={ShopPage}/>
              <Route path="/premium_cases" component={PremiumPage}/>
              <Route path="/cart" component={CartPage}/>
              <Route path="/product" component={DetailPage}/>
              <Route path="/information" component={InformationPage}/>
              <Route path="/payment" component={PaymentPage}/>
              <Route path="/reseller-dropshipper" component={ResellerPage}/>
              <Switch>
                <Route path="/admin/:table" component={Admin}/>
                <Route path="/admin" component={AdminOrders}/>
              </Switch>
              <Route path="/profile" component={ProfilePage}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
            </Col>
          </Row>
          <Row>
            <Footer />
          </Row>
          <Row>
              
          </Row>
        </Grid>
      );
    }
    else {
      return <div>Authentication Checking</div>
    }
    
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;

  return { auth };
}

export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(App));
