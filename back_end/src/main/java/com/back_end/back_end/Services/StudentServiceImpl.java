package com.back_end.back_end.Services;

import java.util.List;
import java.util.Optional;

import com.back_end.back_end.Repository.StudentRepository;
import com.back_end.back_end.model.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class StudentServiceImpl implements StudentServices {

  @Autowired
  private StudentRepository studentRepository;

  @Override
  public

      List<Student> findAll() {
    List<Student> studList = studentRepository.findAll();
    return studList;

  }

  @Override
  public String create(Student student) {

    studentRepository.save(new Student(student.getRollno(), student.getName(), student.getDob(),
        student.getStud_class(), student.getDivision(), student.getGender()));

    return "successfull";

  }

  @Override
  public String update( String id, Student student) {
    
      Optional<Student> studentData = studentRepository.findById(id);

      if (studentData.isPresent()) {
        Student _Student = studentData.get();
        _Student.setRollno(student.getRollno());

        _Student.setName(student.getName());
        _Student.setDob(student.getDob());
        _Student.setStud_class(student.getStud_class());
        _Student.setDivision(student.getDivision());
        studentRepository.save(_Student);

        return "successfull";
      } 
   else return "unsuccessfull";
   
  }

  @Override
  public ResponseEntity<Student> getById(@PathVariable("id") String id) {
    Optional<Student> stud = studentRepository.findById(id);
    return new ResponseEntity<>(stud.get(), HttpStatus.OK);
  }
}
