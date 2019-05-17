/**
 * Displays a preview of a dapp.
 * This component can be used for any situation: buy / open / remove.
 * In Legacy, this component fetches the data from an imported JSON file,
 * but in V2, it will fetch data from an external API.
 * TODO: dApp Preview - When you click on the thumbnail image it should prompt you to open/get dApp
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
import {
  useWeb3Context,
} from 'web3-react';

import Purchase from '../purchase';
import Remove from '../remove';
import LegacyDapp from '../legacyDapp';

import {
  isResolverFor,
} from '../../services/utilities';

import imgPlaceholder from '../../common/img/placeholders/dapp.gif';
import resolversJson from '../../legacy/resolvers.json';

function DappPreview(props) {
  const {
    id,
    legacy,
    added,
  } = props;

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isDappModalOpen, setIsDappModalOpen] = useState(false);

  const [isAddedChecked, setIsAddedChecked] = useState(false);
  const [isAdded, setIsAdded] = useState(added);

  const web3 = useWeb3Context();

  const details = {
    title: 'Title',
    category: 'Category',
    price: '0',
    logo: imgPlaceholder,
  };

  if (legacy) {
    details.title = resolversJson[id].title;
    details.category = resolversJson[id].category;
    details.price = resolversJson[id].price;
    details.logo = `${process.env.PUBLIC_URL}/legacy/${id}/logo.png`;
  }

  if (web3.active && !added && !isAddedChecked) {
    isResolverFor(web3.library, web3.account, id)
      .then((res) => {
        if (added !== res) {
          setIsAdded(res);
        }

        setIsAddedChecked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function returnPriceButton() {
    if (details.price === 0) {
      return (
        <Button color="primary" size="sm" onClick={() => setIsPurchaseModalOpen(true)}>
          Get
        </Button>
      );
    }

    return (
      <Button color="primary" size="sm" onClick={() => setIsPurchaseModalOpen(true)}>
        {details.price}
      </Button>
    );
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
        price={details.price}
        isOpen={isPurchaseModalOpen}
        toggle={() => setIsPurchaseModalOpen(false)}
      />
      <Remove
        id={id}
        title={details.title}
        isOpen={isRemoveModalOpen}
        toggle={() => setIsRemoveModalOpen(false)}
      />
      <Card className="dapp-preview fadeit">
        <div className="dapp-preview__image" style={{ backgroundImage: 'url(' + details.logo + ')' }}>
          <div className="dapp-preview__overlay-wrapper none">
            <Button>Details</Button>
          </div>
        </div>
        <CardBody className="dapp-preview__body">
          <h4 className="dapp-preview__title">
            {details.title}
          </h4>
          <h5 className="dapp-preview__category">
            {details.category}
          </h5>
          <Row className="justify-content-center align-items-center">
            <Col>
              {isAdded ? (
                <div>
                  <Button color="success" size="sm" onClick={() => setIsDappModalOpen(true)}>
                    Open
                  </Button>
                  <Button color="danger" size="sm" onClick={() => setIsRemoveModalOpen(true)}>
                    Remove
                  </Button>
                </div>
              ) : (
                <Button color="outlined" size="sm" onClick={() => setIsPurchaseModalOpen(true)}>
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
