document.addEventListener("mouseup", (e) => {
  const selection = window.getSelection().toString().trim();

  if (selection.length > 0) {
    let oldBtn = document.getElementById("saveNoteBtn");
    if (oldBtn) oldBtn.remove();

    const btn = document.createElement("button");
    btn.textContent = "💾 Save to Notes";
    btn.id = "saveNoteBtn";

    Object.assign(btn.style, {
      position: "absolute",
      top: `${e.pageY + 10}px`,
      left: `${e.pageX}px`,
      zIndex: 9999,
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "5px 8px",
      fontSize: "12px",
      cursor: "pointer",
    });

    btn.onclick = () => {
      chrome.runtime.sendMessage({ action: "saveNote", note: selection });
      btn.remove();
    };

    document.body.appendChild(btn);
  }
});

document.addEventListener("mousedown", () => {
  let oldBtn = document.getElementById("saveNoteBtn");
  if (oldBtn) oldBtn.remove();
});
