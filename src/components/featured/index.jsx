import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import DappPreview from '../dappPreview';

import configJson from '../../common/config/home.json';

function Featured() {
  const count = configJson.featured;

  const cols = [];

  for (let i = 0; i < count; i += 1) {
    cols.push(
      <Col key={i}>
        <DappPreview
          title="Dapp Raider"
          subtitle="A cool game!"
        />
      </Col>,
    );
  }

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>
            Featured
          </h1>
          <p>dApps Chosen Based on Demand</p>
        </Col>
        <Col className="text-right">
          <Button size="sm">
            See more
          </Button>
        </Col>
      </Row>
      <Row>
        {cols}
      </Row>
    </div>
  );
}

export default Featured;
