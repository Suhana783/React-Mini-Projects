import React, { useState, useRef, useEffect } from "react";
import './Note.css';

function Text() {
    const [current, setCurrent] = useState("");
    const inputRef = useRef(null);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function AddNotes() {
        if (current.trim() === "") {
            return;
        }

        const timestamp = new Date().toLocaleString();
        const newNote = { id: Date.now(), text: current, time: timestamp };
        setNotes([...notes, newNote]);
        setCurrent("");
    }

    function handleDeleteNote(idToDelete) {
        const updatedNotes = notes.filter((note) => note.id !== idToDelete);
        setNotes(updatedNotes);
    }

    return (
        <>
            <h1>Note Taker</h1>
            <div className="input-section">
                <textarea
                    ref={inputRef}
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    placeholder="Type here..."
                />
                <button onClick={AddNotes}>Add Notes</button>
            </div>
            
            <div className="notes-container">
                {notes.map((note) => (
                    <div key={note.id} className="note">
                        <p className="note-time">{note.time}</p>
                        <p className="note-text">{note.text}</p>
                        <button className="delete-button" onClick={() => handleDeleteNote(note.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Text;