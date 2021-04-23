import './App.css';
import { Redirect, Switch, Route } from "react-router-dom";
import login from './components/auth/login';
import reset from './components/auth/reset';
import ICT_Dashboard from './components/dashboard/ict';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={login} />
        <Route exact path="/reset" component={reset} />
        
        <Route exact path={["/ict", "/dashboard", "/customers"]}>
          <Redirect to='/ict/dashboard'/>
        </Route>
        <Route exact path="/ict/*" component={ICT_Dashboard} />
        
        <Route path="/*">
          <Redirect to='/'/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
