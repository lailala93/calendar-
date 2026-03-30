/* 

9) src/notes/notesUI.js

Only UI: textarea, save button, delete button, agenda list.

    Exports:

        -initNotesUI({ onSave, onDelete })
        -showNotes(key) (calls store under the hood)
        -closeNotes() / openNotes() if needed

No calendar rendering here.

*/
import {
  getNotes,
  addNotes,
  deleteNoteAt,
  updateNoteAt,
  toggleNoteDone,
} from "./notesStore.js";

export function initNotesUI({ getSelectedKey, onNotesCange }) {
  const saveNote = document.getElementById("saveNote");
  const note = document.getElementById("note");
  const agendaList = document.getElementById("agenda__list");
  const textareaEl = document.getElementById("noteTextarea");
  const closeNote = document.getElementById("close-note");
  const main = document.querySelector("main");

  closeNote.addEventListener("click", () => {
    // maybe a condition check if its open?
    main.classList.toggle("notes-closed");
    note.classList.toggle("note--hidden");
    // now i have to make it appear when you click inside a cell
  });

  // SAVE (add new OR update existing)
  if (saveNote && textareaEl) {
    saveNote.addEventListener("click", () => {
      const key = getSelectedKey?.();
      if (!key) return;

      const text = textareaEl.value ?? "";
      if (text.trim() === "") return;

      const editIndex = textareaEl.dataset.editIndex;

      // if editIndex exists -> update item
      if (editIndex !== undefined && editIndex !== "") {
        updateNoteAt(key, Number(editIndex), text);
        textareaEl.dataset.editIndex = ""; // exit edit mode
      } else {
        addNotes(key, text);
      }
      textareaEl.value = "";
      showNotes(key);
      onNotesCange?.(); // redraw calendar
    });
  }

  // ONE listener for all per-item buttons (event delegation)
  if (agendaList && textareaEl) {
    agendaList.addEventListener("click", (e) => {
      const li = e.target.closest(".agenda__list--item");
      if (!li) return;

      const key = getSelectedKey?.();
      if (!key) return;

      const index = Number(li.dataset.index);

      // Strike
      if (e.target.classList.contains("agenda__text")) {
        toggleNoteDone(key, index);
        showNotes(key);
        onNotesCange?.();
        return;
      }

      // DELETE clicked note
      if (e.target.closest(".dltNote")) {
        deleteNoteAt(key, index);
        showNotes(key);
        onNotesCange?.();

        // If yoi were editing this item, canceledit mode
        if (textareaEl.dataset.editIndex === String(index)) {
          textareaEl.dataset.editIndex = "";
          textareaEl.value = "";
        }
        return;
      }

      // EDIT NOTE
      if (e.target.closest(".editNote")) {
        const oldText = li.querySelector(".agenda__text")?.textContent ?? "";
        textareaEl.dataset.editIndex = String(index);
        textareaEl.value = oldText;
        textareaEl.focus();
        textareaEl.classList.add("is-editing");
        note?.classList.add("note--open");
      }
    });
  }
}

// Reads the saved note(s) and displays them
// take everything from localstorage of cell and place it inside agenda
// Renders agenda for selected day
export function showNotes(selectedKey) {
  if (!selectedKey) return;

  const noteTextarea = document.getElementById("noteTextarea");
  const agendaList = document.getElementById("agenda__list");

  if (!noteTextarea || !agendaList) return;

  const items = getNotes(selectedKey);

  agendaList.classList.toggle("is-empty", items.length === 0);

  // keep textarea empty when switching dates (unless user clicks edit)
  noteTextarea.value = "";
  noteTextarea.dataset.editIndex = "";

  //   Render agenda list
  agendaList.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("agenda__list--item");
    li.dataset.index = index;

    if (item.done) {
      li.classList.add("strike");
    }

    const label = document.createElement("span");
    label.classList.add("agenda__text");
    label.textContent = item.text;

    const dltBtn = document.createElement("button");
    dltBtn.type = "button";
    dltBtn.classList.add("dltNote");
    dltBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.classList.add("editNote");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("button-wrapper");
    btnWrapper.classList.add("agendaActions");
    btnWrapper.append(dltBtn, editBtn);

    li.append(label, btnWrapper);
    agendaList.appendChild(li);
  });

  const actions = document.getElementById("agendaActions");
  if (actions) actions.classList.toggle("is-visible", items.length > 0);
}
