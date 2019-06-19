import React from 'react';
import Web3Provider from 'web3-react';
import connectors from './connectors';

import App from '../app';

const Web3Wrapper = () => (
  <Web3Provider
    connectors={connectors}
    libraryName="web3.js"
  >
    <App />
  </Web3Provider>
);

export default Web3Wrapper;
