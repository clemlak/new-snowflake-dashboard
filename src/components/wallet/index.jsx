import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
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

import {
  getHydroTestTokens,
  getSnowflakeBalance,
  depositTokens,
  withdrawSnowflakeBalance,
} from '../../services/utilities';

function Wallet() {
  const [snowflakeBalance, setSnowflakeBalance] = useState('0');

  const web3 = useWeb3Context();

  if (web3.active) {
    getSnowflakeBalance(web3.library, web3.account)
      .then((res) => {
        setSnowflakeBalance(web3.library.utils.fromWei(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card className="wallet">
            <Row className="p-3">
              <Col>
                <p className="wallet__title">
                  Your dApp Store Wallet
                </p>
              </Col>
              <Col sm="2" className="text-right">
                <IoIosHelpCircleOutline
                  className="wallet__help"
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <p className="wallet__balance mb-0">
                  {snowflakeBalance.substring(0, 5)}
                  <span className="wallet__hydro">
                    Hydro
                  </span>
                </p>
                <p className="wallet__usd small">
                  USD $340.00
                </p>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center py-5">
              <Col className="text-right" sm="6" xs="12">
                <Button className="btn-white" onClick={() => depositTokens(web3.library, web3.account, '10')}>
                  Deposit
                </Button>
              </Col>
              <Col className="text-left" sm="6" xs="12">
                <Button color="success" onClick={() => withdrawSnowflakeBalance(web3.library, web3.account, '10')}>
                  Withdraw
                </Button>
              </Col>
            </Row>
          </Card>
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
                  className="buy__help"
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
};

export default Wallet;
