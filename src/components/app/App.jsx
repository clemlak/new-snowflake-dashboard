import React from 'react';
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

import Header from '../header';
import Footer from '../footer';
import Sidebar from '../sidebar';

import Home from '../home';
import Faq from '../faq';
import Contact from '../contact/contact';
import identity from '../identity';
import About from '../about';
import Manage from '../manage';
import Privacy from '../privacy';
import Terms from '../terms';
import Wallet from '../wallet';
import Submit from '../submit';
import Category from '../category';

import DappDetails from '../dappDetails';

const App = () => {
  const web3 = useWeb3Context();

  if (!web3.error && !web3.active) {
    console.log('Activating MetaMask...');
    web3.setConnector('MetaMask');
  }

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Container fluid className="app">
          <Row>
            <Col xs="12" sm="3">
              <Sidebar />
            </Col>
            <Col xs="12" sm="9" className="app__content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/faq" component={Faq} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/identity" component={identity} />
                <Route exact path="/about" component={About} />
                <Route exact path="/manage" component={Manage} />
                <Route exact path="/privacy" component={Privacy} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/wallet" component={Wallet} />
                <Route exact path="/submit" component={Submit} />
                <Route path="/dapp/:id" component={DappDetails} />
                <Route path="/category/:name" component={Category} />

                <Route component={Home} />
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
