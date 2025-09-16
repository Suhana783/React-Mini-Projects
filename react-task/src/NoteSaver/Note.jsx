import React, {useState, useRef, useEffect} from "react";

function Text () {
    const [current, setCurrent] = useState("");
    const inputRef = useRef(null);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        inputRef.current.focus();
    },[]);

    function AddNotes() {
        if (current.trim() === "") {
            return;
        }

        const timestamp = new Date().toLocaleString();
        const newNote = {text: current, time:timestamp};
        setNotes([...notes, newNote]);
        setCurrent("");
    }


    function handleDeleteNote () {
        const updatedNotes = notes.filter((_, index) => index !== indexToDelete);
        setNotes(updatedNotes);
    }
}