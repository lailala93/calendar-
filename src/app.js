/* 2) src/app.js (the glue)

Only job: connect calendar ↔ selection ↔ notes.

This is where you:

    create selectedKey
    call renderCalendar
    tell selection what to do when a cell is clicked
    tell notes to load/save for that key

*/
/* 2) src/app.js (the glue)
   Only job: connect calendar ↔ selection ↔ notes.
*/
import { getCalendarEls } from "./calendar/dom.js";
import { renderCalendar } from "./calendar/calendarRender.js";
import { initNavigation } from "./calendar/navigation.js";
import { initSelection } from "./calendar/selection.js";
import { initNotesUI, showNotes } from "./notes/notesUI.js";
import { getNotes } from "./notes/notesStore.js";
import { themeToggle } from "./utility/themeToggle.js";
export function initApp() {
  window.addEventListener("load", () => {
    //  Grab DOM elements ONCE (they only exist after load)
    const {
      week,
      rows,
      yearEl: year,
      monthEl: month,
      nextBtn,
      prevBtn,
      noteEl,
    } = getCalendarEls();

    const main = document.querySelector("main");

    //  State that controls what month/year you're viewing
    const d = new Date();
    let viewYear = d.getFullYear();
    let viewMonth = d.getMonth();

    //  Selected date key (used for header + notes later)
    let selectedKey = `${d.getDate()}-${viewMonth + 1}-${viewYear}`;

    //  draw() should ONLY render (no event listeners inside)
    const draw = () => {
      renderCalendar({
        monthIndex: viewMonth,
        yearNum: viewYear,
        week,
        rows,
        monthEl: month,
        yearEl: year,
        selectedKey,
        // TO add a dot WEN there is a note present within Calendar uwu
        // Does it have a note?
        hasNotes: (day, month, year) => {
          const key = `${day}-${month + 1}-${year}`;

          const notes = getNotes(key);
          if (!notes) return;

          return notes.length > 0;
        },
      });
    };

    initNavigation({
      nextBtn,
      prevBtn,
      getView: () => ({ viewMonth, viewYear }),
      setView: (m, y) => {
        viewMonth = m;
        viewYear = y;
      },
      onChange: () => draw(),
    });

    // TODO: fix the note dot. it  remains when i removed all items, only on refresh does it disappear
    initNotesUI({
      getSelectedKey: () => selectedKey,
      onNotesCange: draw,
    });

    initSelection({
      noteEl,
      onSelect: (newKey) => {
        main.classList.remove("notes-closed");
        noteEl.classList.remove("note--hidden");

        selectedKey = newKey;
        draw();
        showNotes(selectedKey);
      },
    });
    themeToggle(); // is this in the right place?
    draw();
    showNotes(selectedKey); // load note for default selectedKey on refresh
  });
}
