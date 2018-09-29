import React, { Component } from 'react';
import Admin from './components/Admin'
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { keepLogin, onLogout, cookieChecked } from './actions';
import { Route, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './supports/css/bootstrap.css';
import './App.css';
import './supports/css/app.css';


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
    if(newProps.auth.username === "") {
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
              <Route exact path="/Admin" component={Admin}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
            </Col>
          </Row>
          <Row>
            <Footer />
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
