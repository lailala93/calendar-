/*
 5. )src/calendar/calendarRender.js

Pure calendar creation logic.

Exports:

        -renderCalendar(monthIndex, yearNum)
        -helper functions inside it: daysInMonth, isToday, renderCells, etc.
        -This file should NOT know about notes or selection.

*/

export function renderCalendar({
  monthIndex,
  yearNum,
  week,
  rows,
  monthEl,
  yearEl,
  selectedKey,
}) {
  const d = new Date();

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1);
  };

  const daysInMonth = (month, year) => {
    return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
  };

  const isToday = (yearNum, monthIndex, dayNum) => {
    return (
      yearNum === d.getFullYear() &&
      monthIndex === d.getMonth() &&
      dayNum === d.getDate()
    );
  };

  const showDate = () => {
    document.querySelectorAll(".currentDate").forEach((el) => {
      el.innerText = selectedKey; // IF its onload -->  selectedKey ELSE IF on select CHANGE the date according to  cell;
    });
  };

  function dayOfWeek() {
    // prettier-ignore
    const weekDaysArr = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
  ];

    if (week.children.length !== 7) {
      weekDaysArr.forEach((weekday) => {
        let day = document.createElement("div");

        day.classList.add("weekday");
        day.textContent = weekday;
        week.appendChild(day);
      });
    }
  }

  /* Not used 
    // Get first day of month
  year.innerText = viewYear;
  month.innerText = d.toLocaleDateString("en-US", { month: "long" });
  */

  function renderCell(monthIndex, yearNum) {
    let daysMonths = daysInMonth(monthIndex, yearNum);
    let counter = 1;

    let firstDay = getFirstDayOfMonth(yearNum, monthIndex).getDay();
    firstDay -= 1; // to start on monday not sunday
    if (firstDay == -1) firstDay = 6;

    // prev month info
    let prevYear = yearNum;
    let prevMonth = monthIndex - 1;

    if (prevMonth == -1) {
      prevMonth = 11;
      prevYear--;
    }

    let daysPrevMonth = daysInMonth(prevMonth, prevYear);
    let prevMonthStart = daysPrevMonth - firstDay + 1;

    // next month info
    let nextYear = yearNum;
    let nextMonth = monthIndex + 1;

    if (nextMonth === 12) {
      nextMonth = 0;
      nextYear++;
    }

    let nextMonthstart = 1;

    const numRows = Math.ceil((daysMonths + firstDay) / 7);
    let beforeCounter = 0; // was 1

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // PREV MONTH (muted cells)
        if (beforeCounter < firstDay) {
          cell.classList.add("cell--muted");
          cell.textContent = prevMonthStart;

          // ~For Localstorage~
          cell.dataset.year = prevYear;
          cell.dataset.month = prevMonth;
          cell.dataset.day = prevMonthStart;

          prevMonthStart++;
          beforeCounter++;
          // NEXT MONTH (muted cells)
        } else if (counter <= daysMonths) {
          cell.textContent = counter;

          // ~For Localstorage~
          cell.dataset.year = yearNum;
          cell.dataset.month = monthIndex;
          cell.dataset.day = counter;

          if (isToday(yearNum, monthIndex, counter)) {
            cell.classList.add("cell--today");
          }

          counter++;
          // NEXT MONTH (MUTED)
        } else {
          cell.classList.add("cell--muted");
          cell.textContent = nextMonthstart;

          cell.dataset.year = nextYear;
          cell.dataset.month = nextMonth;
          cell.dataset.day = nextMonthstart;

          nextMonthstart++;
        }
        row.appendChild(cell);
      }
      rows.appendChild(row);
    }
  }

  // RENDER
  rows.innerHTML = "";
  monthEl.textContent = new Date(yearNum, monthIndex).toLocaleDateString(
    "en-US",
    { month: "long" },
  );
  yearEl.textContent = yearNum;

  showDate(); // run onload
  dayOfWeek();

  function highlightSelected(selectedKey) {
    if (!selectedKey) return;
    const [day, month, year] = selectedKey.split("-"); // day-month-year
    const selector = `.cell[data-day="${day}"][data-month="${Number(month) - 1}"][data-year="${year}"]`;
    rows
      .querySelectorAll(".cell--active")
      .forEach((c) => c.classList.remove("cell--active"));
    const cell = rows.querySelector(selector);

    if (cell) cell.classList.add("cell--active");
  }

  renderCell(monthIndex, yearNum);
  highlightSelected(selectedKey);
}
