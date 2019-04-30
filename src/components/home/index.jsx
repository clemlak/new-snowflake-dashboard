import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardDeck,
} from 'reactstrap';

import Featured from '../featured';

import resolversJson from '../../legacy/resolvers.json';
import DappPreview from '../dappPreview';

function Home() {
  const [tab, setTab] = useState('home');

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className="dappNavigation__filter__button"
            onClick={() => setTab('home')}
          >
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => setTab('featured')}
          >
            Featured
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => setTab('popular')}
          >
            Most popular
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => setTab('last')}
          >
            Last Releases
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={tab}>
        <TabPane tabId="home">
          <CardDeck>
            {Object.keys(resolversJson).map(resolver => (
              <DappPreview
                key={resolver}
                id={resolver}
                legacy
              />
            ))}
          </CardDeck>
        </TabPane>
        <TabPane tabId="featured">
          <Featured />
        </TabPane>
        <TabPane tabId="popular">
          <p>Popular dapps</p>
        </TabPane>
        <TabPane tabId="last">
          <p>Last releases</p>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Home;
