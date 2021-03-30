
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FormComponent from './components/FormComponent/FormComponent'

import TableComponent from './components/TableComponent/TableComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import Edit from "./components/Edit"
import { Route, Switch, withRouter } from 'react-router';

const App = () => {



  return (
    <div >
      <Header />

      <Switch>
        <div className="mainContainer">
          <Route exact path="/">
            <FormComponent
            />
          </Route>
          <Route path="/tablecomponent">
            <TableComponent />
          </Route>

          <Route path="/edit/:id"><Edit />

          </Route>

        </div>
      </Switch>



      <Footer />
    </div>
  );

}

export default withRouter(App);