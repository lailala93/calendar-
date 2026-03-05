/* 

7) src/calendar/selection.js

This is basically your selectCell.js but selection only.

Exports:

        -initSelection({ noteEl, onSelect })
        -It should emit the key and nothing else.

*/

export function initSelection({ noteEl, onSelect } = {}) {
  document.addEventListener("click", (e) => {
    const clickedCell = e.target.closest(".cell");
    const clickedInsideNote = noteEl ? noteEl.contains(e.target) : false;

    // if you clicked a cell -> activate it
    if (clickedCell) {
      document
        .querySelectorAll(".cell--active")
        .forEach((c) => c.classList.remove("cell--active"));

      clickedCell.classList.add("cell--active");

      const y = clickedCell.dataset.year;
      const m = Number(clickedCell.dataset.month) + 1;
      const day = clickedCell.dataset.day;

      const newKey = `${day}-${m}-${y}`;
      onSelect?.(newKey);
      return;
    }

    // if you clicked outside note (and not a cell) -> remove active from all
    if (!clickedInsideNote) {
      document
        .querySelectorAll(".cell--active")
        .forEach((c) => c.classList.remove("cell--active"));
    }
  });
}
