import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Alert,
  Button,
} from 'reactstrap';
import {
  IoIosCheckmarkCircleOutline,
} from 'react-icons/io';

const LinkedAddress = (props) => {
  const {
    address,
  } = props;

  const formattedDate = new Date(Date.now());

  return (
    <Alert className="linked-address">
      <Row className="align-items-center">
        <Col sm="1">
          <IoIosCheckmarkCircleOutline
            className="linked-address__icon"
          />
        </Col>
        <Col>
          <p className="mb-0">
            {address}
          </p>
          <p className="linked-address__date">
            {formattedDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </Col>
        <Col className="text-right">
          <Button color="danger">
            Remove Access
          </Button>
        </Col>
      </Row>
    </Alert>
  );
};

export default LinkedAddress;

LinkedAddress.propTypes = {
  address: PropTypes.string.isRequired,
};
