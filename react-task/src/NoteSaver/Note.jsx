import React, { useState, useRef, useEffect } from "react";
import "./Note.css";

export default function Text() {
  const [current, setCurrent] = useState("");
  const inputRef = useRef(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function AddNotes() {
    if (current.trim() === "") {
      return;
    }

    const timestamp = new Date().toLocaleString();
    const newNote = { id: Date.now(), text: current, time: timestamp };
    setNotes([newNote, ...notes]);
    setCurrent("");
    inputRef.current?.focus();
  }

  function handleDeleteNote(idToDelete) {
    const updatedNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(updatedNotes);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      AddNotes();
    }
  };

  return (
    <div className="note-app">
      <div className="note-container">
        <h1>Simple Note Taker</h1>

        <div className="input-section">
          <h2>Add New Note</h2>
          <textarea
            ref={inputRef}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your note here..."
            className="textarea"
          />
          <button onClick={AddNotes} className="add-button">
            Add Note
          </button>
        </div>

        <div className="notes-section">
          {notes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes yet.</h3>
              <p>Start by writing your first note above.</p>
            </div>
          ) : (
            <>
              <h2>Your Notes ({notes.length})</h2>
              <div className="notes-grid">
                {notes.map((note) => (
                  <div key={note.id} className="note-card">
                    <div className="note-card-header">
                      <time className="note-time">{note.time}</time>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="note-text">{note.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}