/**
 * Displays a transaction
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Alert,
} from 'reactstrap';
import {
  IoIosAdd,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
} from 'react-icons/io';

function Transaction(props) {
  const {
    type,
    date,
    amount,
  } = props;

  const formattedDate = new Date(date);

  function displayTransactionType() {
    if (type === 'deposit') {
      return (
        <div className="transaction__header">
          <IoIosArrowRoundForward
            className="transaction__icon"
          />
          <p className="transaction__type">
            Deposited Hydro
          </p>
        </div>
      );
    }

    if (type === 'withdrawal') {
      return (
        <div className="transaction__header">
          <IoIosArrowRoundBack
            className="transaction__icon"
          />
          <p className="transaction__type">
            Withdrew Hydro
          </p>
        </div>
      );
    }

    return (
      <div className="transaction__header">
        <IoIosAdd
          className="transaction__icon"
        />
        <p className="transaction__type">
          Purchased Hydro
        </p>
      </div>
    );
  }

  return (
    <Alert className="transaction">
      <Row className="align-items-center">
        <Col>
          {displayTransactionType()}
          <p className="transaction__date">
            {formattedDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </Col>
        <Col>
          <p className="transaction__amount">
            {type === 'withdraw' ? ('-') : ('+')}
            {' '}
            {amount}
          </p>
        </Col>
      </Row>
    </Alert>
  );
}

Transaction.propTypes = {
  type: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
};

export default Transaction;
