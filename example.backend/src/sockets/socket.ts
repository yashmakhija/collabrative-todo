import { Server } from "socket.io";
import { Server as HttpServer } from "http";

const socketSetup = (server: HttpServer): void => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    // Additional event listeners can go here
  });
};

export default socketSetup;
