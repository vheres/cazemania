import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './supports/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import ScrollToTop from './components/ScrollToTop';
import HttpsRedirect from 'react-https-redirect';

const store = createStore(reducers, {},  applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop>
                <HttpsRedirect>
                    <App/>
                </HttpsRedirect>
            </ScrollToTop>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
