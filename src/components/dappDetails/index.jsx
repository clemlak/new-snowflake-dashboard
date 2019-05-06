/**
 * Displays the details of a specific dApp
 * WARNING: Currently not used (WIP)
 */

import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import imgPlaceholder from '../../common/img/subway_surfers_logo.png';

function DappDetails({
  match,
}) {
  const { id } = match.params;

  return (
    <div>
      <Row>
        <Col>
          <img src={imgPlaceholder} alt="Dapp logo" className="img-fluid" />
        </Col>
        <Col>
          <p className="lead">
            Subway Surfer
          </p>
          <p>
            Big Farms LLC
          </p>
          <Button color="primary">
            Add dApp
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>
            Screenshots
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>
            Description
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default DappDetails;
