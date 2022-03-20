import { Room, User } from "entities";
import type { FastifyInstance } from "fastify";
import fastifyIO from "fastify-socket.io";
import { Server } from "socket.io";
import { CORS_ORIGIN_URL } from "./constants";
import { rooms } from "./resolvers/room";
import genRandomId from "./utils/genRandomId";

let io: Server;

const adapterEvents: Array<AdapterEvent> = ["join-room", "leave-room"];

type AdapterEvent = "join-room" | "leave-room";

async function listAllUsers(room: string) {
  const clients = io.sockets.adapter.rooms.get(room);
  const userList: Array<User> = [];

  if (!clients) return;

  for (const clientId of clients) {
    //this is the socket of each client in the room.
    const clientSocket = io.sockets.sockets.get(clientId);

    const userFound = userList.find(
      (user) => user.login === clientSocket?.data.user.login
    );

    if (userFound) {
      continue;
    }

    userList.push(clientSocket?.data.user);
  }

  return io.to(room).emit("users", userList);
}

async function sendMessageToARoom(
  from: User,
  to: Room["slug"],
  message: string
) {
  const indexOfRoom = rooms.findIndex((room) => room.slug === to);

  if (indexOfRoom === -1) return;

  const newMessage: Room["messages"][0] = {
    from,
    to,
    message,
    id: genRandomId(),
    time: new Date(),
  };

  rooms[indexOfRoom].messages.push(newMessage);

  io.to(`room:${to}`).emit("newMessage", newMessage);
}

export async function startWebSocket(server: FastifyInstance) {
  server.register(fastifyIO, {
    cors: {
      origin: CORS_ORIGIN_URL,
    },
  });

  // we need to wait for the server to be ready, else `server.io` is undefined
  server.ready().then(() => {
    io = server.io;

    // list on events
    adapterEvents.forEach((event) => {
      const eventMessage: { [key in AdapterEvent]: string } = {
        "join-room": "joined",
        "leave-room": "leave",
      };

      io.of("/").adapter.on(event, async (room, id) => {
        console.log(`socket ${id} has ${eventMessage[event]} room ${room}`);
        if (!room.startsWith("room:")) return;
        listAllUsers(room);
      });
    });

    // middleware
    io.use((socket, next) => {
      const user = socket.handshake.auth.user;

      if (user) {
        socket.data.user = user;
        next();
      } else {
        next(new Error("unauthorized"));
      }
    });

    io.on("connection", async (socket) => {
      socket.join(`user:${socket.data.user.login}`);

      socket.on("join", (room) => {
        socket.join(`room:${room}`);
      });

      socket.on("message", sendMessageToARoom);
    });
  });
}
