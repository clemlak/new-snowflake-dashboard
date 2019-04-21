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

import Header from '../header';
import Footer from '../footer';
import Sidebar from '../sidebar';

import Home from '../home';
import Faq from '../faq';
import Contact from '../contact/contact';
import identity from '../identity';
import About from '../about';
import NoMatch from '../noMatch';
import Manage from '../manage';
import Privacy from '../privacy';
import Terms from '../terms';
import Wallet from '../wallet';
import Submit from '../submit';

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col xs="12" sm="3">
            <Sidebar />
          </Col>
          <Col xs="12" sm="9">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/faq" component={Faq} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/identity" component={identity} />
              <Route exact path="/about" component={About} />
              <Route exact path="/manageDapps" component={Manage} />
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="/wallet" component={Wallet} />
              <Route exact path="/submit" component={Submit} />
              <Route component={NoMatch} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
