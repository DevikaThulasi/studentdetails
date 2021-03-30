package com.back_end.back_end.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "id_list")
public class Sequence {
    @Id
    private String id;
    private String type;
    private String prefix;
    private int next_sequence;

    public Sequence() {

    }

    public Sequence(String id,String type, String prefix, int next_sequence) {
        this.prefix = prefix;
        this.next_sequence = next_sequence;
        this.type = type;
        this.id=id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public int getNext_sequence() {
        return next_sequence;
    }

    public void setNext_sequence(int next_sequence) {
        this.next_sequence = next_sequence;
    }

    @Override
    public String toString() {
        return "Sequence [id=" + id + "type=" + type + ",prefix=" + prefix + " next_sequence=" + next_sequence + "]";
    }

    public String getRollNo() {
        return prefix + "-" + next_sequence;
    }
}
