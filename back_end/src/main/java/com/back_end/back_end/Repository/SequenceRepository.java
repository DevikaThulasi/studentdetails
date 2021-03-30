package com.back_end.back_end.Repository;

import com.back_end.back_end.model.Sequence;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SequenceRepository extends MongoRepository<Sequence, String> {
    Sequence findByType(String type);
}
