import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/index';
import Signup from './components/Signup/index';
import IssuesBoard from './components/IssuesBoard/index';
import NewIssue from './components/NewIssue/index';
import Header from './components/shared/Header/index';
// import Issue from './components/Issue';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/issues" component={IssuesBoard} />
            <Route exact path="/issues/new" component={NewIssue} />
            {/* <Route exact path="/issues" component={Issue} /> */}
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
