import React from 'react';
import GlueTube from './GlueTube/GlueTube';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginFormPage from './LoginFormPage/LoginFormPage';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginFormPage} />
        <Route path="/" component={GlueTube} />
      </Switch>
    </Router>
  );
}

export default App;
