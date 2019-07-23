import {
  Connectors,
} from 'web3-react';
import {
  Bitski,
} from 'bitski';

const {
  Connector,
} = Connectors;

class BitskiConnector extends Connector {
  constructor(clientId) {
    super();
    this.bitski = new Bitski(clientId, '/callback.html');
  }

  async onActivation() {
    await this.bitski.signIn();
  }

  getProvider() {
    return this.bitski.getProvider();
  }
}

export default BitskiConnector;
