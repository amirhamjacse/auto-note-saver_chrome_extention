const notesList = document.getElementById("notesList");
const saveTxtBtn = document.getElementById("saveTxt");
const savePdfBtn = document.getElementById("savePdf");
const clearNotesBtn = document.getElementById("clearNotes");

// Load saved notes
chrome.storage.local.get({ notes: [] }, (data) => {
  renderNotes(data.notes);
});

// Render notes in <ul>
function renderNotes(notes) {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
  });
}

// Save as TXT
saveTxtBtn.addEventListener("click", () => {
  chrome.storage.local.get({ notes: [] }, (data) => {
    const text = data.notes.join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.txt";
    a.click();

    URL.revokeObjectURL(url);
  });
});

// Save as PDF using jsPDF
savePdfBtn.addEventListener("click", () => {
  chrome.storage.local.get({ notes: [] }, (data) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const text = data.notes.join("\n\n");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;

    const lines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(lines, margin, 20);
    doc.save("notes.pdf");
  });
});

// Clear notes
clearNotesBtn.addEventListener("click", () => {
  chrome.storage.local.set({ notes: [] }, () => {
    renderNotes([]);
  });
});
