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

import imgPlaceholder from '../../common/img/placeholders/dapp.gif';
import resolversJson from '../../legacy/resolvers.json';

function DappPreview(props) {
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
                <Button color="success" size="sm">
                  Open
                </Button>
              ) : (
                <Button color="primary" size="sm">
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
  id: PropTypes.string,
  legacy: PropTypes.bool,
  added: PropTypes.bool,
};
