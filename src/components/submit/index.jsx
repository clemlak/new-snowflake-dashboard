import React from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';

import {
  NavLink as RouterNavLink,
} from 'react-router-dom';

import contractsJson from '../../common/config/submit/contracts.json';
import resourcesJson from '../../common/config/submit/resources.json';


const Submit = (props) => {

  return (
    <div>
    <Row className="submitDapp">
      <Col>
      <h1 class="title">Submit A dApp</h1>
      <p>Looking to submit a dApp? Use the resources below to get started on bringing you idea to life.</p>

       <h3 class="">Resources</h3>

       {resourcesJson.map(Resource => (
     	  <Card className="submit_card">
         <CardHeader>{Resource.title}</CardHeader>
           <CardBody>
             <CardText>{Resource.description}</CardText>
           </CardBody>
           <CardFooter><Button>View Resource</Button></CardFooter>
         </Card>
        ))}

        <h3 class="">Smart Contracts</h3>

        {contractsJson.map(Contract => (
          <Card className="submit_card">
          <CardHeader>{Contract.title}</CardHeader>
            <CardBody>
              <CardText>{Contract.description}</CardText>
            </CardBody>
            <CardFooter><Button>View Contract</Button></CardFooter>
          </Card>
         ))}
      </Col>
    </Row>
  </div>
  )
};

export default Submit;
