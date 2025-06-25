const apiKey = "AIzaSyD06FnVw2xkiyB1Rc1_m8Lr1s65VN97q4I"; 

async function searchVideos() {
  const query = document.getElementById("searchInput").value;
  const resultsContainer = document.getElementById("results");
  const videoPlayer = document.getElementById("videoPlayer");

  videoPlayer.innerHTML = "";
  videoPlayer.classList.add("hidden");
  resultsContainer.innerHTML = "Loading...";

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=6&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    resultsContainer.innerHTML = "";

    data.items.forEach(item => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnail = item.snippet.thumbnails.medium.url;

      const div = document.createElement("div");
      div.className = "video-item";
      div.innerHTML = `
        <img src="${thumbnail}" alt="${title}" width="100%">
        <p>${title}</p>
      `;
      div.onclick = () => playVideo(videoId);
      resultsContainer.appendChild(div);
    });

  } catch (error) {
    resultsContainer.innerHTML = "Gagal mengambil video. Cek API key.";
    console.error(error);
  }
}

function playVideo(videoId) {
  const videoPlayer = document.getElementById("videoPlayer");
  videoPlayer.innerHTML = `
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" allowfullscreen></iframe>
  `;
  videoPlayer.classList.remove("hidden");
}