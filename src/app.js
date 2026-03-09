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

    initNotesUI({
      getSelectedKey: () => selectedKey,
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
    draw();
    showNotes(selectedKey); // load note for default selectedKey on refresh
  });
}
