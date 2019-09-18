import React from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
} from 'reactstrap';

import contractsJson from '../../common/config/submit/contracts.json';
import resourcesJson from '../../common/config/submit/resources.json';

import QA from '../../components/qa';
import faqJson from '../../common/config/submit/faq.json';

const Submit = () => (
  <div>
    <Row className="submitDapp">
      <Col>
        <h1 className="title">Submit A dApp</h1>
        <p>Looking to submit a dApp? Use the resources below to get started on bringing you idea to life.</p>

        <h3>Resources</h3>
        <p>Use the resources below to learn about best practices.</p>

        {resourcesJson.map(Resource => (
          <Card className="submit_card" key={Resource.title}>
            <CardHeader>
              {Resource.title}
            </CardHeader>
            <CardBody>
              <CardText>
                {Resource.description}
              </CardText>
            </CardBody>
            <CardFooter>
              <Button onClick={() =>{window.open(Resource.link)}}>
                View Resource
              </Button>
            </CardFooter>
          </Card>
        ))}

        <h3>Smart Contracts</h3>
        <p>The smart contracts below can speed up your dApp development time.</p>

        {contractsJson.map(Contract => (
          <Card className="submit_card" key={Contract.title}>
            <CardHeader>{Contract.title}</CardHeader>
            <CardBody>
              <CardText>
                {Contract.description}
              </CardText>
            </CardBody>
            <CardFooter>
              <Button onClick={() =>{window.open(Contract.link)}}>
                View Contract
              </Button>
            </CardFooter>
          </Card>
        ))}

        <h3>FAQ</h3>
        <p>Have a question about dApp development or submitting to the store, read below</p>

        <Row>
          <Col className="nopadding">
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
          <Col className="nopadding">
            <Row className="additional-help align-items-center">
              <Col sm="12" md="12" lg="8">
                <h4 className="additional-help__title">Need Additional Help?</h4>
                <p className="additional-help__subtitle">Send us a message via Telegram</p>
              </Col>
              <Col sm="12" md="12" lg="4" className="text-right">
                <Button className="btn-outlined" onClick={() =>{window.open('https://t.me/projecthydro')}}>
                 Get Assistance
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default Submit;
