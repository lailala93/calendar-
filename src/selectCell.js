export function selectCell() {
  let rows = document.querySelector(".rows");
  const note = document.getElementById("note");
  const closeBtn = document.getElementById("note__close");

  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    note.classList.remove("note--open");
  });

  // Open when clicking a cell
  rows.addEventListener("click", (e) => {
    //
    const clickedCell = e.target.closest(".cell");
    if (!clickedCell) return;
    note.classList.add("note--open");
  });
}
document.addEventListener("click", (e) => {
  const clickedInsideNote = note.contains(e.target);
  const clickedCell = e.target.closest(".cell");

  if (!clickedInsideNote && !clickedCell) {
    note.classList.remove("note--open");
  }
});

// TODO
//for cookies later
// to do: const noteDate = document.getElementById("noteDate");

function makeNote() {
  const textarea = document.getElementById("noteTextarea").value;
  const saveNote = document.getElementById("saveNote");
  const editNote = document.getElementById("seditNotee");
  const dltNote = document.getElementById("dltNote");
  // Save to agenda container (on left will show highlights)
  const agenda = document.getElementById("agenda");

  saveNote.addEventListener("click", (e) => {
    agenda.innerHTML = "";

    if (textarea !== "") {
      agenda.innerText = textarea;
    }
  });
}

makeNote();
