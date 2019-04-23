import React from 'react';
import {
  useWeb3Context,
} from 'web3-react';

import ProviderErrorHandler from '../web3Wrapper/providerErrorHandler';

const Identity = () => {
  const web3 = useWeb3Context();

  if (web3.error) {
    return (
      <ProviderErrorHandler />
    );
  }

  return (
    <h1>Manage your identity</h1>
  );
};

export default Identity;
