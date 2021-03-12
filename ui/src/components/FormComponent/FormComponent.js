import React, { useEffect, useState  } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import GridContainer from "../UiComponents/Grid/GridContainer"
import GridItem from "../UiComponents/Grid/GridItem"
import StudentService from "../../services/services"

 const FormComponent=()=>
 {

    const [value, setValue] = useState(null);
    const [Temp_View, setTemp] = useState([]);
    const [name, setName]=useState(null);
    const [division, setDivision]=useState(null);
    const [stud_class, setStud_Class]=useState(null);
    const [dob, setDob]=useState(null);
    const [gender, setGender]=useState(null);
    const[btn_State,SetBtn_State]=useState(true);

    

    const validator=(ev)=> // used for validating name field 
{
let data =ev.target.value;
setName(data)
//identifiying numeric values
let matches = data.match(/\d+/g); 
if (matches != null)
        {
        let update=data.slice(0, -1);
        ev.target.value=update;
        setName(update)
        }

//identifiying special symbols values
let splChars = "!*|,\":<>[]{}`/';()@&$#%+-_^~?.=";
    for(let i=0; i<data.length;i++)
    {
        for(let j=0;j<splChars.length;j++)
        {
            let A = splChars.charAt(j)
            let B = data.charAt(i)
            if(A === B)
                {
                let update=data.slice(0, -1);
                ev.target.value=update;
                setName(update)
            
                }
        }
    }
}

const onChangeValue=(event) => {
    setValue(event.target.value);
    SetBtn_State(false);
      
      }
    
     
      const  StudentData = e =>
      {
        e.preventDefault();
        let count;
        const{Stud_List}=this.state
    
        let Temp = Stud_List.sort(this.unique)
                 if(Stud_List.length > 0)
                 {
                     count =Stud_List[Stud_List.length-1].rollno;  
                 }
                 else count=100;
        
        
        let rollno =parseInt(count)+1;
       
        let data={ rollno,name,division,stud_class,dob,gender }
     
        StudentService.create(data)
        this.getStudentList();  
        this.setState({cls:true})
     this.clear();
    
      }
    
      const getStudentList=()=>
      {
          this.setState({Temp_View:[],Stud_List:[]})
       StudentService.getAll()
       .then(content =>{
           if(content.data.length> 0)
           {
              this.setState({Stud_List:content.data}); 
              this.setState({Temp_View:content.data.sort(this.compare)});
           }
          })
          .catch(e=>{console.log(e);
          });
      }

      const unique=(a, b)=>
{
// Use toUpperCase() to ignore character casing
const rollnoA = a.rollno
const rollnoB = b.rollno
let comparison = 0;
if (rollnoA > rollnoB) 
        {
            comparison = 1;
        }
 else if (rollnoA < rollnoB) 
        {
            comparison = -1;
        }
return comparison;
}

const clear=()=>
{
    document.getElementById("name").value="";
    document.getElementById("division").value="";
    document.getElementById("class").value="";
    document.getElementById("dob").value="";

}


return(

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
                    onChange={event => setDob(event.target.value)}
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
                    <Select style={{ marginTop: 20 }} id="class" native fullWidth required  onChange={event => setStud_Class(event.target.value)} >
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
                    <Select style={{ marginTop: 20 }} id="division" native fullWidth required onChange={event => setDivision(event.target.value)}  >
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
 export default FormComponent;