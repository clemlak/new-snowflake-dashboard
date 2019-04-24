import React from 'react';
import {
  Row,
  Col,
  Alert,
} from 'reactstrap';

const Transaction = () => (
  <Alert className="transaction">
    <Row className="align-items-center">
      <Col>
        <p className="mb-0">
          Depositing Hydro
        </p>
        <p className="small mb-0">
          Feb 12, 2019 at 6:34pm
        </p>
      </Col>
      <Col className="text-right">
        <p className="mb-0 text-primary">
          + 3,225
        </p>
      </Col>
    </Row>
  </Alert>
);

export default Transaction;
