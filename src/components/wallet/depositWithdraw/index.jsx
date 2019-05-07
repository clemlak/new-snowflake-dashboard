import React, { useState } from 'react';
import {
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

import {
  getSnowflakeBalance,
  withdrawSnowflakeBalance,
} from '../../../services/utilities';

import Deposit from './deposit';

function DepositWithdraw() {
  const [snowflakeBalance, setSnowflakeBalance] = useState('0');
  const [tab, setTab] = useState('none');

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

  function displayTab() {
    if (tab === 'deposit') {
      return <Deposit balance={snowflakeBalance} cancel={() => setTab('none')} />;
    }

    return (
      <div>
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
            <Button className="btn-white" onClick={() => setTab('deposit')}>
              Deposit
            </Button>
          </Col>
          <Col className="text-left" sm="6" xs="12">
            <Button color="success" onClick={() => withdrawSnowflakeBalance(web3.library, web3.account, '10')}>
              Withdraw
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return (
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
      {displayTab()}
    </Card>
  );
}

export default DepositWithdraw;
