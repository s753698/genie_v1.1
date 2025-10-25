function generatePrompt() {
  const nameInput = document.getElementById("name");
  const logoInput = document.getElementById("logo");
  const purposeInput = document.getElementById("purpose");
  const styleInput = document.getElementById("style");
  const featuresInput = document.getElementById("features");
  const customPromptInput = document.getElementById("customPrompt");

  const name = nameInput ? nameInput.value.trim() : "";
  const logo = logoInput ? logoInput.value.trim() : "";
  const purpose = purposeInput ? purposeInput.value.trim() : "";
  const style = styleInput ? styleInput.value.trim() : "";
  const features = featuresInput ? featuresInput.value.trim() : "";
  const customPrompt = customPromptInput.value.trim();

  let refinedPrompt = "";

  if (customPrompt) {
    refinedPrompt = customPrompt;
  } else {
    refinedPrompt = `Conjure a ${style} ${purpose} website named "${name}" with powers like ${features}. Symbol: ${logo}.`;
  }

  // Show the refined prompt
  document.getElementById("previewBox").innerText = "🧠 Thinking...\n\n" + refinedPrompt;
  showMagicPopup();

  // 🔮 Send to local Python API
  fetch("http://127.0.0.1:8081", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: refinedPrompt,
      n_predict: 512
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("previewBox").innerText = data.response;
  })
  .catch(err => {
    document.getElementById("previewBox").innerText = "❌ Error: " + err;
  });
}
