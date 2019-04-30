/**
 * Displays tools to manage the identity of the current user
 */

import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Input,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';
import {
  IoMdHelpCircleOutline,
  IoMdLink,
} from 'react-icons/io';

import {
  getAccountEin,
  getAccountDetails,
  getIdentity,
} from '../../services/utilities';

import LinkedAddress from './linkedAddress';

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
      <Row>
        <Col>
          <h1>Manage your identity</h1>
          <p>Add/Remove Ethereum Wallet Addresses to your EIN</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="blue-card">
            <Row className="p-3">
              <Col>
                <p>Your Snowflake (EIN)</p>
              </Col>
              <Col className="text-right">
                <IoMdHelpCircleOutline />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <ul>
                  <li>
                    Hydro ID: {hydroId}
                  </li>
                  <li>
                    EIN: {ein}
                  </li>
                  <li>
                    Linked Wallet(s): 1
                  </li>
                </ul>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col sm="1">
          <IoMdLink />
        </Col>
        <Col>
          <Card className="grey-card">
            <Row className="py-3">
              <Col>
                <p>
                  Link an Ethereum Wallet
                </p>
              </Col>
              <Col className="text-right">
                <IoMdHelpCircleOutline />
              </Col>
            </Row>
            <Row>
              <Col sm="2">
                ETH
              </Col>
              <Col>
                <Input />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button color="primary">
                  Next
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>
            Ethereum Wallets Connected To Your Snowflake (EIN)
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {addresses.map(address => (
            <LinkedAddress
              key={address}
              address={address}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Identity;
