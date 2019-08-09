/**
 * TODO: Header - Pull in dynamic data
 * TODO: Header - Style dynamic data dropdown
 */

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Button,
  Col,
  Row,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import Onboarding from '../../../onboarding';

import {
  getAccountEin,
  getAccountDetails,
  getSnowflakeBalance,
  getAccountHydroBalance,
  getAccountEthBalance,
} from '../../../../services/utilities';

import Identicon from '../../../identicon';
import HeaderDropdown from '../headerDropdown';

function HeaderAccount() {
  const web3 = useWeb3Context();

  const [ein, setEin] = useState('');
  const [hydroId, setHydroId] = useState('');
  const [isModalOpen, toggleModal] = useState(false);
  const [hasProvider, setProvider] = useState(false);
  const [networkId, setNetworkId] = useState();

  const [isHeaderDropdownOpen, toggleHeaderDropdown] = useState(false);
  const identiconRef = useRef();

  const [ethBalance, setEthBalance] = useState('0');
  const [hydroBalance, setHydroBalance] = useState('0');
  const [snowflakeBalance, setSnowflakeBalance] = useState('0');

  useEffect(() => {
    async function fetchData() {
      if (web3.active) {
        setNetworkId(web3.networkId);

        console.log('Web3 is active');

        if (ein === '' && web3.networkId === 4) {
          const fetchEin = await getAccountEin(web3.library, web3.account);

          if (fetchEin !== '') {
            setEin(fetchEin);

            const details = await getAccountDetails(web3.library, fetchEin);
            setHydroId(details.casedHydroID);

            const ethBalanceReq = await getAccountEthBalance(web3.library, web3.account);
            setEthBalance(ethBalanceReq);

            const snowflakeBalanceReq = await getSnowflakeBalance(web3.library, web3.account);
            setSnowflakeBalance(snowflakeBalanceReq);

            const hydroBalanceReq = await getAccountHydroBalance(web3.library, web3.account);
            const short = hydroBalanceReq.split('.');
            setHydroBalance(short[0]);
          } else {
            console.log('No ein');
          }
        }
      }
    }

    fetchData();
  }, [web3]);

  if (ein !== '') {
    return (
      <Row className="justify-content-center align-items-center no-gutters">
        <Col className="col-md-auto">
          <div className="header-account__wrapper">
            <span className="header-account__welcome">
              {`Welcome, ${hydroId}`}
            </span>
            <br />
            <span className="header-account__ein">
              {`Ein: ${ein}`}
            </span>
          </div>
        </Col>
        <Col>
          {identiconRef.current && web3.active && (
            <HeaderDropdown
              target={identiconRef}
              isOpen={isHeaderDropdownOpen}
              toggle={() => toggleHeaderDropdown(!isHeaderDropdownOpen)}
              address={web3.account}
              ethBalance={ethBalance}
              snowflakeBalance={snowflakeBalance}
              hydroBalance={hydroBalance}
            />
          )}
          {web3.active && (
            <div ref={identiconRef} className="header-account__identicon">
              <Identicon seed={ein} size={50} id="identicon" />
            </div>
          )}
        </Col>
      </Row>
    );
  }

  if (networkId !== 4) {
    return (
      <div className="onboardingButton">
        <Button color="warning">
          Wrong network
        </Button>
      </div>
    );
  }

  return (
    <div className="onboardingButton">
      <Onboarding
        hasProvider={hasProvider}
        networkId={networkId}
        isOpen={isModalOpen}
        toggle={() => toggleModal(!isModalOpen)}
      />
      <Button color="primary" onClick={() => toggleModal(!isModalOpen)}>
        Create Account
      </Button>
    </div>
  );
}


export default HeaderAccount;
