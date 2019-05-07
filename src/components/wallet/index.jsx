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
  IoIosHelpCircleOutline,
} from 'react-icons/io';
import {
  useWeb3Context,
} from 'web3-react';

import Transactions from './transactions';
import TransactionButton from '../transactionButton';
import DepositWithdraw from './depositWithdraw';

import {
  getHydroTestTokens,
} from '../../services/utilities';

function Wallet() {
  const web3 = useWeb3Context();

  return (
    <Container>
      <Row>
        <Col>
          <DepositWithdraw />
        </Col>
        <Col>
          <Card className="buy">
            <Row className="p-3">
              <Col>
                <p className="buy__title">
                  Buy and Deposit to dApp wallet
                </p>
              </Col>
              <Col sm="2" className="text-right">
                <IoIosHelpCircleOutline
                  className="buy__help help"
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
                  text="Get Hydro tokens"
                  send={() => getHydroTestTokens(web3.library, web3.account)}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Transactions />
        </Col>
      </Row>
    </Container>
  );
}

export default Wallet;
