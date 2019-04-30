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

  return (
    <Alert>
      <Row className="align-items-center">
        <Col sm="1">
          <IoIosCheckmarkCircleOutline />
        </Col>
        <Col>
          <p className="mb-0">
            {address}
          </p>
          <p className="small mb-0">
            Feb 12, 2019 at 6:34pm
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
