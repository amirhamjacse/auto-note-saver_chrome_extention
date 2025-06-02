document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notesList");
  const clearBtn = document.getElementById("clearBtn");
  const saveTxtBtn = document.getElementById("saveTxtBtn");
  const savePdfBtn = document.getElementById("savePdfBtn");

  chrome.storage.local.get({ notes: [] }, (data) => {
    data.notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      notesList.appendChild(li);
    });
  });

  clearBtn.addEventListener("click", () => {
    chrome.storage.local.set({ notes: [] }, () => {
      notesList.innerHTML = "";
    });
  });

  saveTxtBtn.addEventListener("click", () => {
    chrome.storage.local.get({ notes: [] }, (data) => {
      const blob = new Blob([data.notes.join("\n\n")], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "notes.txt";
      a.click();
      URL.revokeObjectURL(url);
    });
  });

  savePdfBtn.addEventListener("click", () => {
    chrome.storage.local.get({ notes: [] }, (data) => {
      const text = data.notes.join("\n\n");

      const win = window.open("", "_blank");
      win.document.write(`
        <html>
          <head>
            <title>Notes PDF</title>
          </head>
          <body>
            <pre style="font-family: Arial, sans-serif;">${text}</pre>
            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
        </html>
      `);
      win.document.close();
    });
  });
});
