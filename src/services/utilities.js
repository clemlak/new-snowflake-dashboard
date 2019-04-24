import hydro from './contracts/hydro';
import identityRegistry from './contracts/identityRegistry';
import clientRaindrop from './contracts/clientRaindrop';

function getAccountEthBalance(lib, address) {
  return lib.eth.getBalance(address)
    .then(balance => lib.utils.fromWei(balance))
    .catch(err => err);
}

function getAccountHydroBalance(lib, address) {
  const hydroContract = new lib.eth.Contract(hydro.abi, hydro.address);

  return hydroContract.methods.balanceOf(address).call()
    .then(balance => lib.utils.fromWei(balance))
    .catch(err => err);
}

function getAccountEin(lib, address) {
  const identityRegistryContract = new lib.eth.Contract(
    identityRegistry.abi,
    identityRegistry.address,
  );

  return identityRegistryContract.methods.getEIN(address).call()
    .then((ein) => {
      if (ein === '3963877391197344453575983046348115674221700746820753546331534351508065746944') {
        // throw new Error('No ein');
        return '';
      }

      return ein;
    })
    .catch(err => err);
}

function getAccountDetails(lib, ein) {
  const clientRaindropContract = new lib.eth.Contract(
    clientRaindrop.abi,
    clientRaindrop.address,
  );

  return clientRaindropContract.methods.getDetails(ein).call()
    .then(details => details)
    .catch(err => err);
}

export {
  getAccountEthBalance,
  getAccountHydroBalance,
  getAccountEin,
  getAccountDetails,
};
