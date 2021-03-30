package com.back_end.back_end.Services;

import java.util.List;

import com.back_end.back_end.model.Student;

import org.springframework.http.ResponseEntity;

public interface StudentServices {

    List<Student> findAll();

    Student create(Student student);

    String update(String id, Student student);

    ResponseEntity<Student> getById(String id);
}
