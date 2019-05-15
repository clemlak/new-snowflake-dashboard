/**
 * Displays the sidebar
 */

import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import {
  useWeb3Context,
} from 'web3-react';

import Onboarding from '../onboarding';
import CategoriesMenu from './categoriesMenu';
import whiteHydroDrop from '../../common/img/hydro_white_drop.png';

import {
  getAccountEin,
  getSnowflakeBalance,
  getIdentity,
} from '../../services/utilities';

const raindropContractAddress = '0x387Ce3020e13B0a334Bb3EB25DdCb73c133f1D7A';

function Sidebar() {
  const [hasProvider, setHasProvider] = useState(false);
  const [hasEin, setHasEin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState('');
  const [addedDapps, setAddedDapps] = useState(0);

  const web3 = useWeb3Context();

  if (web3.active) {
    if (!hasProvider) {
      setHasProvider(true);
    }

    if (!hasEin) {
      getAccountEin(web3.library, web3.account)
        .then((res) => {
          if (res !== '') {
            setHasEin(true);

            return getSnowflakeBalance(web3.library, web3.account);
          }
        })
        .then((res) => {
          setBalance(web3.library.utils.fromWei(res));

          return getIdentity(web3.library, web3.account);
        })
        .then((res) => {
          setAddedDapps(res.resolvers.filter(resolver => resolver !== raindropContractAddress));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="sidebar">
      <div className="py-4">
        <Nav vertical>
          {hasEin ? (
            <div>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/" className="sidebar__link" activeClassName="sidebar__link--active">
                  Hydro dApp Store
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/wallet" className="sidebar__link" activeClassName="sidebar__link--active">
                  Your Wallet
                  <Badge className="sidebar__badge" color="secondary" pill>
                    {balance.substring(0, 5)}k <img src={whiteHydroDrop} alt="Hydro Drop" className="sidebar__hydro-drop" />
                  </Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/manage" className="sidebar__link" activeClassName="sidebar__link--active">
                  Your dApps
                  <Badge className="sidebar__badge" color="secondary" pill>
                    {addedDapps.length}
                  </Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/identity" className="sidebar__link" activeClassName="sidebar__link--active">
                  Manage Your Identity (EIN)
                </NavLink>
              </NavItem>
            </div>
          ) : (
            <div>
              <Onboarding
                step={hasProvider ? 'provider' : 'hydroId'}
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(false)}
                hasProvider={hasProvider}
              />
              <Button color="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
                Create Account
              </Button>
            </div>
          )}
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/submit" className="sidebar__link" activeClassName="sidebar__link--active">
              Submit A dApp
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className="py-4">
        <CategoriesMenu />
      </div>
    </div>
  );
}

export default Sidebar;
