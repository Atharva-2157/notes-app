package com.adcoder.notes.mapper;

import com.adcoder.notes.dto.NotesDto;
import com.adcoder.notes.model.Notes;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class NotesMapper {
    public static Notes toEntity(NotesDto notesDto) {
        return Notes.builder()
                .title(notesDto.getTitle())
                .content(notesDto.getContent())
                .build();
    }

    public static NotesDto toDto(Notes notes) {
        return NotesDto.builder()
                .id(notes.getId())
                .title(notes.getTitle())
                .content(notes.getContent())
                .build();
    }
}
