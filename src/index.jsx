import React from 'react';
import ReactDOM from 'react-dom';

import './common/style/index.scss';
import i18n from './common/languages/i18n';

import App from './components/app/App';
import Web3Wrapper from './components/web3Wrapper/Web3Wrapper';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
