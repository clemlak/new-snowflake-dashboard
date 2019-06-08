/**
 * Displays tools to manage the identity of the current user
 * TODO: Identity - Fix the col width and center the elements
 */

import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';
import {
  IoMdLink,
} from 'react-icons/io';

import {
  getAccountEin,
  getAccountDetails,
  getIdentity,
} from '../../services/utilities';

import Identicon from '../identicon';

import LinkedAddress from './linkedAddress';
import LinkAddressCard from './linkAddressCard';
import HelpButton from '../helpButton';
import StatusWidget from './statusWidget';

import tooltips from '../../common/config/tooltips.json';

const Identity = () => {
  const web3 = useWeb3Context();
  const [ein, setEin] = useState('');
  const [hydroId, setHydroId] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  if (web3.active && loading) {
    getAccountEin(web3.library, web3.account)
      .then((res) => {
        if (res !== '') {
          setEin(res);
        }

        return getAccountDetails(web3.library, ein);
      })
      .then((details) => {
        setHydroId(details.casedHydroID);

        return getIdentity(web3.library, web3.account);
      })
      .then((identity) => {
        setAddresses(identity.associatedAddresses);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Row className="pb-3">
        <Col>
          <h3 className="title">
            Manage your Identity
          </h3>
          <h4 className="subtitle">
            Add/Remove Ethereum Wallet Addresses to your EIN
          </h4>
        </Col>
      </Row>
      <Row className="py-3 justify-content-center align-items-center fadeit">
        <Col sm="12" md="12" lg="12" xl="5">
          <Card className="identity">
            <Row className="p-3">
              <Col>
                <p className="identity__title">
                  Your Snowflake (EIN)
                </p>
              </Col>
              <Col xs="4" className="text-right">
                <HelpButton
                  content={tooltips.getHydroHelp}
                />
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center pb-4">
              <Col xs="4">
                <p className="identity__user-image">
                  {web3.active && (
                    <Identicon seed={ein} />
                  )}
                </p>
              </Col>
              <Col>
                <p className="identity__hydro-id">
                  Hydro ID:
                  {' '}
                  {hydroId}
                </p>
                <p className="identity__ein">
                  EIN:
                  {' '}
                  {ein}
                </p>
                <p className="identity__linked-wallets">
                  {`Linked Wallet(s): ${addresses.length}`}
                </p>
              </Col>
            </Row>
            <StatusWidget />
          </Card>
        </Col>
        <Col sm="12" md="12" lg="12" xl="1" className="text-center">
          <IoMdLink
            className="identity__link"
          />
        </Col>
        <Col sm="12" md="12" lg="12" xl="5">
          <LinkAddressCard />
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <h3 className="identity__connected-wallet-title">
            Ethereum Wallets Connected To Your Snowflake (EIN)
          </h3>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12" lg="12" xl="12">
          {addresses.map(address => (
            <LinkedAddress
              key={address}
              address={address}
              notRemovable={address === web3.account}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Identity;
