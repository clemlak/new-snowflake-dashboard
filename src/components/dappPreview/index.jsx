/**
 * Displays a preview of a dapp.
 * This component can be used for any situation: buy / open / remove.
 * In Legacy, this component fetches the data from an imported JSON file,
 * but in V2, it will fetch data from an external API.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';

import Purchase from '../purchase';
import Remove from '../remove';
import LegacyDapp from '../legacyDapp';

import imgPlaceholder from '../../common/img/placeholders/dapp.gif';
import resolversJson from '../../legacy/resolvers.json';

function DappPreview(props) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isDappModalOpen, setIsDappModalOpen] = useState(false);

  const {
    id,
    legacy,
    added,
  } = props;

  const details = {
    title: 'Title',
    category: 'Category',
    logo: imgPlaceholder,
  };

  if (legacy) {
    details.title = resolversJson[id].title;
    details.category = resolversJson[id].category;
    details.logo = `${process.env.PUBLIC_URL}/legacy/${id}/logo.png`;
  }

  return (
    <div>
      <LegacyDapp
        id={id}
        title={details.title}
        isOpen={isDappModalOpen}
        toggle={() => setIsDappModalOpen(false)}
      />
      <Purchase
        id={id}
        title={details.title}
        price={0}
        isOpen={isPurchaseModalOpen}
        toggle={() => setIsPurchaseModalOpen(false)}
      />
      <Remove
        id={id}
        title={details.title}
        isOpen={isRemoveModalOpen}
        toggle={() => setIsRemoveModalOpen(false)}
      />
      <Card className="dapp-preview">
        <img src={details.logo} alt="Dapp Preview Logo" className="dapp-preview__image" />
        <CardBody className="dapp-preview__body">
          <h4 className="dapp-preview__title">
            {details.title}
          </h4>
          <h5 className="dapp-preview__category">
            {details.category}
          </h5>
          <Row className="justify-content-center align-items-center">
            <Col>
              {added ? (
                <div>
                  <Button color="success" size="sm" onClick={() => setIsDappModalOpen(true)}>
                    Open
                  </Button>
                  <Button color="danger" size="sm" onClick={() => setIsRemoveModalOpen(true)}>
                    Remove
                  </Button>
                </div>
              ) : (
                <Button color="primary" size="sm" onClick={() => setIsPurchaseModalOpen(true)}>
                  Get
                </Button>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default DappPreview;

DappPreview.propTypes = {
  id: PropTypes.string.isRequired,
  legacy: PropTypes.bool.isRequired,
  added: PropTypes.bool.isRequired,
};
