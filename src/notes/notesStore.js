/*
Notes modules (separate feature)
8) src/notes/notesStore.js

Only localStorage logic.

    Exports:
        -getNote(key)
        -setNote(key, value)
        -(optional) getEvents() / setEvents() if you use an events object

No DOM here.
*/

export function getNotes(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function addNotes(key, text) {
  const items = getNotes(key);
  items.push(text);
  localStorage.setItem(key, JSON.stringify(items));
  return items;
}

export function deleteLastNote(key) {
  const items = getNotes(key);
  items.pop();

  if (items.length === 0) {
    localStorage.removeItem(key);
    return [];
  }
  localStorage.setItem(key, JSON.stringify(items));

  return items;
}

export function clearNotes(key) {
  localStorage.removeItem(key);
  return [];
}
