import hydro from './contracts/hydro';
import identityRegistry from './contracts/identityRegistry';
import clientRaindrop from './contracts/clientRaindrop';
import oldClientRaindrop from './contracts/oldClientRaindrop';
import snowflake from './contracts/snowflake';

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
        /* TODO: Return an error if no ein is found */
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

function isHydroIdAvailable(lib, hydroId) {
  const clientRaindropContract = new lib.eth.Contract(
    clientRaindrop.abi,
    clientRaindrop.address,
  );

  return clientRaindropContract.methods.hydroIDAvailable(hydroId).call()
    .then(result => result)
    .catch(err => err);
}

function isHydroIdReserved(lib, hydroId) {
  const oldClientRaindropContract = new lib.eth.Contract(
    oldClientRaindrop.abi,
    oldClientRaindrop.address,
  );

  /* TODO: This function must use getUserByName instead of hydroIDAvailable */
  return oldClientRaindropContract.methods.hydroIDAvailable(hydroId).call()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createSignedMessage(lib, address, timestamp) {
  const signature = lib.utils.soliditySha3(
    '0x19', '0x00', identityRegistry.address,
    'I authorize the creation of an Identity on my behalf.',
    address,
    address, {
      t: 'address[]',
      v: [snowflake.address],
    }, {
      t: 'address[]',
      v: [],
    },
    timestamp,
  );

  return signature;
}

function signPersonal(lib, address, message) {
  return new Promise((resolve, reject) => {
    lib.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [
        address,
        message,
      ],
      address,
    },
    (err, result) => {
      if (err) {
        return reject(err);
      }

      const signature = result.result.substring(2);
      const r = "0x" + signature.substring(0, 64);
      const s = "0x" + signature.substring(64, 128);
      const v = parseInt(signature.substring(128, 130), 16);

      const signatureObject = {};

      signatureObject.r = r;
      signatureObject.s = s;
      signatureObject.v = v;
      signatureObject.from = address;

      return resolve(signatureObject);
    });
  });
}

function createIdentity(lib, hydroId, timestamp, signature) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  return snowflakeContract.methods.createIdentityDelegated(
    signature.from, signature.from, [], hydroId, signature.v, signature.r, signature.s, timestamp,
  ).send({
    from: signature.from,
  })
    .then(result => result)
    .catch(err => err);
}

export {
  getAccountEthBalance,
  getAccountHydroBalance,
  getAccountEin,
  getAccountDetails,
  isHydroIdAvailable,
  isHydroIdReserved,
  createSignedMessage,
  signPersonal,
  createIdentity,
};
