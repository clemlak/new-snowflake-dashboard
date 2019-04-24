import React, { Component } from 'react';
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
  IoIosRefresh,
} from 'react-icons/io';

import Transaction from './transaction';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'All',
    };
  }

  toggle(tab) {
    const {
      activeTab,
    } = this.state;

    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      activeTab,
    } = this.state;

    return (
      <div>
        <Row className="py-5 align-items-center">
          <Col sm="10">
            <Nav pills>
              <NavItem>
                <NavLink
                  className={
                    activeTab === 'All' ? 'active' : ''
                  }
                  onClick={() => this.toggle('All')}
                >
                  All
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={
                    activeTab === 'Deposits' ? 'active' : ''
                  }
                  onClick={() => this.toggle('Deposits')}
                >
                  Deposits
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={
                    activeTab === 'Withdraws' ? 'active' : ''
                  }
                  onClick={() => this.toggle('Withdraws')}
                >
                  Withdraws
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={
                    activeTab === 'Purchases' ? 'active' : ''
                  }
                  onClick={() => this.toggle('Purchases')}
                >
                  Purchases
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col sm="2" className="text-right">
            <IoIosRefresh />
          </Col>
        </Row>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="All">
            <Transaction />
          </TabPane>
          <TabPane tabId="Deposits">
            Deposits
          </TabPane>
          <TabPane tabId="Withdraws">
            Withdraws
          </TabPane>
          <TabPane tabId="Purchases">
            Purchases
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Transactions;
