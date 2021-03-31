package com.back_end.back_end.Services;

import com.back_end.back_end.Repository.SequenceRepository;
import com.back_end.back_end.model.Sequence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SequenceImpl implements SequenceServices {
    @Autowired
    SequenceRepository sequenceRepository;

    public Sequence getNextSequence(String type) {
        return sequenceRepository.findByType(type);
    }

    public Sequence saveSequence(Sequence sequence) {
        return sequenceRepository.save(sequence);
    }
}
