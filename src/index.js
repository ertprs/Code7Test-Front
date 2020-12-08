import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product

import ProfilePage from "views/ProfilePage/ProfilePage.js";
import ClienteProfile from "views/ProdutosGenerica/index.js"
import ClienteRegister from 'views/NFE/index.js'

import 'bootstrap/dist/css/bootstrap.css';


var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
    
     
      <Route path="/ClienteProfile" component={props => <ClienteProfile {...props} />} />
      <Route path="/ClienteRegister" component={props => <ClienteRegister {...props} />} />

      <Route path="/" component={ProfilePage} />
       
    </Switch>
  </Router>,
  document.getElementById("root")
);
