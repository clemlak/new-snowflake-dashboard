import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../header';
import Footer from '../footer';

import Home from '../home';
import Faq from '../faq';
import Contact from '../contact/contact';
import identity from '../identity';
import About from '../about';
import NoMatch from '../noMatch';
import ManageDapps from '../manageDapps';
import Privacy from '../privacy';
import Terms from '../terms';
import Wallet from '../wallet';
import Submit from '../submit';


const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/identity" component={identity} />
        <Route exact path="/about" component={About} />
        <Route exact path="/manageDapps" component={ManageDapps} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/wallet" component={Wallet} />
        <Route exact path="/submit" component={Submit} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
