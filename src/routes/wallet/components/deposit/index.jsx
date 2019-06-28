/**
 * Displays a form to deposit tokens to the current Snowflake balance
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
  depositTokens,
} from '../../../../services/utilities';

import TransactionButton from '../../../../components/transactionButton';

function Deposit(props) {
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
          <p className="deposit__subtitle">
            From
          </p>
        </Col>
        <Col sm="2" />
        <Col sm="5">
          <p className="deposit__subtitle">
            To
          </p>
        </Col>
      </Row>

      <Row className="mx-4 justify-content-center align-items-center no-gutters">
        <Col sm="5" className="deposit__from">
          <Row className="justify-content-center align-items-center">
            <Col xs="8">
              <div>
                <FormGroup className="deposit__form-group">
                  <Input
                    type="number"
                    className="deposit__input"
                    placeholder="0"
                    onChange={e => setAmount(e.target.value)}
                    value={amount}
                  />
                  <FormText
                    className="deposit__form-text"
                  >
                    {`${user.substring(0, 12)}...`}
                  </FormText>
                </FormGroup>
              </div>
            </Col>
            <Col className="text-center" xs="4">
              <Button
                size="sm"
                onClick={() => setAmount(hydroBalance)}
                className="deposit__max-button"
              >
                Max
              </Button>
            </Col>
          </Row>
        </Col>

        <Col sm="2" className="text-center">
          <IoIosArrowRoundForward className="deposit__arrow" />
        </Col>

        <Col sm="5">
          <div className="deposit__to">
            <p className="deposit__balance">
              {snowflakeBalance.substring(0, 5)}
            </p>
            <p className="deposit__to-small-text">
              dApp Store Wallet
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
            initialText="Confirm"
            sendAction={() => depositTokens(
              web3.library,
              web3.account,
              amount.toString(),
            )}
            onConfirmationAction={cancel}
          />
        </Col>
      </Row>
    </div>
  );
}

Deposit.propTypes = {
  snowflakeBalance: PropTypes.string.isRequired,
  hydroBalance: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default Deposit;
