/**
 * Displays the transactions linked to the current account
 * TODO: purchasedDapps must display the name of the resolver instead of the address of the contract
 * TODO: Fix same keys error
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
  getPastPurchasedDapps,
  getPastWithdrawals,
} from '../../../services/utilities';

import Transaction from './transaction';

function Transactions() {
  const [tab, setTab] = useState('all');
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [purchasedDapps, setPurchasedDapps] = useState([]);

  const web3 = useWeb3Context();

  if (
    web3.active
    && deposits.length === 0
    && withdrawals.length === 0
    && purchasedDapps.length === 0
  ) {
    getPastDeposits(web3.library, web3.account)
      .then((res) => {
        setDeposits(res);

        return getPastWithdrawals(web3.library, web3.account);
      })
      .then((res) => {
        setWithdrawals(res);

        return getPastPurchasedDapps(web3.library, web3.account);
      })
      .then((res) => {
        setPurchasedDapps(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
                onClick={() => setTab('purchasedDapps')}
                className={tab === 'purchasedDapps' ? (
                  'filters__link--active'
                ) : (
                  'filters__link'
                )}
              >
                Purchased dApps
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={tab}>
            <TabPane tabId="all">
              {purchasedDapps.concat(deposits.concat(withdrawals)).map(tx => (
                <Transaction
                  key={`_${tx.txHash}`}
                  type={tx.event}
                  date={Date.now()}
                  amount={tx.amount}
                />
              ))}
            </TabPane>
            <TabPane tabId="deposits">
              {deposits.map(deposit => (
                <Transaction
                  key={deposit.txHash}
                  type={deposit.event}
                  date={Date.now()}
                  amount={deposit.amount}
                />
              ))}
            </TabPane>
            <TabPane tabId="withdraws">
              {withdrawals.map(withdrawal => (
                <Transaction
                  key={withdrawal.txHash}
                  type={withdrawal.event}
                  date={Date.now()}
                  amount={withdrawal.amount}
                />
              ))}
            </TabPane>
            <TabPane tabId="purchasedDapps">
              {purchasedDapps.map(purchase => (
                <Transaction
                  key={purchase.txHash}
                  type={purchase.event}
                  date={Date.now()}
                  amount={purchase.withdrawAllowance}
                  resolver={purchase.resolver}
                />
              ))}
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  );
}

export default Transactions;
