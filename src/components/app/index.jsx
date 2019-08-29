import React, {
  useEffect,
  useState,
} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import SnowflakeContext from '../../contexts/snowflakeContext';

import Header from '../header';
import Footer from '../footer';
import Sidebar from '../sidebar';
import Slider from '../slider';

import Wallet from '../../routes/wallet';
import Home from '../../routes/home';
import Faq from '../../routes/faq';
import Contact from '../../routes/contact/contact';
import Identity from '../../routes/identity';
import About from '../../routes/about';
import Category from '../../routes/category';
import Manage from '../../routes/manage';
import Privacy from '../../routes/privacy';
import Submit from '../../routes/submit';
import Terms from '../../routes/terms';

import {
  getAccountEin,
  getAccountDetails,
  getSnowflakeBalance,
  getAccountHydroBalance,
  getAccountEthBalance,
  getIdentity,
} from '../../services/utilities';

import {
  getBalanceUsd,
} from '../../services/hydroPrice';

function App() {
  const web3 = useWeb3Context();

  const [ethAddress, setEthAddress] = useState('');
  const [ein, setEin] = useState('');
  const [hydroId, setHydroId] = useState('');
  const [dapps, setDapps] = useState([]);
  const [ethBalance, setEthBalance] = useState('0');
  const [hydroBalance, setHydroBalance] = useState('0');
  const [snowflakeBalance, setSnowflakeBalance] = useState('0');
  const [usdBalance, setUsdBalance] = useState('0');

  useEffect(() => {
    async function getData() {
      setEthAddress(web3.account);

      if (ein === '' && web3.networkId === 4) {
        const fetchEin = await getAccountEin(web3.library, web3.account);

        if (fetchEin !== '') {
          setEin(fetchEin);

          const details = await getAccountDetails(web3.library, fetchEin);
          setHydroId(details.casedHydroID);

          const ethBalanceReq = await getAccountEthBalance(web3.library, web3.account);
          setEthBalance(web3.library.utils.fromWei(ethBalanceReq));

          const snowflakeBalanceReq = await getSnowflakeBalance(web3.library, web3.account);
          setSnowflakeBalance(web3.library.utils.fromWei(snowflakeBalanceReq));

          const usdBalanceReq = await getBalanceUsd(web3.library, snowflakeBalance);
          setUsdBalance(usdBalanceReq);

          const hydroBalanceReq = await getAccountHydroBalance(web3.library, web3.account);
          setHydroBalance(web3.library.utils.fromWei(hydroBalanceReq));

          const raindropContractAddress = '0x387Ce3020e13B0a334Bb3EB25DdCb73c133f1D7A';

          const identity = await getIdentity(web3.library, web3.account);
          setDapps(identity.resolvers.filter(resolver => resolver !== raindropContractAddress));
        }
      }
    }

    if (web3.active) {
      console.log('Web3 is active, fetching data...');

      getData();
    }

    if (!web3.error && !web3.active) {
      web3.setFirstValidConnector(['MetaMask']);
    } else if (web3.error) {
      console.log(web3.error);
    }
  }, [web3]);

  return (
    <SnowflakeContext.Provider value={{
      hasProvider: web3.active,
      networkId: web3.networkId,
      ethAddress,
      ein,
      hydroId,
      dapps,
      ethBalance,
      hydroBalance,
      snowflakeBalance,
      usdBalance,
    }}
    >
      <BrowserRouter>
        <div>
          <Header />
          <Slider />
          <Container fluid className="app">
            <Row>
              <Col xs="12" sm="12" md="4" lg="4" xl="3" className="nopadding">
                <Sidebar />
              </Col>
              <Col xs="12" sm="12" md="8" lg="8" xl="9" className="app__content">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/faq" component={Faq} />
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/identity" component={Identity} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/manage" component={Manage} />
                  <Route exact path="/privacy" component={Privacy} />
                  <Route exact path="/terms" component={Terms} />
                  <Route exact path="/wallet" component={Wallet} />
                  <Route exact path="/submit" component={Submit} />
                  <Route path="/category/:name" component={Category} />

                  <Route component={Home} />
                </Switch>
              </Col>
            </Row>
          </Container>
          <Footer />
        </div>
      </BrowserRouter>
    </SnowflakeContext.Provider>
  );
}

export default App;
