import React from 'react';
import Web3Provider from 'web3-react';
import connectors from './connectors';

const Web3Wrapper = () => (
  <Web3Provider
    connectors={connectors}
    libraryName="web3.js"
  >
    <h1>Hello</h1>
  </Web3Provider>
);

export default Web3Wrapper;
