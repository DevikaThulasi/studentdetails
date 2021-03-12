
import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import GridContainer from './components/UiComponents/Grid/GridContainer';
import GridItem from './components/UiComponents/Grid/GridItem';
import FormComponent from "./components/FormComponent/FormComponent";
import TableComponent from "./components/TableComponent/TableComponent";
class App extends Component {
  
  render() { 
    return ( 
      <div className="mcontainer">
      
         <GridContainer lg={12}>

        <GridItem lg={5}><FormComponent/></GridItem>
        <GridItem lg={7}><TableComponent/></GridItem>
         </GridContainer>
        </div>
     );
  }
}
 
export default App;