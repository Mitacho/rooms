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
      const token = socket.handshake.auth.token;

      console.log(token);

      if (token) {
        next();
      } else {
        next(new Error("unauthorized"));
      }
    });

    // we need to wait for the server to be ready, else `server.io` is undefined
    server.io.on("connection", async (socket) => {
      console.log("new connection");
      socket.on("disconnect", () => {
        console.log("socket disconnected");
      });
    });
  });
}
