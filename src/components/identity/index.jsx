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
  FormText,
  FormGroup,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';
import {
  IoIosHelpCircleOutline,
  IoMdLink,
} from 'react-icons/io';

import {
  getAccountEin,
  getAccountDetails,
  getIdentity,
} from '../../services/utilities';

import LinkedAddress from './linkedAddress';

import userImg from '../../common/img/snowflake.gif';
import ethLogo from '../../common/img/eth.png';

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
      <Row className="py-3 justify-content-center align-items-center">
        <Col>
          <Card className="identity">
            <Row className="p-3">
              <Col>
                <p className="identity__title">
                  Your Snowflake (EIN)
                </p>
              </Col>
              <Col className="text-right">
                <IoIosHelpCircleOutline
                  className="identity__help help"
                />
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center pb-4">
              <Col xs="4">
                <p className="identity__user-image">
                  <img src={userImg} alt="user" />
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
                  Linked Wallet(s): 1
                </p>
              </Col>
            </Row>
            <Row className="mb-4 no-gutters status">
              <Col>
                <Row>
                  <Col>
                    <p className="status__title">
                      My Status:
                    </p>
                  </Col>
                  <Col>
                    <Button className="status__edit">
                      Edit
                    </Button>
                  </Col>
                </Row>
                <p className="status__current">
                  I'm having a great day!
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col sm="1">
          <IoMdLink
            className="identity__link"
          />
        </Col>
        <Col>
          <Card className="link">
            <Row className="p-3">
              <Col>
                <p className="link__title">
                  Link an Ethereum Wallet
                </p>
              </Col>
              <Col className="text-right">
                <IoIosHelpCircleOutline
                  className="link__help help"
                />
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center">
              <Col sm="2">
                <img src={ethLogo} alt="Eth" />
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    className="link__input"
                    placeholder="Enter an Ethereum address..."
                  />
                  <FormText>
                    You will need to transact from this address.
                  </FormText>
                </FormGroup>
              </Col>
            </Row>
            <Row className="pt-3">
              <Col className="text-center">
                <Button color="primary">
                  Next
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <h3 className="title">
            Ethereum Wallets Connected To Your Snowflake (EIN)
          </h3>
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
