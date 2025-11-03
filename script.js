document.getElementById("grantWishBtn").addEventListener("click", async () => {
  const q1 = document.getElementById("question1").value.trim();
  const q2 = document.getElementById("question2").value.trim();
  const q3 = document.getElementById("question3").value.trim();

  const refinedPrompt = `Build an app or solution based on:
1. What I want: ${q1}
2. What I already know: ${q2}
3. What I need help with: ${q3}

Please respond with clear, modular code and a brief explanation.`;

  // Show loading state
  const previewBox = document.getElementById("previewBox");
  previewBox.innerText = "🧞 Summoning your solution...";

  try {
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: refinedPrompt })
    });

    const data = await response.json();
    previewBox.innerText = data.text || "⚠️ No response received.";
  } catch (error) {
    previewBox.innerText = "❌ Error contacting Genie’s backend.";
    console.error("Genie backend error:", error);
  }
});

