import { io } from "socket.io-client";
import { NEXT_PUBLIC_SOCKET_API_URI } from "./constants";

const socket = io(NEXT_PUBLIC_SOCKET_API_URI!, {
  autoConnect: false,
});

export default socket;
