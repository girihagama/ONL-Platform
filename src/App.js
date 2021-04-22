import './App.css';
import { Switch, Route } from "react-router-dom";
import login from './components/auth/login';
import reset from './components/auth/reset';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={login} />
        <Route exact path="/reset" component={reset} />
      </Switch>
    </main>
  );
}

export default App;
