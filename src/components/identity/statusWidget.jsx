import React, { useState } from 'react';
import {
  useWeb3Context,
} from 'web3-react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import DappPreview from '../dappPreview';

import {
  getStatus,
} from '../../services/utilities';

function StatusWidget() {
  const [status, setStatus] = useState('');

  const web3 = useWeb3Context();

  if (web3.active) {
    getStatus(web3.library, web3.account)
      .then((res) => {
        setStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Row className="mb-4 no-gutters status">
      <Col>
        <Row>
          <Col>
            <p className="status__title">
              My Status:
            </p>
          </Col>
          <Col>
            <Button className="status__edit">
              Edit
            </Button>
          </Col>
        </Row>
        <p className="status__current">
          {status !== '' ? (
            status
          ) : (
            'No status yet!'
          )}
        </p>
      </Col>
    </Row>
  );
}

export default StatusWidget;
