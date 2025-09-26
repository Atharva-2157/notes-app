package com.adcoder.notes.service;

import com.adcoder.notes.dto.NotesDto;
import com.adcoder.notes.exception.NotesException;
import com.adcoder.notes.mapper.NotesMapper;
import com.adcoder.notes.model.Notes;
import com.adcoder.notes.repository.NotesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotesService {
    private final NotesRepository notesRepository;

    private Notes getNoteById(Long noteId) {
        return notesRepository.findById(noteId).orElseThrow(() ->
                new NotesException("Note not found with ID = " + noteId, HttpStatus.NOT_FOUND)
        );
    }

    public NotesDto createNote(NotesDto notesDto) {
        Notes notes = NotesMapper.toEntity(notesDto);
        notes.setCreatedAt(OffsetDateTime.now());
        notes.setUpdatedAt(OffsetDateTime.now());
        notes = notesRepository.save(notes);
        return NotesMapper.toDto(notes);
    }

    public NotesDto getNote(Long noteId) {
        return NotesMapper.toDto(getNoteById(noteId));
    }

    public List<NotesDto> getAllNotes() {
        return notesRepository.findAll().stream().map(NotesMapper::toDto).toList();
    }

    public NotesDto updateNote(Long noteId, NotesDto noteDto) {
        Notes notes = getNoteById(noteId);
        notes.setTitle(noteDto.getTitle());
        notes.setContent(noteDto.getContent());
        notes.setUpdatedAt(OffsetDateTime.now());

        notes = notesRepository.save(notes);

        return NotesMapper.toDto(notes);
    }

    public void deleteNote(Long noteId) {
        Notes note = getNoteById(noteId);
        notesRepository.delete(note);
    }
}
