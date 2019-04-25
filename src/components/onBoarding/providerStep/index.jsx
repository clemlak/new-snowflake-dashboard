import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import MetaMaskFox from '../../../common/img/metamask-fox.svg';

function ProviderStep() {
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" sm="4" className="text-center">
          <img src={MetaMaskFox} alt="MetaMask Logo" />
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="8" className="text-center">
          <p className="text-white">
            To interact with Snowflake and the Hydro dApp store you must install MetaMask (a wallet for your browser) and have a balance of Ethereum in it. Once you install it this message will go away and you can proceed.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="10" className="text-center">
          <Button className="btn-white">
            Install MetaMask
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ProviderStep;
