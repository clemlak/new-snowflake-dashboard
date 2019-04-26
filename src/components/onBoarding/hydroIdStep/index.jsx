import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Input,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import {
  isHydroIdAvailable,
} from '../../../services/utilities';

import hydroIdImg from '../../../common/img/steps/hydroId.png';

function HydroIdStep() {
  const [hydroId, setHydroId] = useState('');
  const [validatedHydroId, setValidatedHydroId] = useState('');
  const [isHydroIdValidated, setIsHydroIdValidated] = useState(false);

  const web3 = useWeb3Context();

  useEffect(() => {
    if (hydroId !== '' && hydroId !== validatedHydroId) {
      isHydroIdAvailable(web3.library, hydroId)
        .then((result) => {
          if (result) {
            setValidatedHydroId(hydroId);
            setIsHydroIdValidated(true);
          } else {
            setValidatedHydroId('');
            setIsHydroIdValidated(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <img src={hydroIdImg} alt="welcome" className="img-fluid" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <h1 className="text-white">
            Hydro ID
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="8" className="text-center">
          <p className="text-white">
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="10" className="text-center">
          <Input
            value={hydroId}
            onChange={e => setHydroId(e.target.value)}
            placeholder="Your Hydro ID"
            type="text"
            required
            valid={isHydroIdValidated}
            invalid={!isHydroIdValidated}
          />
          <Button className="btn-white">
            Continue
          </Button>
          {hydroId !== '' && (
            <div>
              {isHydroIdValidated ? 'Hydro is valid' : 'Hydro is not valid'}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default HydroIdStep;
