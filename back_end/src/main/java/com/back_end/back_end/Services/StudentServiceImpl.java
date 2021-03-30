package com.back_end.back_end.Services;

import java.util.List;
import java.util.Optional;

import com.back_end.back_end.Repository.StudentRepository;
import com.back_end.back_end.model.Sequence;
import com.back_end.back_end.model.Student;
import com.back_end.back_end.Common.Constants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;


@Service
public class StudentServiceImpl implements StudentServices {

  @Autowired
  private StudentRepository studentRepository;
  @Autowired
  private SequenceServices sequenceServices;

  @Override
  public

      List<Student> findAll() {
    List<Student> studList = studentRepository.findAll();
    return studList;

  
}
  @Override
  public Student create(Student student) {

    Sequence sequence = sequenceServices.getNextSequence(Constants.SEQUENCE_TYPE_ROLL_NO);
    if (null != sequence) {
      String rollNo = sequence.getRollNo();
      Sequence newSequence = new Sequence(sequence.getId(),sequence.getType(), sequence.getPrefix(),sequence.getNext_sequence() + 1);
      sequenceServices.saveSequence(newSequence);
      return studentRepository.save(new Student(rollNo, student.getName(), student.getDob(), student.getStud_class(),
      student.getDivision(), student.getGender()));
    } else {
      Sequence newSequence = new Sequence();
      newSequence.setType(Constants.SEQUENCE_TYPE_ROLL_NO);
      newSequence.setPrefix(Constants.SEQUENCE_PREFIX_ROLL_NO);
      newSequence.setNext_sequence(101);
      sequenceServices.saveSequence(newSequence);
      String rollNo = Constants.SEQUENCE_PREFIX_ROLL_NO + "-" + 100;
      return studentRepository.save(new Student(rollNo, student.getName(), student.getDob(), student.getStud_class(),
          student.getDivision(), student.getGender()));

    }
    


  }

  @Override
  public String update(String id, Student student) {

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
    } else
      return "unsuccessfull";

  }

  @Override
  public ResponseEntity<Student> getById(@PathVariable("id") String id) {
    Optional<Student> stud = studentRepository.findById(id);
    return new ResponseEntity<>(stud.get(), HttpStatus.OK);
  }
}
