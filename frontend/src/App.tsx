import React from 'react';
import { Route, Switch } from 'react-router';
import { useTranslation } from "react-i18next";


import HomePage from './components/home';
import AddEditPage from './components/addEdit';
import ViewPage from './components/view';

function App(props: any) {
  const { t, } = useTranslation();

  return (
    <div className='App'>
      <section className='text-center'>
        <h1>{t("APP_TITLE")}</h1>
      </section>
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

export default App;
