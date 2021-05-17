import './App.css';
import React from 'react';
import { Redirect, Switch, Route, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import Login from './components/auth/Login';
import Reset from './components/auth/Reset';
import SignOut from './components/auth/SignOut';
import ICT_Dashboard from './components/dashboard/ict';

function App({ state, logged }) {
  const currentPath = useLocation().pathname;
  localStorage.setItem("Breadcrumb", (currentPath.split('/')).pop(0));
  console.log("App.js", { state, currentPath, logged, localStorage });

  return (
    <main>
      {!localStorage.getItem('logged') && //non-authenticated routes
        <Switch>
          <Route exact path="/" >
            <Route component={() => <Login props={{ logged }} />} />
          </Route>
          <Route exact path="/reset" component={Reset} />

          <Route path={["/ict/*", "/technical/*"]}>
            <Redirect push to='/' />
          </Route>
          <Route exact path="/SignOut" >
            <Route component={() => <SignOut />} />
          </Route>
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      }

      {localStorage.getItem('logged') && //authenticated routes
        <Switch>
          <Route exact path="/SignOut" >
            <Route component={() => <SignOut />} />
          </Route>
          <Route exact path={["/", "/reset"]} >
            <Redirect push to={(localStorage.getItem('platform').toString())} />
          </Route>
          <Route exact path={["/ict"]}>
            <Redirect to='/ict/dashboard' />
          </Route>
          <Route exact path={["/technical"]}>
            <Redirect to='/technical/dashboard' />
          </Route>
          <Route exact path="/ict/*" component={ICT_Dashboard}/>
          <Route exact path="/technical/*" component={() => <div>Technical</div>} />

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
    logged: !state.firebase.auth.isEmpty,
  }
}

export default connect(mapStateToProps, null)(App);