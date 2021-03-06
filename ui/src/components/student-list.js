
import React, { useEffect, useState } from 'react';
import StudentService from "../services/services"
import GridContainer from "../components/UiComponents/Grid/GridContainer"
import GridItem from "../components/UiComponents/Grid/GridItem"
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const StudentDetails = () => {

  useEffect(() => { getData(); })

  const [Stud_List, setStud_List] = useState([]);
  const [value, setValue] = useState(null);
  
  const getData = () => {
    StudentService.getAll()
      .then(response => {
        if (response.Data.Datalength > 0) {
          setStud_List(response.Data.sort(compare))
        }
      }).catch(e => { console.log(e); })
  }

  const compare = (a, b) => //converting array in ascending order
  {
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



  const validator = (ev) => // used for validating name field 
  {
    let data = ev.target.value;

    //identifiying numeric values
    let matches = data.match(/\d+/g);
    if (matches != null) {
      let update = data.slice(0, -1);
      ev.target.value = update;
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
        }
      }
    }
  }




  const onChangeValue = (event) => {
    setValue(event.target.value);

  }





  const StudentData = e => {
    e.preventDefault();
    let count;
    const { Stud_List } = this.state

    let Temp = Stud_List.sort(this.unique)
    if (Stud_List.length > 0) {
      count = Stud_List[Stud_List.length - 1].rollno;
    }
    else count = 100;

    let name = document.getElementById("name").value;
    let division = document.getElementById("division").value;
    let stud_class = document.getElementById("class").value;
    let dob = document.getElementById("dob").value;
    let gender = this.state.value;
    let rollno = parseInt(count) + 1;

    let data = { rollno, name, division, stud_class, dob, gender }

    StudentService.create(data)
    this.getStudentList();
    this.setState({ cls: true })
    this.clear();

  }

  const AddStudentComponent = () => {

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
                required
                style={{ marginTop: 5 }}
                fullWidth />
            </GridItem>

            <GridItem xs={12} sm={12} md={5} style={{ marginLeft: 25 }}>
              <FormControl style={{ marginTop: 50 }} >
                <FormLabel >Gender</FormLabel>
                <RadioGroup style={{ marginTop: 10 }} required value={value} onChange={onChangeValue} >
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
                <Select style={{ marginTop: 20 }} id="class" native fullWidth required  >
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
                <Select style={{ marginTop: 20 }} id="division" native fullWidth required onChange={() => this.getDivision}  >
                  <option value="A"> A</option>
                  <option value="B"> B</option>
                  <option value="C"> C</option>
                </Select>
              </FormControl>
            </GridItem>

            <GridItem xs={12} sm={12} md={11} >
              <Button fullWidth type="submit" style={{ marginTop: 30, backgroundColor: "#026B68", height: 50, color: "white" }}>Submit </Button>
            </GridItem>

          </GridContainer>

        </form>

      </div>
    )
  }




  const RenderSwitch = () => {

    return (
      <TableContainer component={Paper} style={{ minHeight: 550, borderRadius: 10 }}>
        <Table  >
          <TableHead style={{ backgroundColor: "#79C4BF", color: "white" }}>
            <TableRow>
              <TableCell align="center">Roll No</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Date of Birth</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Class</TableCell>
              <TableCell align="center">Division</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Stud_List.map(stud => (
                <TableRow>
                  <TableCell align="center">{stud.rollno}</TableCell>
                  <TableCell align="center">{stud.name}</TableCell>
                  <TableCell align="center">{stud.dob}</TableCell>
                  <TableCell align="center">{stud.gender}</TableCell>
                  <TableCell align="center">{stud.stud_class}</TableCell>
                  <TableCell align="center">{stud.division}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (

    <div>

      <GridContainer lg={12}>
        <GridItem lg={5}>{AddStudentComponent()}</GridItem>
        <GridItem lg={7}>{RenderSwitch()}</GridItem>
      </GridContainer>
    </div>

  )
}
export default StudentDetails;