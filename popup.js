const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("searchInput");
const saveTxtBtn = document.getElementById("saveTxt");
const savePdfBtn = document.getElementById("savePdf");
const clearNotesBtn = document.getElementById("clearNotes");

let allNotes = [];

// Load and render saved notes
chrome.storage.local.get({ notes: [] }, (data) => {
  allNotes = data.notes;
  renderNotes(allNotes);
});

// Render notes to <ol>
function renderNotes(notes) {
  notesList.innerHTML = "";
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
  });
}

// Search filter
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = allNotes.filter(note =>
    note.toLowerCase().includes(keyword)
  );
  renderNotes(filtered);
});

// Save as TXT
saveTxtBtn.addEventListener("click", () => {
  const text = allNotes.join("\n\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "notes.txt";
  a.click();
  URL.revokeObjectURL(url);
});

// Save as PDF
savePdfBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const margin = 10;
  const lineHeight = 10;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - margin * 2;

  const numberedText = allNotes.map((note, i) => `${i + 1}. ${note}`).join("\n\n");
  const lines = doc.splitTextToSize(numberedText, maxLineWidth);

  let cursorY = margin;

  lines.forEach((line) => {
    if (cursorY + lineHeight > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
    }
    doc.text(line, margin, cursorY);
    cursorY += lineHeight;
  });

  doc.save("notes.pdf");
});

// Clear notes
clearNotesBtn.addEventListener("click", () => {
  chrome.storage.local.set({ notes: [] }, () => {
    allNotes = [];
    renderNotes([]);
  });
});
