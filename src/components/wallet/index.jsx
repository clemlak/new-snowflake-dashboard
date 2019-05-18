/**
 * Displays the Wallet page
 */

import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import Transactions from './transactions';
import TransactionButton from '../transactionButton';
import DepositWithdraw from './depositWithdraw';
import HelpButton from '../helpButton';

import tooltips from '../../common/config/tooltips.json';

import {
  getHydroTestTokens,
} from '../../services/utilities';

function Wallet() {
  const web3 = useWeb3Context();

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="title">
            Your Wallet
          </h1>
        </Col>
      </Row>
      <Row className="wallet__row fadeit">
        <Col sm="12" md="12" lg="12" xl="6">
          <DepositWithdraw/>
        </Col>
        <Col>
          <Card className="buy">
            <Row className="p-3">
              <Col xs="8" sm="8" med="8" lg="8" xl="8">
                <p className="buy__title">
                  Buy and Deposit to dApp wallet
                </p>
              </Col>
              <Col xs="4" sm="4" med="4" lg="4" xl="4" className="text-right">
                <HelpButton
                  content={tooltips.getHydroHelp}
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <p className="buy__amount">
                  10 000
                  <span className="buy__hydro">
                    Hydro
                  </span>
                </p>
                <p className="buy-hydro__test-tokens">
                  Get free Hydro test tokens
                </p>
              </Col>
            </Row>
            <Row className="justify-content-center py-5">
              <Col className="text-center">
                <TransactionButton
                  initialText="Get Hydro Tokens"
                  sendAction={() => getHydroTestTokens(web3.library, web3.account)}
                  displayModal
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="nopadding">
          <Transactions />
        </Col>
      </Row>
    </Container>
  );
}

export default Wallet;
