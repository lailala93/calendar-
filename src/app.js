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
    let prevYear = yearNum;
    let prevMonth = monthIndex - 1;
    if (prevMonth == -1) {
      prevMonth == 11;
      prevYear--;
    }
    let daysPrevMonth = daysInMonth(prevMonth, prevYear);
    let prevMonthStart = daysPrevMonth - firstDay + 1;
    console.log(prevMonthStart);
    let nextMonthstart = 1;

    let numRows = Math.ceil((daysMonths + firstDay) / 7);
    let beforeCounter = 1;

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if (beforeCounter <= firstDay) {
          cell.classList.add("cell--muted");
          // if 'celmuted' fill in prev month data
          cell.textContent = prevMonthStart;
          prevMonthStart++;
          // cell.classList.add("cell--empty");
          beforeCounter++;
        } else {
          if (counter <= daysMonths) {
            cell.textContent = counter;

            if (isToday(yearNum, monthIndex, counter)) {
              cell.classList.add("day--today");
            }

            counter++;
          } else {
            cell.textContent = nextMonthstart;
            cell.classList.add("cell--muted");
            nextMonthstart++;
          }
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
    dayOfWeek();
    renderCell(monthIndex, yearNum);
  }

  renderCalendar(viewMonth, viewYear);
});
