/* 

6) src/calendar/navigation.js

Handles next/prev buttons and calls render.

Exports:

        -initNavigation({ onNext, onPrev })    | 
        or
        -wireNavigation(nextBtn, prevBtn, goNext, goPrev)
        -Again: no notes here.

*/

export function initNavigation({
  nextBtn,
  prevBtn,
  getView,
  setView,
  onChange,
}) {
  // Next month
  nextBtn.addEventListener("click", () => {
    let { viewMonth, viewYear } = getView();

    viewMonth++;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear++;
    }

    setView(viewMonth, viewYear);
    onChange(viewMonth, viewYear);
  });

  //   Previous
  prevBtn.addEventListener("click", () => {
    let { viewMonth, viewYear } = getView();

    viewMonth--;
    if (viewMonth < 0) {
      viewMonth = 12;
      viewYear--;
    }
    setView(viewMonth, viewYear);
    onchange(viewMonth, viewYear);
  });
}
