package com.adcoder.notes.controllers;

import com.adcoder.notes.common.ApiResponse;
import com.adcoder.notes.dto.NotesDto;
import com.adcoder.notes.service.NotesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class NotesController {

    private final NotesService notesService;

    @PostMapping("/")
    public ResponseEntity<ApiResponse<NotesDto>> createNote(@RequestBody NotesDto notesDto) {
        NotesDto createdNote = notesService.createNote(notesDto);
        String message = "Note created successfully";
        ApiResponse<NotesDto> response = ApiResponse.<NotesDto>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message(message)
                .timestamp(OffsetDateTime.now())
                .data(createdNote)
                .build();
        log.info(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<NotesDto>> getNote(@PathVariable("id") Long id) {
        NotesDto note = notesService.getNote(id);
        String message = "Note fetched successfully";
        ApiResponse<NotesDto> response = ApiResponse.<NotesDto>builder()
                .statusCode(HttpStatus.OK.value())
                .message(message)
                .timestamp(OffsetDateTime.now())
                .data(note)
                .build();
        log.info(message);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse<List<NotesDto>>> getAllNotes() {
        List<NotesDto> notes = notesService.getAllNotes();
        String message = "All notes fetched successfully";
        ApiResponse<List<NotesDto>> response = ApiResponse.<List<NotesDto>>builder()
                .statusCode(HttpStatus.OK.value())
                .message(message)
                .timestamp(OffsetDateTime.now())
                .data(notes)
                .build();
        log.info(message);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<NotesDto>> updateNote(
            @PathVariable("id") Long id,
            @RequestBody NotesDto notesDto) {
        NotesDto updatedNote = notesService.updateNote(id, notesDto);
        String message = "Note updated successfully";
        ApiResponse<NotesDto> response = ApiResponse.<NotesDto>builder()
                .statusCode(HttpStatus.OK.value())
                .message(message)
                .timestamp(OffsetDateTime.now())
                .data(updatedNote)
                .build();
        log.info(message);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNote(@PathVariable("id") Long id) {
        notesService.deleteNote(id);
        String message = "Note deleted successfully";
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .statusCode(HttpStatus.OK.value())
                .message(message)
                .timestamp(OffsetDateTime.now())
                .build();
        log.info(message);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
