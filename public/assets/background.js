console.log("SustAIn background script running!");

// Example: Listen for extension installed event
chrome.runtime.onInstalled.addListener(() => {
  console.log("SustAIn Extension Installed!");
});
