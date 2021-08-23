import React, { StrictMode, Suspense, } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import "./common/i18next";
import configureStore from './redux/store';

import './styles/index.css'
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';


const history = createBrowserHistory();
const store = configureStore(history);


ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <Suspense fallback='loading'>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
