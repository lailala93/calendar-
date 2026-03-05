/* 

9) src/notes/notesUI.js

Only UI: textarea, save button, delete button, agenda list.

    Exports:

        -initNotesUI({ onSave, onDelete })
        -showNotes(key) (calls store under the hood)
        -closeNotes() / openNotes() if needed

No calendar rendering here.

*/
import { getNotes, addNotes, deleteLastNote } from "./notesStore.js";

export function initNotesUI({ getSelectedKey }) {
  const saveNote = document.getElementById("saveNote");
  const dlt = document.getElementById("dltNote");
  const note = document.getElementById("note");

  if (saveNote) {
    saveNote.addEventListener("click", () => {
      const key = getSelectedKey?.(); // comes from -> initNotesUI({ getSelectedKey: () => selectedKey }); ./app.js
      if (!key) return;

      const text = document.getElementById("noteTextarea")?.value ?? "";

      if (text.trim() === "") return;

      addNotes(key, text); // notesStore.js - localStorage
      document.getElementById("noteTextarea").value = "";
      showNotes(key);
    });
  }

  if (dlt && note) {
    dlt.addEventListener("click", (e) => {
      e.stopPropagation(); // It prevents the click event from bubblign up to parent listeners (like the dom click handler). SO, if click dlt btn, it wont trigger outside logic.

      const key = getSelectedKey?.();
      if (!key) return;

      deleteLastNote(key); // notesStore.js - localStorage

      showNotes(key);
      note.classList.remove("note--open");
    });
  }
}
// Reads the saved note(s) and displays them
// take everything from localstorage of cell and place it inside agenda
export function showNotes(selectedKey) {
  if (!selectedKey) return;

  const noteTextarea = document.getElementById("noteTextarea");
  const agendaList = document.getElementById("agenda__list");
  if (!noteTextarea || !agendaList) return;

  const items = getNotes(selectedKey); //notesStore.js - localStorage
  noteTextarea.value = "";

  //   Render agenda list
  agendaList.innerHTML = "";
  items.forEach((text) => {
    const li = document.createElement("li");
    li.classList.add("agenda__list--item");
    li.innerText = text;
    agendaList.appendChild(li);
  });
}
