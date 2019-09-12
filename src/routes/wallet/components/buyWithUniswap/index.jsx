/**
 *  Displays the Buy Hydro component using Uniswap
 */

import React from 'react';
import {
  Row,
  Col,
  Card,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import tooltips from '../../../../common/config/tooltips.json';

import TransactionButton from '../../../../components/transactionButton';
import HelpButton from '../../../../components/helpButton';

import {
  buyWithUniswap,
  getHydroReserve,
  getHydroMarket,
  tradeEthForHydro,
  getHydroExchange,
} from '../../../../services/uniswap';

function BuyWithUniswap() {
  const web3 = useWeb3Context();

  return (
    <Card className="buy">
      <Row className="buy-uniswap__header">
        <Col xs="10">
          <p className="buy-uniswap__title mb-0">
            Buy and Deposit to dApp wallet
          </p>
        </Col>
        <Col xs="2" sm="2" className="text-right">
          <HelpButton
            content={tooltips.getHydroHelp}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p className="buy-uniswap__amount">
            10,000
            <span className="buy-uniswap__hydro">
              Hydro
            </span>
          </p>
          <p className="buy-uniswap__test-tokens">
            Get free Hydro test tokens
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center py-5">
        <Col className="text-center">
          <button type="button" onClick={() => getHydroExchange(web3.library, web3.account, web3.library.utils.toWei('0.01'))}>
            Get reserve
          </button>
          <TransactionButton
            initialText="Get Hydro Tokens"
            sendAction={() => getHydroReserve()}
            displayModal
          />
        </Col>
      </Row>
    </Card>
  );
}

export default BuyWithUniswap;
