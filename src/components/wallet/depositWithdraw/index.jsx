/**
 * Displays the card with the Deposit and Withdraw components
 */

import React, {
  useState,
  useRef,
} from 'react';
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
  getAccountHydroBalance,
} from '../../../services/utilities';

import Deposit from './deposit';
import Withdraw from './withdraw';
import Tooltip from '../../tooltip';

import tooltips from '../../../common/config/tooltips.json';

function DepositWithdraw() {
  const [snowflakeBalance, setSnowflakeBalance] = useState('0');
  const [hydroBalance, setHydroBalance] = useState('0');
  const [tab, setTab] = useState('none');
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const web3 = useWeb3Context();

  const walletHelpRef = useRef();

  if (web3.active) {
    getSnowflakeBalance(web3.library, web3.account)
      .then((res) => {
        setSnowflakeBalance(web3.library.utils.fromWei(res));

        return getAccountHydroBalance(web3.library, web3.account);
      })
      .then((res) => {
        setHydroBalance(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function displayTab() {
    if (tab === 'deposit') {
      return (
        <Deposit
          balance={snowflakeBalance}
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
            <Button color="success" onClick={() => setTab('withdraw')}>
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
          <div className="text-center" ref={walletHelpRef}>
            <IoIosHelpCircleOutline
              className="wallet__help help"
            />
          </div>
          {walletHelpRef.current && (
            <Tooltip
              target={walletHelpRef}
              content={tooltips.walletHelp}
              isOpen={isTooltipOpen}
              toggle={() => setIsTooltipOpen(!isTooltipOpen)}
            />
          )}
        </Col>
      </Row>
      {displayTab()}
    </Card>
  );
}

export default DepositWithdraw;
