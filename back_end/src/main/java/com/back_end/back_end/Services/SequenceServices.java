package com.back_end.back_end.Services;

import com.back_end.back_end.model.Sequence;

public interface SequenceServices {

    public Sequence getNextSequence(String type);

    public Sequence saveSequence(Sequence sequence);

}
