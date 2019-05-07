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
} from '../../../services/utilities';

function Deposit(props) {
  const {
    balance,
    cancel,
  } = props;

  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState('');

  const web3 = useWeb3Context();

  if (web3.active && user === '') {
    setUser(web3.account);
  }

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
        <Col sm="5">
          <div className="deposit__from">
            <FormGroup className="deposit__form-group">
              <Input
                type="number"
                className="deposit__input"
                placeholder="0"
                onChange={e => setAmount(e.target.value)}
              />
              <FormText
                className="deposit__form-text"
              >
                {user}
              </FormText>
            </FormGroup>
          </div>
        </Col>
        <Col sm="2" className="text-center">
          <IoIosArrowRoundForward className="deposit__arrow" />
        </Col>
        <Col sm="5">
          <div className="deposit__to">
            <p className="deposit__balance">
              {balance.substring(0, 5)}
            </p>
            <p className="deposit__snowflake-wallet">
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
          <Button
            color="success"
            onClick={() => depositTokens(web3.library, web3.account, amount)}
          >
            Confirm
          </Button>
        </Col>
      </Row>
    </div>
  );
}

Deposit.propTypes = {
  balance: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default Deposit;
