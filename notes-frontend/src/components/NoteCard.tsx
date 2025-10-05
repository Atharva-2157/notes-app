import React from 'react';
import {
    Card, CardContent, CardActions, Typography, Box, TextField, Button, Grid, useTheme
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Note {
    id: number;
    title: string;
    content: string;
}

interface NoteCardProps {
    note: Note;
    editingNote: Note | null;
    setEditingNote: React.Dispatch<React.SetStateAction<Note | null>>;
    updateNote: (id: number) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    isLoading: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({
    note,
    editingNote,
    setEditingNote,
    updateNote,
    deleteNote,
    isLoading
}) => {
    const isEditing = editingNote?.id === note.id;
    const theme = useTheme();

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
                variant="elevation"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    borderLeft: `5px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 8,
                    },
                }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    {isEditing ? (
                        <>
                            <TextField
                                fullWidth
                                label="Title"
                                value={editingNote.title}
                                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                                margin="dense"
                                size="small"
                                color="secondary"
                            />
                            <TextField
                                fullWidth
                                label="Content"
                                multiline
                                rows={4}
                                value={editingNote.content}
                                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                                margin="dense"
                                color="secondary"
                            />
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" component="h3" gutterBottom color="primary">
                                {note.title}
                            </Typography>
                            <Box sx={{ maxHeight: 150, overflow: 'hidden' }}>
                                <Typography variant="body2" color="text.primary">
                                    {note.content}
                                </Typography>
                            </Box>
                        </>
                    )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                    {isEditing ? (
                        <>
                            <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                startIcon={<SaveIcon />}
                                onClick={() => updateNote(note.id)}
                                disabled={isLoading}
                            >
                                Save
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<CancelIcon />}
                                onClick={() => setEditingNote(null)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                size="small"
                                startIcon={<EditIcon />}
                                onClick={() => setEditingNote(note)}
                                disabled={isLoading}
                                color="primary"
                            >
                                Edit
                            </Button>
                            <Button
                                size="small"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => deleteNote(note.id)}
                                disabled={isLoading}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default NoteCard;
