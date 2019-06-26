/**
 * Displays the dapps added by the current user
 */

import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  CardDeck,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import DappPreview from '../../components/dappPreview';
import AdditionalHelp from '../../components/additionalHelp';

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
            <AdditionalHelp />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Manage;
