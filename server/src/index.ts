import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import "dotenv/config";
import fastify, { FastifyInstance } from "fastify";
import fastifyCors from "fastify-cors";
import fastifySession from "fastify-secure-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import {
  COOKIE_NAME,
  CORS_ORIGIN_URL,
  PROD,
  SESSION_SALT,
  SESSION_SECRET,
  SESSION_TTL,
} from "./constants";
import { HelloResolver, RoomResolver, UserResolver } from "./resolvers";
import { startWebSocket } from "./socket";

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

async function startApolloServer() {
  const redis = new Redis();
  const app = fastify();
  startWebSocket(app);
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, HelloResolver, RoomResolver],
    }),
    context: ({ request, reply }) => ({ request, reply, redis }),
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
  });

  await server.start();
  app.register(
    server.createHandler({
      cors: false,
    })
  );
  app.register(fastifyCors, {
    origin: [CORS_ORIGIN_URL as string, "https://studio.apollographql.com"],
    credentials: true,
  });
  app.register(fastifySession, {
    secret: SESSION_SECRET as string,
    salt: SESSION_SALT as string,
    cookieName: COOKIE_NAME,
    cookie: {
      secure: PROD,
      httpOnly: true,
      sameSite: "lax",
      maxAge: SESSION_TTL,
    },
  });
  await app.listen(4000);
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
