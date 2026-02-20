export function selectCell() {
  let rows = document.querySelector(".rows");
  const note = document.getElementById("note");

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
const textarea = document.getElementById("noteTextarea"); //for cookies later
// to do: const noteDate = document.getElementById("noteDate");
