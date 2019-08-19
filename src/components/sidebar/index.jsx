/**
 * Displays the sidebar
 */

import React, {
  useState,
  useEffect,
} from 'react';
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
import numeral from 'numeral';

import Onboarding from '../onboarding';
import CategoriesMenu from './components/categoriesMenu';
import whiteHydroDrop from '../../common/img/hydro_white_drop.png';

import {
  getAccountEin,
  getSnowflakeBalance,
  getIdentity,
  subscribeToDeposits,
} from '../../services/utilities';

const raindropContractAddress = '0x387Ce3020e13B0a334Bb3EB25DdCb73c133f1D7A';

function Sidebar() {
  const [hasProvider, setHasProvider] = useState(false);
  const [hasEin, setHasEin] = useState(false);
  const [ein, setEin] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState('');
  const [addedDapps, setAddedDapps] = useState(0);
  const [networkId, setNetworkId] = useState();

  const web3 = useWeb3Context();

  useEffect(() => {
    async function fetchData() {
      if (web3.active) {
        setNetworkId(web3.networkId);

        if (ein === '' && web3.networkId === 4) {
          const fetchEin = await getAccountEin(web3.library, web3.account);

          if (fetchEin !== '') {
            setEin(fetchEin);

            const snowflakeBalanceReq = await getSnowflakeBalance(web3.library, web3.account);
            setBalance(web3.library.utils.fromWei(snowflakeBalanceReq));

            const identity = await getIdentity(web3.library, web3.account);
            setAddedDapps(identity.resolvers.filter(resolver => resolver !== raindropContractAddress));

            subscribeToDeposits(web3.library, web3.account, () => {
              getSnowflakeBalance(web3.library, web3.account)
                .then((res) => {
                  setBalance(web3.library.utils.fromWei(res));
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }
        }
      }
    }

    fetchData();
  }, [web3]);

  return (
    <div className="sidebar">
      <div className="py-4">
        <Nav vertical>
          {ein !== '' ? (
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
                    {numeral(balance).format('0 a')}
                    {' '}
                    <img src={whiteHydroDrop} alt="Hydro Drop" className="sidebar__hydro-drop" />
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
            <div className="onboardingButton">
              <Onboarding
                step={web3.active ? 'hydroId' : 'provider'}
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(false)}
                hasProvider={web3.active}
                networkId={networkId}
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
