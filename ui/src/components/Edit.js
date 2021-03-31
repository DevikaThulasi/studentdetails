import React, { useState, useEffect } from "react"


import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import GridContainer from "./UiComponents/Grid/GridContainer"
import GridItem from "./UiComponents/Grid/GridItem"
import StudentService from "../services/services"
import { useParams, withRouter, } from "react-router";

const Edit = (props) => {

  
  const { id } = useParams()
  const [name, setName] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const [stud_class, setStud_Class] = useState(null);
  const [division, setDivision] = useState(null);
  const [rollno, setrollNo] = useState(null)
  const [btn_State, SetBtn_State] = useState(true);
  const [dateAlert, setDateAlert] = useState("");
useEffect(()=>{
  if (dateAlert === " ") {
    SetBtn_State(false)
  } else SetBtn_State(true)

},[dateAlert])


  useEffect(() => {

    StudentService.get(id)
      .then(response => {
        setrollNo(response.data.rollno)
        setName(response.data.name)
        setDob(response.data.dob)
        setGender(response.data.gender)
        setStud_Class(response.data.stud_class)
        setDivision(response.data.division)
        
    
      })
    

  }, [])


  const StudentData = (e) => {
    e.preventDefault()


    const data = { rollno, name, division, stud_class, dob, gender }
    console.log(name, "edited")
    console.log(id)
    StudentService.update(id, data).then(response => {
      console.log(response.data)

    }
    )
    props.history.push("/tablecomponent")
    clear()
  }




  const dateValidator = (a) => {
    let todaysDate = new Date();
    let year = todaysDate.getFullYear();

    let month = ("0" + (todaysDate.getMonth() + 1)).slice(-2);

    let day = ("0" + todaysDate.getDate()).slice(-2);
    let minDate = (year + "-" + month + "-" + day); // Results in "YYYY-MM-DD" for today's date 
    let d1 = Date.parse(minDate);
    let d2 = Date.parse(a.target.value);

    if (d1 < d2) {
      setDateAlert("Enter a valid date")

    } else
      setDateAlert(" ");
    setDob(a.target.value);

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

  const getValue = (e) => {
    setGender(e.target.value);
    //SetBtn_State(false);
  }


  const clear = () => {
    setName("")
    setDob("")
    setGender(null)
    setStud_Class("")
    setDivision("")
    SetBtn_State(true)

  }
  return (


    <div className="addbox">
      <form onSubmit={StudentData}>
        <GridContainer xs={12} sm={12} md={13}>

          <GridItem xs={12} sm={12} md={11}>
            <h1>EDIT STUDENT DETAILS </h1>
            <p>Edit the required details..</p>
          </GridItem>

          <GridItem xs={12} sm={12} md={11}>
            <TextField
              placeholder="Name"

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
            <h6 style={{ marginTop: 40, color: "red" }}>{dateAlert}</h6>
            <FormLabel style={{ marginTop: 10 }} component="legend">Date Of Birth</FormLabel>
            <TextField
              variant="outlined"
              id="dob"
              type="date"
              value={dob}
              onChange={event => { dateValidator(event) }}
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
            <Button fullWidth type="submit" disabled={btn_State} style={{ marginTop: 30, backgroundColor: "#026B68", height: 50, color: "white" }}>Update </Button>
          </GridItem>

        </GridContainer>

      </form>

    </div>


  )
}


export default withRouter(Edit);