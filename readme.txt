// npm run watch (start Scss)
What to do next:

1. Make Prev / Next work (state + re-render). ✅
1. Highlight thingy ✅
2. Render the calendar correctly (start on right weekday )
3. Make day click select properly (and don’t attach 35 listeners)
4. Add the left “planner panel” that opens on click
5. Save notes per day (localStorage)
6. Show a “note indicator” on days that have notes
7. Add basic “agenda features”


~~~ Extra useful info ~~~

---- Formatted Date ---- 

const date = new Date("2014-10-15");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
console.log(date.toLocaleDateString("en-GB", options)); // "Wednesday, 15 October 2014"