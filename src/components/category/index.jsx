/**
* TODO: Category - Add logic to the call to action at the bottom, only show if no dapps in category exist.
*/

import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

function Category({
  match,
}) {
  const { name } = match.params;

  return (
    <>
    <div>
      {match.params.name ? (
        <h1 className="title">
          {`${name} dApps`}
        </h1>
      ) : (
        <p>
          No param in query string, displaying default category
        </p>
      )}
    </div>

    <Row className="mt-5">
      <Col>
        <Row className="additional-help align-items-center">
          <Col>
            <h4 className="additional-help__title">Be The First</h4>
            <p className="additional-help__subtitle">Submit your dApp to this category and earn a Hydro bounty!</p>
          </Col>
          <Col sm="4" className="text-right">
            <Button className="btn-outlined">
              Submit dApp
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
    </>
  );
}

export default Category;
