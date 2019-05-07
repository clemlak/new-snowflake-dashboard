/**
 * Displays the FAQ page
 * QA are taken from the faq.json file located in the config folder
 */

import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import QA from './qa';

import faqJson from '../../common/config/faq.json';

const Faq = () => (
  <div>
    <Row className="pb-4">
      <Col>
        <h1>FAQ</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="accordion">
          {faqJson.map(qa => (
            <QA
              key={qa.question}
              question={qa.question}
              answer={qa.answer}
            />
          ))}

        </div>

      </Col>
    </Row>
    <Row className="mt-5">
      <Col>
        <Row className="additional-help align-items-center">
          <Col>
            <h4 className="additional-help__title">Need Additional Help?</h4>
            <p className="additional-help__subtitle">Send us a message via projecthydro.org</p>
          </Col>
          <Col sm="4" className="text-right">
            <Button className="btn-outlined">
              Get Assistance
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default Faq;
