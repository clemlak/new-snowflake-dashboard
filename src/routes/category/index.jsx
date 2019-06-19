import React from 'react';
import {
  Row,
  Col,
  Button,
  CardDeck,
} from 'reactstrap';
import DappPreview from '../../components/dappPreview';
import resolversJson from '../../legacy/resolvers.json';

function Category({
  match,
}) {
  const { name } = match.params;
  const dappsToDisplay = [];

  Object.keys(resolversJson).forEach((key) => {
    if (resolversJson[key].category === name) {
      dappsToDisplay.push(key);
    }
  });

  function displayDapps() {
    const dappsPreviews = [];

    for (let i = 0; i < dappsToDisplay.length; i += 1) {
      dappsPreviews.push(
        <DappPreview
          key={dappsToDisplay[i]}
          id={dappsToDisplay[i]}
          legacy
          added={false}
        />,
      );
    }

    return dappsPreviews;
  }

  return (
    <div>
      <Row>
        <Col>
          <h1 className="title">
            {`${name} dApps`}
          </h1>
        </Col>
      </Row>

      {dappsToDisplay.length > 0 ? (
        <Row className="py-3">
          <Col>
            <CardDeck>
              {displayDapps()}
            </CardDeck>
          </Col>
        </Row>
      ) : (
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
      )}
    </div>
  );
}

export default Category;
