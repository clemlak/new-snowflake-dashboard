import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import Welcome from '../../../common/img/steps/welcome.png';

function WelcomeStep() {
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <img src={Welcome} alt="welcome" className="img-fluid" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <h1 className="text-white">
            Welcome
          </h1>
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
            Let's get started
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default WelcomeStep;
