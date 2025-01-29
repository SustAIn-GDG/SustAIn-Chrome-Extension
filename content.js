const observer = new MutationObserver(function (mutationsList) {
  const modelNode = document.getElementsByClassName("current-mode-title");
  if (modelNode.length > 0) {
    const model = modelNode[0];
    if (model) {
      console.log("Model: ", model.innerText);
      observer.disconnect();

      const modelObserver = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(mutation => {
          if (mutation.type === "childList" || mutation.type === "subtree") {
            console.log("Model updated: ", model.innerText);
          }
        });
      });

      modelObserver.observe(model, {
        childList: true,   // Observe direct children changes
        subtree: true,     // Observe changes in all descendants
        characterData: true // Observe text content changes
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
