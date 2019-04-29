import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';
import DappPreview from '../dappPreview';

function Featured() {
  return (
    <div>
      <h1>
        Featured
      </h1>
      <p>dApps Chosen Based on Demand</p>
      <Row>
        <Col>
          <DappPreview
            title="Dapp Raider"
            subtitle="A cool game!"
          />
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default Featured;
