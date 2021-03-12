import React, { useEffect, useState  } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StudentService from "../../services/services"
 const TableComponent=()=>
 {
   
      
    const [Temp_View, setTemp] = useState([]);

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

    const compare=(a, b)=> //converting array in ascending order
 {
// Use toUpperCase() to ignore character casing
const nameA = a.name.toUpperCase();
const nameB = b.name.toUpperCase();
let comparison = 0;
    if (nameA > nameB) 
    {
    comparison = 1;
    } 
    else if (nameA < nameB)
    {
    comparison = -1;
    }
return comparison;
}
return(

    
        <TableContainer component={Paper} style={{minHeight:550,borderRadius:10}}>
            <Table  >
                <TableHead style={{backgroundColor:"#79C4BF",color:"white"}}>
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
                    Temp_View.map(stud =>(
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




 export default TableComponent;