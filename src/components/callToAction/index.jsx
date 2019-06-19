import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';

import './index.scss';

const CallToAction = () => (
  <Container fluid>
    <Row className="call-to-action justify-content-center">
      <Col xs="12" sm="10" className="text-center">
        <h1 className="call-to-action__title">Get Involved</h1>
        <p className="call-to-action__subtitle">
          Are you a developer? Do you have a dApp idea?
          Would you like to patner with us?
        </p>
        <Button className="btn-outlined" size="md">
          Let Us Know
        </Button>
      </Col>
    </Row>
  </Container>
);

export default CallToAction;
