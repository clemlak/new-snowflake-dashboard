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
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

import Purchase from '../purchase';
import Remove from '../remove';

import imgPlaceholder from '../../common/img/placeholders/dapp.gif';
import resolversJson from '../../legacy/resolvers.json';

function DappPreview(props) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

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
      <Card>
        <CardImg top width="200px" src={details.logo} alt="Dapp preview" />
        <CardBody>
          <CardTitle>
            {details.title}
          </CardTitle>
          <CardSubtitle>
            {details.category}
          </CardSubtitle>
          <Row>
            <Col>
              Rating
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col className="text-center">
              {added ? (
                <div>
                  <Button color="success" size="sm">
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
            <Col>
              <small className="text-muted">
                In-dApp Purchases
              </small>
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
