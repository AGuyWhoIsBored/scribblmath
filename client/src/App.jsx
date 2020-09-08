import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './css/App.css';
import home from './components/home';
import createacc  from './components/createacc';
import login from './components/login'; 
import main from './components/main';

function NoMatchPage ()  {
    return (
      <h3>404 - Not found</h3>
    );
  };

function App() {
    return (
      <main>
          <Switch>
              <Route path="/" component={home} exact />
              <Route path="/login" component={login} exact />
              <Route path="/signup" component={createacc} exact/>
              <Route path="/main" component={main} extact/>
              <Route component={NoMatchPage}/>
          </Switch>
      </main>
  )
}

export default App;