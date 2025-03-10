console.log("SustAIn content script running!");

// Example: Change all headings on the page
document.querySelectorAll("h1").forEach((h1) => {
  h1.style.color = "green";
  h1.textContent = "🌱 SustAIn Mode!";
});
