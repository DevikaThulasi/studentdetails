
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FormComponent from './components/FormComponent/FormComponent'
import GridContainer from './components/UiComponents/Grid/GridContainer';

import GridItem from './components/UiComponents/Grid/GridItem';
import TableComponent from './components/TableComponent/TableComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import Edit from "./components/Edit"
import { Route, Switch, withRouter } from 'react-router';

const App = () => {

  const [name, setName] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const [stud_class, setStud_Class] = useState(null);
  const [division, setDivision] = useState(null);
  const [id, setId] = useState(null)
  const [rollno,setrollNo]=useState(null)

  const [isEdit, setEdit] = useState(false);


  const editdet = (studentdet,props) => {
    console.log(studentdet);
    if (studentdet) {
      setName(studentdet.name)
      setDob(studentdet.dob)
      setGender(studentdet.gender)
      setStud_Class(studentdet.stud_class)
      setDivision(studentdet.division)
      setEdit(true)
      setId(studentdet.id)
      setrollNo(studentdet.rollno)
      
    }
  }
  return (
    <div >
      <Header />

      <Switch>
        <div className="mainContainer">
          <Route exact path="/">
            <FormComponent
            name={name}
            setName={setName}
            dob={dob}
            setDob={setDob}
            gender={gender}
            setGender={setGender}
            stud_class={stud_class}
            setStud_Class={setStud_Class}
            division={division}
            setDivision={setDivision}
            isEdit={isEdit}
            setEdit={setEdit}
            id={id}
            rollno={rollno}
            setrollNo={setrollNo}
              
            />
          </Route>
          <Route path="/tablecomponent">
            <TableComponent editdet={editdet} />
          </Route>

          <Route path="/edit/:id"><Edit
          
              name={name}
              setName={setName}
              dob={dob}
              setDob={setDob}
              gender={gender}
              setGender={setGender}
              stud_class={stud_class}
              setStud_Class={setStud_Class}
              division={division}
              setDivision={setDivision}
              isEdit={isEdit}
              setEdit={setEdit}
              id={id}
              rollno={rollno}
              setrollNo={setrollNo}/></Route>
          
        </div>
      </Switch>



      <Footer />
    </div>
  );

}

export default withRouter(App);