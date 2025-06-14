chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveNote",
    title: "Save to Notes",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveNote" && info.selectionText) {
    chrome.storage.local.get({ notes: [] }, (data) => {
      const updatedNotes = [...data.notes, info.selectionText];
      chrome.storage.local.set({ notes: updatedNotes });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveNote" && message.note) {
    chrome.storage.local.get({ notes: [] }, (data) => {
      const updated = [...data.notes, message.note];
      chrome.storage.local.set({ notes: updated });
    });
  }
});
