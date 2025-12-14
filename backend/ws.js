const WebSocket = require("ws");

const PORT = 3001;
const wss = new WebSocket.Server({ port: PORT });

const REQUIRED_EVENTS = [
    "play", 
    "playing", 
    "pause", 
    "seek", 
    "error", 
    "finished"
];

function handlePlayerEvent(data, ws) {
    const { event, movieId, timeStamp} = data;

    if (!event || !REQUIRED_EVENTS.includes(event)) {
        console.warn(`Evento inválido ou vazio`);
        return;
    }
    
    switch (event) {
        case "play":
            console.log(`Reprodução iniciada.`);
            break;

        case "playing":
            console.log(`Em reprodução no tempo: ${timeStamp}.`);
            break;

        case "pause":
            console.log(`Reprodução pausada no tempo: ${timeStamp}.`);
            break;
            
        case "seek":
            console.log(`Reprodução pulada para o tempo: ${timeStamp}.`);
            break;

        case "finished":
            console.log(`Reprodução concluída no tempo ${timeStamp}.`);
            break;

        case "error":
            console.error(`ERRO`);
            break;

        default:
            console.error(`Evento inválido`);
    }
}

wss.on("connection", ws => {
 
    ws.on("message", rawMsg => {
        let data;
        try {
            data = JSON.parse(rawMsg);
        } catch (e) {
            console.error("Mensagem inválida");
            return;
        }
        handlePlayerEvent(data, ws);
    });

    ws.on("close", () => {});
});

console.log(`WebSocket rodando na porta ${PORT}`);