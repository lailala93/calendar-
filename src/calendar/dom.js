/*
All your getElementById and querySelector in one spot.

Exports:
    getCalendarEls() → returns { week, rows, monthEl, yearEl, nextBtn, prevBtn }
*/

// src/calendar/dom.js
export function getCalendarEls() {
  return {
    week: document.getElementById("week"),
    rows: document.getElementById("rows"),
    yearEl: document.getElementById("year"),
    monthEl: document.getElementById("month"),
    nextBtn: document.getElementById("nextBtn"),
    prevBtn: document.getElementById("prevBtn"),
    noteEl: document.getElementById("note"),
  };
}
