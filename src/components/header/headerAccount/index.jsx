import React, { useState } from 'react';
import {
  Button,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import {
  useWeb3Context,
} from 'web3-react';

import {
  getAccountEin,
  getAccountDetails,
} from '../../../services/utilities';

function HeaderAccount() {
  const [hasEin, setHasEin] = useState(false);
  const [ein, setEin] = useState('');
  const [hydroId, setHydroId] = useState('');

  const web3 = useWeb3Context();

  if (web3.active) {
    if (!hasEin) {
      getAccountEin(web3.library, web3.account)
        .then((res) => {
          if (res !== '') {
            setHasEin(true);
            setEin(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (hasEin) {
      getAccountDetails(web3.library, ein)
        .then((details) => {
          setHydroId(details.casedHydroID);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  if (hasEin) {
    return (
      <div>
        <p>
          {`Welcome ${hydroId}`}
          Ein is: {ein}
        </p>
      </div>
    );
  }

  return (
    <Button color="primary" tag={RouterNavLink} exact to="/identity">
      Create Account
    </Button>
  );
}


export default HeaderAccount;
