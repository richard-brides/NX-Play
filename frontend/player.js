const movieId = new URLSearchParams(window.location.search).get("id");
const WS_URL = "ws://localhost:3001";
const socket = new WebSocket(WS_URL);

socket.addEventListener("open", () => console.log("WS conectado"));
socket.addEventListener("close", () => console.log("WS desconectado"));
socket.addEventListener("error", (e) => console.error("WS erro:", e));

const backPlayerBtn = document.getElementById("backPlayerBtn");
if (backPlayerBtn && movieId) {
  backPlayerBtn.onclick = () => {
    window.location.href = `sinopse.html?id=${movieId}`;
  };
}

async function loadPlayer() {
  try {
    const res = await fetch(`http://localhost:3000/movies/${movieId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const movie = await res.json();

    const video = document.getElementById("player");

    if (window.Hls && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(movie.hls);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (event, data) => {
        sendEvent("error");
        console.error("Error:", data);
      });
    } else {
      video.src = movie.hls;
    }

    const sendEvent = (eventName) => {
      if (socket.readyState === WebSocket.OPEN) {
        const data = {
          event: eventName,
          movieId: String(movieId),
          timeStamp: Number(video.currentTime || 0),
        };
        socket.send(JSON.stringify(data));
      } else {
        console.warn("Evento não enviado:", eventName);
      }
    };

    video.addEventListener("play", () => sendEvent("play"));
    video.addEventListener("playing", () => sendEvent("playing"));
    video.addEventListener("pause", () => sendEvent("pause"));
    video.addEventListener("ended", () => sendEvent("finished"));
    video.addEventListener("seeking", () => sendEvent("seek"));
    video.addEventListener("error", () => sendEvent("error"));

  } catch (err) {
    console.error("Erro ao iniciar player:", err.message);
  }
}

loadPlayer();
