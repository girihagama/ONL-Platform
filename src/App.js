import './App.css';
import React from 'react';
import { Redirect, Switch, Route, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import login from './components/auth/login';
import reset from './components/auth/reset';
import ICT_Dashboard from './components/dashboard/ict';
import { Loader, Dimmer } from 'semantic-ui-react';

function App({ state, logged }) {
  const currentPath = useLocation().pathname;

  console.log("APP State", state, logged);
  console.log({ currentPath });

  return (
    <main>
      {!logged && //non-authenticated routes
        <Switch>
          <Route exact path="/" >
            <Route strict component={login} />
          </Route>
          <Route exact path="/reset" component={reset} />
          <Route exact path={["/ict", "/dashboard", "/customers"]}>
            <Redirect push to='/' />
          </Route>
        </Switch>
      }

      {logged && //authenticated routes
        <Switch>
          <Route exact path={["/","/reset"]} >
            <Redirect push to="/ict/dashboard" />
          </Route>
          <Route exact path={["/ict", "/dashboard", "/customers"]}>
            <Redirect to='/ict/dashboard' />
          </Route>
          <Route exact path="/ict/*" component={ICT_Dashboard} />
        </Switch>
      }

      {/* <Switch>
        <Route exact path="/">
          {
            (state)
              ? (!state.firebase.auth.isEmpty)
                ? <Redirect push to="/ict" /> //to="/ict" 
                : <Route component={login} />
              : <Dimmer page active><Loader size='huge' active>Loading...<hr /><img alt="logo" src="/logo_white.png" height="80px" /></Loader></Dimmer>
          }
        </Route>
        <Route exact path="/reset">
          {
            (state)
              ? (!state.firebase.auth.isEmpty)
                ? <Redirect to='/ict/dashboadrd' />
                : <Route component={reset} />
              : <Dimmer active><Loader size='huge' active>Loading...</Loader></Dimmer>
          }
        </Route>

        <Route exact path={["/ict", "/dashboard", "/customers"]}>
          <Redirect to='/ict/dashboard' />
        </Route>
        <Route exact path="/ict/*" component={ICT_Dashboard} />

        <Route path="/*">
          <Redirect to='/' />
        </Route>
      </Switch> */}
    </main>
  );
}

const mapStateToProps = (state) => {
  //console.log("APP State", state);
  return {
    state,
    logged: !state.firebase.auth.isEmpty
  }
}

export default connect(mapStateToProps, null)(App);