/**
 * Displays a form to withdraw tokens from the current Snowflake balance
 * TODO: Fix Max button
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
  Input,
  FormGroup,
  FormText,
} from 'reactstrap';
import {
  IoIosArrowRoundForward,
} from 'react-icons/io';
import {
  useWeb3Context,
} from 'web3-react';

import {
  withdrawSnowflakeBalance,
} from '../../../services/utilities';

import TransactionButton from '../../transactionButton';

function Withdraw(props) {
  const {
    user,
    hydroBalance,
    snowflakeBalance,
    cancel,
  } = props;

  const [amount, setAmount] = useState(0);

  const web3 = useWeb3Context();

  return (
    <div>
      <Row className="mx-4 justify-content-center align-items-center no-gutters">
        <Col sm="5">
          <p className="dw__subtitle">
            From
          </p>
        </Col>
        <Col sm="2" />
        <Col sm="5">
          <p className="dw__subtitle">
            To
          </p>
        </Col>
      </Row>
      <Row className="mx-4 justify-content-center align-items-center no-gutters">
        <Col sm="5">
          <div className="dw__from">
            <FormGroup className="dw__form-group">
              <Input
                type="number"
                className="dw__input"
                placeholder="0"
                onChange={e => setAmount(e.target.value)}
                value={amount}
              />
              <FormText
                className="dw__form-text"
              >
                dApp Store Wallet
                <Button
                  size="sm"
                  onClick={() => setAmount(snowflakeBalance)}
                >
                  Max
                </Button>
              </FormText>
            </FormGroup>
          </div>
        </Col>
        <Col sm="2" className="text-center">
          <IoIosArrowRoundForward className="dw__arrow" />
        </Col>
        <Col sm="5">
          <div className="dw__to">
            <p className="dw__balance">
              {hydroBalance.substring(0, 5)}
            </p>
            <p className="dw__to-small-text">
              {user}
            </p>
          </div>
        </Col>
      </Row>
      <Row className="pt-5 mx-4 justify-content-center align-items-center no-gutters">
        <Col className="text-left">
          <Button onClick={cancel}>
            Cancel
          </Button>
        </Col>
        <Col className="text-right">
          <TransactionButton
            color="success"
            text="Confirm"
            send={() => withdrawSnowflakeBalance(web3.library, web3.account, amount)}
            finalAction={cancel}
          />
        </Col>
      </Row>
    </div>
  );
}

Withdraw.propTypes = {
  hydroBalance: PropTypes.string.isRequired,
  snowflakeBalance: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default Withdraw;
