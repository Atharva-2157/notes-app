import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Container, TextField, Button, Grid, Typography, Box,
	CircularProgress, Alert, Switch, FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import NoteCard from './components/NoteCard';
import { useThemeContext } from './ThemeContextProvider'; // Import the context hook

interface Note {
	id: number;
	title: string;
	content: string;
}

function App() {
	const { mode, toggleTheme } = useThemeContext();
	const [notes, setNotes] = useState<Note[]>([]);
	const [newNote, setNewNote] = useState<Omit<Note, 'id'>>({ title: '', content: '' });
	const [editingNote, setEditingNote] = useState<Note | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchNotes = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await axios.get(`/api/notes/`);
			setNotes(res.data.data);
		} catch (err) {
			console.error('Error fetching notes', err);
			setError('Failed to fetch notes. Please check the backend connection.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	const addNote = async () => {
		if (!newNote.title.trim() || !newNote.content.trim()) {
			alert('Title and content cannot be empty.');
			return;
		}
		try {
			setIsLoading(true);
			await axios.post(`/api/notes/`, newNote);
			setNewNote({ title: '', content: '' });
			fetchNotes();
		} catch (err) {
			console.error('Error adding note', err);
			setError('Failed to add the note.');
		}
	};

	const updateNote = async (id: number) => {
		if (!editingNote || !editingNote.title.trim() || !editingNote.content.trim()) {
			alert('Title and content cannot be empty.');
			return;
		}
		try {
			setIsLoading(true);
			await axios.put(`/api/notes/${id}`, editingNote);
			setEditingNote(null);
			fetchNotes();
		} catch (err) {
			console.error('Error updating note', err);
			setError('Failed to update the note.');
		}
	};

	const deleteNote = async (id: number) => {
		if (window.confirm('Are you sure you want to delete this note?')) {
			try {
				setIsLoading(true);
				await axios.delete(`/api/notes/${id}`);
				fetchNotes();
			} catch (err) {
				console.error('Error deleting note', err);
				setError('Failed to delete the note.');
			}
		}
	};

	const renderAddNoteForm = () => (
		<Box
			component="section"
			sx={{
				mb: 4,
				p: 3,
				borderRadius: 2,
				boxShadow: 3,
				bgcolor: 'background.paper',
				borderLeft: '5px solid',
				borderColor: 'primary.main',
			}}
		>
			<Typography variant="h5" component="h2" gutterBottom color="primary">
				Add a Note 📝
			</Typography>
			<Grid container spacing={2}>
				<Grid size={{ xs: 12 }}>
					<TextField
						fullWidth
						label="Title"
						variant="outlined"
						value={newNote.title}
						onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
						margin="normal"
						color="primary"
					/>
				</Grid>
				<Grid size={{ xs: 12 }}>
					<TextField
						fullWidth
						label="Content"
						multiline
						rows={4}
						variant="outlined"
						value={newNote.content}
						onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
						margin="normal"
						color="primary"
					/>
				</Grid>
				<Grid size={{ xs: 12 }}>
					<Button
						variant="contained"
						onClick={addNote}
						startIcon={<AddIcon />}
						sx={{ mt: 1 }}
						disabled={isLoading}
						color="secondary"
					>
						Add Note
					</Button>
				</Grid>
			</Grid>
		</Box>
	);

	const renderNotesList = () => (
		<Box component="section" sx={{ mb: 4 }}>
			<Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
				All Notes 📚
			</Typography>

			{error && (
				<Alert severity="error" sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			{isLoading && notes.length === 0 ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
					<CircularProgress color="primary" />
				</Box>
			) : notes.length === 0 ? (
				<Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary', p: 2 }}>
					No notes yet... Get started by adding one!
				</Typography>
			) : (
				<Grid container spacing={3}>
					{notes.map((note) => (
						<NoteCard
							key={note.id}
							note={note}
							editingNote={editingNote}
							setEditingNote={setEditingNote}
							updateNote={updateNote}
							deleteNote={deleteNote}
							isLoading={isLoading}
						/>
					))}
				</Grid>
			)}
		</Box>
	);

	return (
		<Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
			<header>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
					<Typography
						variant="h3"
						component="h1"
						sx={{ fontWeight: 'bold', color: 'primary.main' }}
					>
						Notes App
					</Typography>

					<FormControlLabel
						control={
							<Switch
								checked={mode === 'dark'}
								onChange={toggleTheme}
								color="default"
							/>
						}
						label={
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								{mode === 'light' ? (
									<WbSunnyIcon color="warning" sx={{ mr: 0.5 }} />
								) : (
									<ModeNightIcon color="primary" sx={{ mr: 0.5 }} />
								)}
								<Typography variant="body1">
									{mode === 'light' ? 'Light Mode' : 'Dark Mode'}
								</Typography>
							</Box>
						}
					/>
				</Box>
			</header>

			{renderAddNoteForm()}
			{renderNotesList()}
		</Container>
	);
}

export default App;
