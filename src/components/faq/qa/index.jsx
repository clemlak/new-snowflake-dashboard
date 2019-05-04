import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Button,
  CardBody,
  CardHeader,
  Card,
} from 'reactstrap';

function QA(props) {
  const {
    question,
    answer,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Card>
        <CardHeader>
          <Button color="link" onClick={() => setIsOpen(!isOpen)}>
            {question}
          </Button>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>
            {answer}
          </CardBody>
        </Collapse>
      </Card>
    </div>
  );
}

QA.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default QA;
