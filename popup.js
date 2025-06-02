document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notesList");
  const clearBtn = document.getElementById("clearBtn");

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
});
