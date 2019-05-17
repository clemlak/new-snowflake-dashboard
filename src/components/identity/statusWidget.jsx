/**
 * Displays a widget connected to the Status dApp
 * TODO: Identity - The Get / Edit bug is buggy, the center of the button doesn't seem clickable
 */

import React, { useState } from 'react';
import {
  useWeb3Context,
} from 'web3-react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import Purchase from '../purchase';
import LegacyDapp from '../legacyDapp';

import {
  getStatus,
  isResolverFor,
} from '../../services/utilities';

function StatusWidget() {
  const [status, setStatus] = useState('');
  const [isStatusAdded, setIsStatusAdded] = useState(false);
  const [isAddedChecked, setIsAddedChecked] = useState(false);

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isDappModalOpen, setIsDappModalOpen] = useState(false);

  const statusAddress = '0x16fD6e2E1C4afB9C4e7B901141706596317e4ceB';
  const web3 = useWeb3Context();

  if (web3.active && !isAddedChecked) {
    getStatus(web3.library, web3.account)
      .then((res) => {
        setStatus(res);

        return isResolverFor(web3.library, web3.account, statusAddress);
      })
      .then((res) => {
        setIsStatusAdded(res);
        setIsAddedChecked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <LegacyDapp
        id={statusAddress}
        title="Status"
        isOpen={isDappModalOpen}
        toggle={() => setIsDappModalOpen(false)}
      />
      <Purchase
        id={statusAddress}
        title="Status"
        isOpen={isPurchaseModalOpen}
        toggle={() => setIsPurchaseModalOpen(false)}
      />
      <Row className="mb-4 no-gutters status">
        <Col>
          <Row>
            <Col>
              <p className="status__title">
                My Status:
              </p>
            </Col>
            <Col>
              {isStatusAdded ? (
                <Button className="status__edit" onClick={() => setIsDappModalOpen(true)}>
                  Edit
                </Button>
              ) : (
                <Button className="status__edit" onClick={() => setIsPurchaseModalOpen(true)}>
                  Get
                </Button>
              )}

            </Col>
          </Row>
          <p className="status__current">
            {status !== '' ? (
              status
            ) : (
              'No status yet!'
            )}
          </p>
        </Col>
      </Row>
    </div>

  );
}

export default StatusWidget;
