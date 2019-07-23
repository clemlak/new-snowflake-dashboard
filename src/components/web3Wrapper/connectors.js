import {
  Connectors,
} from 'web3-react';

import BitskiConnector from './bitskiConnector';

const { InjectedConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [4] });

const connectors = { MetaMask, BitskiConnector };

export default connectors;
