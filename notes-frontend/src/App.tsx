import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Omit<Note, "id">>({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`/api/notes/`);
      setNotes(res.data.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    try {
      await axios.post(`/api/notes/`, newNote);
      setNewNote({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      console.error("Error adding note", err);
    }
  };

  const updateNote = async (id: number) => {
    if (!editingNote) return;
    try {
      await axios.put(`/api/notes/${id}`, editingNote);
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      console.error("Error updating note", err);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>📒 Notes App</h1>
      </header>

      {/* Add Note */}
      <section className="add-note">
        <h2>Add a Note</h2>
        <input
          type="text"
          placeholder="Enter title..."
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Write your content here..."
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={addNote}>➕ Add Note</button>
      </section>

      {/* Notes List */}
      <section className="notes-list">
        <h2>All Notes</h2>
        {notes.length === 0 ? (
          <p className="empty">No notes yet...</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              {editingNote?.id === note.id ? (
                <>
                  <input
                    type="text"
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  />
                  <textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                  />
                  <div className="actions">
                    <button className="save" onClick={() => updateNote(note.id)}>💾 Save</button>
                    <button className="cancel" onClick={() => setEditingNote(null)}>✖ Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <div className="actions">
                    <button className="edit" onClick={() => setEditingNote(note)}>✏ Edit</button>
                    <button className="delete" onClick={() => deleteNote(note.id)}>🗑 Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
