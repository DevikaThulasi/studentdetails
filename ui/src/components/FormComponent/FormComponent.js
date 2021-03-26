import React, { useEffect, useState } from "react"

//matrial ui 
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import GridContainer from "../UiComponents/Grid/GridContainer"
import GridItem from "../UiComponents/Grid/GridItem"
import TableComponent from "../TableComponent/TableComponent";
import StudentService from '../../services/services'



const FormComponent = (props) => {


  const { rollno, setrollNo, name, setName, dob, setDob, gender, setGender, stud_class, setStud_Class, division, setDivision,
    isEdit, setEdit, id } = props
  const [Stud_List, setStud_List] = useState([]);

  const [btn_State, SetBtn_State] = useState(true);


  useEffect(() => {

    getStudentdetails()

  })


  const StudentData = (e) => {
    e.preventDefault()

    if (!isEdit) {
      let rollno;
      let temp = Stud_List.sort(unique);

      if (Stud_List.length > 0) {
        rollno = temp[Stud_List.length - 1].rollno;

        rollno = parseInt(rollno) + 1
      }
      else
        rollno = 100;

      const data = { rollno, name, division, stud_class, dob, gender }
      StudentService.create(data)

    } else {
      const data = { rollno, name, division, stud_class, dob, gender }
      console.log(name, "edited")
      console.log(id)
      StudentService.update(id, data).then(response => {
        console.log(response.data)
      })

    }
    
  }

  const getStudentdetails = () => {
    StudentService.getAll()
      .then(response => {

        if (response.data.length > 0) {

          setStud_List(response.data.sort(compare))
        }
      }).catch(e => { console.log(e); })
      //clear()
  }

  const compare = (a, b) => {
    //  Used for converting array in ascending order
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    }
    else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }



  const unique = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const rollnoA = a.rollno
    const rollnoB = b.rollno
    let comparison = 0;
    if (rollnoA > rollnoB) {
      comparison = 1;
    }
    else if (rollnoA < rollnoB) {
      comparison = -1;
    }
    return comparison;
  }

  const getValue = (e) => {
    setGender(e.target.value);
    SetBtn_State(false);
  }

  const validator = (ev) => {

    let data = ev.target.value;
    setName(data)
    //identifiying numeric values
    let matches = data.match(/\d+/g);
    if (matches != null) {
      let update = data.slice(0, -1);
      ev.target.value = update;
      setName(update)
    }

    //identifiying special symbols values
    let splChars = "!*|,\":<>[]{}`/';()@&$#%+-_^~?.=";
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < splChars.length; j++) {
        let A = splChars.charAt(j)
        let B = data.charAt(i)
        if (A === B) {
          let update = data.slice(0, -1);
          ev.target.value = update;
          setName(update)

        }
      }
    }

  }

  // const clear = () => {
  //   setName("")
  //   setDob("")
  //   setGender(null)
  //   setStud_Class("")
  //   setDivision("")
  //   SetBtn_State(true)
  //   setEdit(false);
  // }

  return (

    <div className="addbox">
      <form onSubmit={StudentData}>
        <GridContainer xs={12} sm={12} md={13}>

          <GridItem xs={12} sm={12} md={11}>
            <h1>STUDENT DETAILS</h1>
            <p>Fill up the corresponding fields to add a new student..</p>
          </GridItem>

          <GridItem xs={12} sm={12} md={11}>
            <TextField
              label="Name"
              
              id="name"
              required
              type="text"
              value={name}
              onChange={validator}
              variant="outlined"

              style={{ marginTop: 20 }}
              fullWidth />
          </GridItem>

          <GridItem xs={12} sm={12} md={5}>
            <FormLabel style={{ marginTop: 50 }} component="legend">Date Of Birth</FormLabel>
            <TextField
              variant="outlined"
              id="dob"
              type="date"
              value={dob}
              onChange={event => setDob(event.target.value)}
              required
              style={{ marginTop: 5 }}
              fullWidth />
          </GridItem>

          <GridItem xs={12} sm={12} md={5} style={{ marginLeft: 25 }}>
            <FormControl style={{ marginTop: 50 }} >
              <FormLabel >Gender</FormLabel>
              <RadioGroup style={{ marginTop: 10 }} required value={gender} onChange={getValue} >
                <GridContainer xs={12} sm={12} md={13}>

                  <GridItem xs={12} sm={12} md={6}>
                    <FormControlLabel value="female" style={{ marginLeft: 10 }} control={<Radio />} label="Female" />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <FormControlLabel value="male" style={{ marginLeft: 30 }} control={<Radio />} label="Male" />
                  </GridItem>

                </GridContainer>
              </RadioGroup>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={12} md={7} >
            <FormControl variant="outlined" fullWidth
              style={{ marginTop: 50, paddingRight: 30 }}>
              <InputLabel>Class</InputLabel>
              <Select style={{ marginTop: 20 }} id="class" native fullWidth required value={stud_class} onChange={event => setStud_Class(event.target.value)} >
                <option value="I"> I</option>
                <option value="II"> II</option>
                <option value="III"> III</option>
                <option value="IV"> IV</option>
                <option value="V"> V</option>
                <option value="VI"> VI</option>
                <option value="VII"> VII</option>
                <option value="VIII"> VIII</option>
                <option value="IX"> IX</option>
                <option value="X"> X</option>
                <option value="XI"> XI</option>
                <option value="XII"> XII</option>
              </Select>
            </FormControl>
          </GridItem>


          <GridItem xs={12} sm={12} md={4} >
            <FormControl variant="outlined" fullWidth style={{ marginTop: 50 }} >
              <InputLabel>Division</InputLabel>
              <Select style={{ marginTop: 20 }} id="division" native fullWidth required value={division} onChange={event => setDivision(event.target.value)}  >
                <option value="A"> A</option>
                <option value="B"> B</option>
                <option value="C"> C</option>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={12} md={11} >
            <Button fullWidth type="submit" disabled={btn_State} style={{ marginTop: 30, backgroundColor: "#026B68", height: 50, color: "white" }}>Submit </Button>
          </GridItem>

        </GridContainer>

      </form>

    </div>


  )
}





//========================return / render =======================================================


export default FormComponent;
