function downloadVideo() {
  const url = document.getElementById("urlInput").value;
  const status = document.getElementById("status");
  status.textContent = "Downloading... Please wait.";

  fetch("/api/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  })
    .then(response => {
      if (!response.ok) throw new Error("Download failed.");
      return response.blob();
    })
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "tiktok.mp4";
      link.click();
      status.textContent = "Download complete!";
    })
    .catch(err => {
      status.textContent = "Error: " + err.message;
    });
}