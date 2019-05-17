/**
 * Displays the dapps added by the current user
 */

import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  CardDeck,
} from 'reactstrap';

import {
  useWeb3Context,
} from 'web3-react';

import DappPreview from '../dappPreview';

import {
  getIdentity,
} from '../../services/utilities';

function Manage() {
  const web3 = useWeb3Context();

  const [resolvers, setResolvers] = useState([]);
  const [loading, setLoading] = useState(true);

  const raindropContractAddress = '0x387Ce3020e13B0a334Bb3EB25DdCb73c133f1D7A';

  useEffect(() => {
    if (web3.active && loading) {
      getIdentity(web3.library, web3.account)
        .then((identity) => {
          setResolvers(identity.resolvers.filter(resolver => resolver !== raindropContractAddress));
          setLoading(false);
        })
        .catch((err) => { console.log(err); });
    }
  });

  return (
    <div>
      <Row className="pb-3">
        <Col>
          <h1 className="title">
            Your dApps:
            {' '}
            {resolvers.length}
          </h1>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          {resolvers.length > 0 ? (
            <CardDeck>
              {resolvers.map(resolver => (
                <DappPreview
                  key={resolver}
                  id={resolver}
                  legacy
                  added
                />
              ))
            }
            </CardDeck>
          ) : (
            <Row className="mt-5">
              <Col>
                <Row className="additional-help align-items-center">
                  <Col>
                    <h4 className="additional-help__title">Add A aApp</h4>
                    <p className="additional-help__subtitle">You do not have any dApps. Add one from the dApp Store and it will show up here.</p>
                  </Col>
                  <Col sm="4" className="text-right">
                    <Button className="btn-outlined">
                      Submit dApp
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Manage;
