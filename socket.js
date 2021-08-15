const socketIo = require("socket.io");

let io;

module.exports = {
  initIo: (httpServer) => {
    // establish a shared web socket connection object
    io = socketIo(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("No Web Socket connection was established!");
    }
    return io;
  },
};
