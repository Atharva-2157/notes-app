package com.adcoder.notes.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotesException extends RuntimeException {
    private final HttpStatus status;

    public NotesException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
