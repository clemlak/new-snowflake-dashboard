/**
 * Displays a simplified version of the homepage
 */

import React from 'react';
import {
  CardDeck,
} from 'reactstrap';

import DappPreview from '../../components/dappPreview';

import resolversJson from '../../legacy/resolvers.json';

function Home() {
  return (
    <div>
      <CardDeck>
        {Object.keys(resolversJson).map(resolver => (
          <DappPreview
            key={resolver}
            id={resolver}
            added={false}
            legacy
          />
        ))}
      </CardDeck>
    </div>
  );
}

export default Home;
