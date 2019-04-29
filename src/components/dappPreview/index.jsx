import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

import imgPlaceholder from '../../common/img/placeholders/dapp.gif';

function DappPreview(props) {
  const {
    title,
    subtitle,
  } = props;

  return (
    <div>
      <Card>
        <CardImg top width="100%" src={imgPlaceholder} alt="Dapp preview" />
        <CardBody>
          <CardTitle>
            {title}
          </CardTitle>
          <CardSubtitle>
            {subtitle}
          </CardSubtitle>
          <Row>
            <Col>
              Rating
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col className="text-center">
              <Button color="primary" size="sm">
                Get
              </Button>
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
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
