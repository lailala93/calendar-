import { selectCell } from "./selectCell.js";

window.addEventListener("load", () => {
  selectCell();
  let week = document.getElementById("week");
  let rows = document.getElementById("rows");

  let year = document.getElementById("year");
  let month = document.getElementById("month");

  let nextBtn = document.getElementById("nextBtn");
  let prevBtn = document.getElementById("prevBtn");

  const d = new Date();

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1);
  };

  // Get first day of month
  let viewYear = d.getFullYear();
  let viewMonth = d.getMonth();

  var selectedKey = `${viewYear}-${viewMonth + 1}-${d.getDate()}`;

  // selectCell((newKey) => {
  //   selectedKey = newKey;
  //   showNotes(selectedKey);
  // });

  const showDate = () => {
    document.querySelectorAll(".currentDate").forEach((el) => {
      el.innerText = selectedKey; // IF its onload -->  selectedKey ELSE IF on select CHANGE the date according to  cell;
    });
  };

  year.innerText = viewYear;
  month.innerText = d.toLocaleDateString("en-US", { month: "long" });

  const goNext = () => {
    viewMonth++;

    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear++;
    }

    renderCalendar(viewMonth, viewYear);
  };

  nextBtn.addEventListener("click", goNext);

  const goPrev = () => {
    viewMonth--;

    if (viewMonth < 0) {
      viewMonth = 11; // cuz its 0 index
      viewYear--;
    }

    renderCalendar(viewMonth, viewYear);
  };

  prevBtn.addEventListener("click", goPrev);

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
        // Also check on what day the week starts?
      });
    }
  }

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

  function renderCell(monthIndex, yearNum) {
    let daysMonths = daysInMonth(monthIndex, yearNum);
    let counter = 1;
    let firstDay = getFirstDayOfMonth(yearNum, monthIndex, 1).getDay();
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
      prevMonth = 0;
      prevYear++;
    }

    let nextMonthstart = 1;
    let numRows = Math.ceil((daysMonths + firstDay) / 7);
    let beforeCounter = 0; // was 1

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // PREV MONTH (muted cells)
        if (beforeCounter <= firstDay) {
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

  function renderCalendar(monthIndex, yearNum) {
    rows.innerHTML = "";

    month.textContent = new Date(yearNum, monthIndex).toLocaleDateString(
      "en-US",
      { month: "long" },
    );
    year.textContent = yearNum;

    showDate(); // run onload
    dayOfWeek();
    // showNotes();
    renderCell(monthIndex, yearNum);
  }

  renderCalendar(viewMonth, viewYear);
});
