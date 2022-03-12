import { createContext, memo, useCallback, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  auth: {
    token: "123123123",
  },
});

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

type WebSocketContextData = {};

type WebSocketProviderProps = {
  children: React.ReactNode;
};

const WebSocketContext = createContext({} as WebSocketContextData);

function WebSocketProvider({ children }: WebSocketProviderProps): JSX.Element {
  const [messages, setMessages] = useState<Array<string>>([
    "a",
    "asdasd",
    "asjdai",
  ]);

  const handleMessageReceived = useCallback((newMessage: string) => {
    console.log(
      "%c new message: ",
      "color: orange; font-weight: bold",
      newMessage
    );
    setMessages((currentMessages) => [...currentMessages, newMessage]);
  }, []);

  socket.on("message", handleMessageReceived);

  return (
    <WebSocketContext.Provider value={{}}>{children}</WebSocketContext.Provider>
  );
}

export default memo(WebSocketProvider);