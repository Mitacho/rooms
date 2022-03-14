import type { FastifyInstance } from "fastify";
import fastifyIO from "fastify-socket.io";

export async function startWebSocket(server: FastifyInstance) {
  server.register(fastifyIO, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  server.ready().then(() => {
    // middleware
    server.io.use((socket, next) => {
      const user = socket.handshake.auth.user;

      console.log(user);

      if (user) {
        next();
      } else {
        next(new Error("unauthorized"));
      }
    });

    // we need to wait for the server to be ready, else `server.io` is undefined
    server.io.on("connection", async (socket) => {
      console.log("new connection");
      console.log(socket);
      socket.on("disconnect", () => {
        console.log("socket disconnected");
      });
    });
  });
}
