package com.back_end.back_end.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.back_end.back_end.Repository.StudentRepository;
import com.back_end.back_end.Services.StudentServices;
import com.back_end.back_end.model.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class StudentController {
  @Autowired
  StudentServices StudentServices;
  StudentRepository studentRepository;

  @GetMapping("/students")
  public ResponseEntity<List<Student>> getallStudents(@RequestParam(required = false) String name) {
    
    return new ResponseEntity<>(StudentServices.findAll(),HttpStatus.OK);

  }

  

  @GetMapping("/students/{id}")
  public ResponseEntity<Student> getStudentById(@PathVariable("id") String id) {
    return StudentServices.getById(id);
  }

  @PostMapping("/students")
  public ResponseEntity<?> createStudent(@RequestBody Student student) {
    
     

      return new ResponseEntity<>( StudentServices.create(student),HttpStatus.CREATED);
    
      
    
  }

  // @PutMapping("/students/{id}")
  // public ResponseEntity<?> updateStudent(@PathVariable("id") String id, @RequestBody Student student) {

  //   return new ResponseEntity<>( StudentServices.update(id, student),HttpStatus.OK);
  // }
}