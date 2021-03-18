
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FormComponent from './components/FormComponent/FormComponent'
import GridContainer from './components/UiComponents/Grid/GridContainer';

import GridItem from './components/UiComponents/Grid/GridItem';
import TableComponent from './components/TableComponent/TableComponent';

const App=()=> {

  const[name,setName]=useState(null);
  const[dob,setDob]=useState(null);
  const[gender,setGender]=useState(null);
  const [stud_class,setStud_Class]=useState(null);
  const [division,setDivision]=useState(null);
  const[id,setId]=useState(null)

  const[isEdit,setEdit]=useState(false);
    const editdet = (studentdet) => {
      console.log(studentdet);
      if(studentdet){
        setName(studentdet.name)
        setDob(studentdet.dob)
        setGender(studentdet.gender)
        setStud_Class(studentdet.stud_class)
        setDivision(studentdet.division)
        setEdit(true)
        setId(studentdet.id)

      }
    }
    return (
      <div className="mcontainer">

        <GridContainer lg={12}>

          <GridItem lg={5}><FormComponent 
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

          /></GridItem>
          <GridItem lg={6}><TableComponent editdet={editdet} /></GridItem>
        </GridContainer>

      </div>
    );
  
}

export default App;