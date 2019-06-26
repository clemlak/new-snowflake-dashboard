/**
 * Displays the card with the Deposit and Withdraw components
 */

import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';
import numeral from 'numeral';

import {
  getSnowflakeBalance,
  getAccountHydroBalance,
} from '../../../../services/utilities';
import {
  getBalanceUsd,
} from '../../../../services/hydroPrice';

import Deposit from '../deposit';
import Withdraw from '../withdraw';

import HelpButton from '../../../../components/helpButton';

import tooltips from '../../../../common/config/tooltips.json';

function DepositWithdraw() {
  const [snowflakeBalance, setSnowflakeBalance] = useState('0');
  const [usdValue, setUsdValue] = useState(0);
  const [hydroBalance, setHydroBalance] = useState('0');
  const [tab, setTab] = useState('none');

  const web3 = useWeb3Context();

  if (web3.active) {
    getSnowflakeBalance(web3.library, web3.account)
      .then((res) => {
        setSnowflakeBalance(web3.library.utils.fromWei(res));

        return getAccountHydroBalance(web3.library, web3.account);
      })
      .then((res) => {
        setHydroBalance(res);

        return getBalanceUsd(web3.library, snowflakeBalance);
      })
      .then((res) => {
        setUsdValue(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function displayTab() {
    if (tab === 'deposit') {
      return (
        <Deposit
          snowflakeBalance={snowflakeBalance}
          hydroBalance={hydroBalance}
          cancel={() => setTab('none')}
          user={web3.account}
        />
      );
    }

    if (tab === 'withdraw') {
      return (
        <Withdraw
          snowflakeBalance={snowflakeBalance}
          hydroBalance={hydroBalance}
          cancel={() => setTab('none')}
          user={web3.account}
        />
      );
    }

    return (
      <div>
        <Row>
          <Col className="text-center">
            <p className="deposit-withdraw__balance mb-0">
              {numeral(snowflakeBalance).format('0,0')}
              <span className="deposit-withdraw__hydro">
                Hydro
              </span>
            </p>
            <p className="deposit-withdraw__usd small">
              {`${usdValue.toString().substring(0, 5)} USD`}
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center py-5">
          <Col className="text-right center" sm="12" xs="12" med="6" lg="6" xl="6">
            <Button className="btn-white deposit-withdraw__deposit-button" onClick={() => setTab('deposit')}>
              Deposit
            </Button>
          </Col>
          <Col className="text-left center" sm="12" xs="12" med="6" lg="6" xl="6">
            <Button color="success deposit-withdraw__withdraw-button" onClick={() => setTab('withdraw')}>
              Withdraw
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Card className="deposit-withdraw">
      <Row className="deposit-withdraw__header">
        <Col xs="10">
          <p className="deposit-withdraw__title mb-0">
            Your dApp Store Wallet
          </p>
        </Col>
        <Col xs="2" sm="2" className="text-right">
          <HelpButton
            content={tooltips.walletHelp}
          />
        </Col>
      </Row>
      {displayTab()}
    </Card>
  );
}

export default DepositWithdraw;
