import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';

const CallToAction = () => (
  <Container fluid>
    <Row className="py-5 callToAction justify-content-center">
      <Col xs="12" sm="5" className="text-center">
        <h1 className="text-primary">Get Involved</h1>
        <p className="lead">
          Are you a developer? Do you have a dApp idea?
          Would you like to patner with us?
        </p>
        <Button color="primary">
          Let Us Know
        </Button>
      </Col>
    </Row>
  </Container>
);

export default CallToAction;
