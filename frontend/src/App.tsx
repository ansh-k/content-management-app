import React from 'react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';

import HomePage from './components/home';
import AddEditPage from './components/addEdit';
import ViewPage from './components/view';
import Header from './components/header';

const App = (props: any) => {
  return (
    <div className='App'>
      <Header  {...props} />
      <main>
        <Switch>
          <Route
            exact
            path='/'
            component={HomePage}
          />
          <Route
            exact
            path='/add-new'
            component={AddEditPage}
          />
          <Route
            exact
            path='/edit/:id'
            component={AddEditPage}
          />
          <Route
            exact
            path='/view/:id'
            component={ViewPage}
          />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(App);
