export function selectCell(onSelect) {
  // which date is selected

  const note = document.getElementById("note");

  document.addEventListener("click", (e) => {
    const clickedCell = e.target.closest(".cell");
    const clickedInsideNote = note ? note.contains(e.target) : false;

    // if you clicked a cell -> activate it
    if (clickedCell) {
      document
        .querySelectorAll(".cell--active")
        .forEach((c) => c.classList.remove("cell--active"));

      clickedCell.classList.add("cell--active");
      return;
    }

    // if you clicked outside note (and not a cell) -> remove active from all
    if (!clickedInsideNote) {
      document
        .querySelectorAll(".cell--active")
        .forEach((c) => c.classList.remove("cell--active"));
    }
  });
  showNotes();
}
// to do: const noteDate = document.getElementById("noteDate");

function makeNote() {
  // save note from date
  let events = localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : [];

  const saveNote = document.getElementById("saveNote");
  // const editNote = document.getElementById("editNotee");

  // Save to agenda container (on left will show highlights)
  const agenda = document.getElementById("agenda");

  saveNote.addEventListener("click", (e) => {
    const textarea = document.getElementById("noteTextarea").value;
    // localStorage.setItem(key, value);
    const list = document.getElementById("agenda__list");
    const listItem = document.createElement("li");
    listItem.classList.add("agenda__list--item");
    //

    if (textarea !== "") {
      // localStorage.setItem(listItem);
      list.appendChild(listItem);
      listItem.innerText = textarea;
    }
  });
  // to do later:  showNotes();
}

makeNote();

const dltNote = () => {
  const dlt = document.getElementById("dltNote");

  // Edit to remove localstorage
  dlt.addEventListener("click", (e) => {
    e.stopPropagation();
    note.classList.remove("note--open");
  });
  //showNotes();
};
dltNote();

// call function inside dlt/add/edit
function showNotes() {
  // reads the saved note(s) and displays them
  // take everything from localstorage of cell and place it inside agenda
  let selectedKey;
  if (!selectedKey) return;
  const saved = localStorage.getItem(selectedKey);
  if (!saved) return;
  noteTextarea.value = saved;
  agendaList.innerHTML = "";
}
