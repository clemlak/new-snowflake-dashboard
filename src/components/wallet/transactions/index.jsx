/**
 * Displays the transactions linked to the current account
 * TODO: Fetch the transactions
 */

import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
  TabPane,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import {
  getPastDeposits,
  getPastPurchases,
} from '../../../services/utilities';

import Transaction from './transaction';

function Transactions() {
  const [tab, setTab] = useState('all');
  const [deposits, setDeposits] = useState([]);
  const [purchases, setPurchases] = useState([]);

  return (
    <div>
      <Row className="py-5">
        <Col>
          <Nav className="filters">
            <NavItem className="filters__nav-item">
              <NavLink
                onClick={() => setTab('all')}
                className={tab === 'all' ? (
                  'filters__link--active'
                ) : (
                  'filters__link'
                )}
              >
                All
              </NavLink>
            </NavItem>
            <NavItem className="filters__nav-item">
              <NavLink
                onClick={() => setTab('deposits')}
                className={tab === 'deposits' ? (
                  'filters__link--active'
                ) : (
                  'filters__link'
                )}
              >
                Deposits
              </NavLink>
            </NavItem>
            <NavItem className="filters__nav-item">
              <NavLink
                onClick={() => setTab('withdraws')}
                className={tab === 'withdraws' ? (
                  'filters__link--active'
                ) : (
                  'filters__link'
                )}
              >
                Withdraws
              </NavLink>
            </NavItem>
            <NavItem className="filters__nav-item">
              <NavLink
                onClick={() => setTab('purchases')}
                className={tab === 'purchases' ? (
                  'filters__link--active'
                ) : (
                  'filters__link'
                )}
              >
                Purchases
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={tab}>
            <TabPane tabId="all">
              <Transaction
                type="withdraw"
                date={Date.now()}
                amount="4200"
              />
            </TabPane>
            <TabPane tabId="deposits">
              Deposits
            </TabPane>
            <TabPane tabId="withdraws">
              Withdraws
            </TabPane>
            <TabPane tabId="purchases">
              Purchases
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  );
}

export default Transactions;
