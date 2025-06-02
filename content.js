document.addEventListener("mouseup", () => {
  const selection = window.getSelection().toString().trim();
  if (selection) {
    // Get existing notes, append new selection, and save
    chrome.storage.local.get({ notes: [] }, (data) => {
      const notes = data.notes;
      if (!notes.includes(selection)) {
        notes.push(selection);
        chrome.storage.local.set({ notes });
      }
    });
  }
});
