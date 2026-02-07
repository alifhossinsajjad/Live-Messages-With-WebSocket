import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//connection event

wss.on("connection", (socket, req) => {
  const ip = req.socket.remoteAddress;

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(`Server is Ready : ${message}`);
    });
  });

  socket.on("error", (err) => {
    console.error(`Error : ${err.message} : ${ip}`);
  });

  socket.on("close", () => {
    console.log("client disconnected");
  });
});


console.log("websocket server is running on ws://localhost :8080")
