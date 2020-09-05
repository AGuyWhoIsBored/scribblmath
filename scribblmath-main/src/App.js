import React from 'react';
import {Route, Switch } from 'react-router-dom';
import './App.css';
import home from './components/home';
import createacc  from './components/createacc';
import login from './components/login'; 

function App() {
    return (
      <main>
          <Switch>
              <Route path="/" component={home} exact />
              <Route path="/login" component={login} exact />
              <Route path="/signup" component={createacc} exact/>
          </Switch>
      </main>
  )
}

/*<Route path="/login" component={About} />
              <Route path="/createacc" component={Shop} />*/
export default App;
