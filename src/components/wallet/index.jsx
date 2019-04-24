import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
} from 'reactstrap';
import {
  IoMdHelpCircleOutline,
} from 'react-icons/io';

import Transactions from './transactions';

const Wallet = () => (
  <Container>
    <Row>
      <Col>
        <Card className="blue-card">
          <Row className="p-3">
            <Col>
              <p>Your dApp Store Wallet</p>
            </Col>
            <Col className="text-right">
              <IoMdHelpCircleOutline />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <p className="small mb-0 text-muted">
                <span className="h1 text-white">
                  500,250
                </span>
                {' '}
                Hydro
              </p>
              <p className="small text-muted">
                USD $340.00
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center py-5">
            <Col className="text-right">
              <Button className="btn-white">
                Deposit
              </Button>
            </Col>
            <Col className="text-left">
              <Button color="success">
                Withdraw
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card className="grey-card">
          <Row className="p-3">
            <Col>
              <p>Buy deposit to dApp wallet</p>
            </Col>
            <Col className="text-right">
              <IoMdHelpCircleOutline />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <p className="small mb-0 text-muted">
                <span className="h1 text-white">
                  0
                </span>
                {' '}
                Hydro
              </p>
              <p className="small text-muted">
                USD $340.00
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center py-5">
            <Col className="text-center">
              <Button color="primary">
                Deposit
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Transactions />
      </Col>
    </Row>
  </Container>
);

export default Wallet;
