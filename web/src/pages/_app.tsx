import type { AppProps } from "next/app";
import "../assets/styles/globals.css";
import WebSocketProvider from "../context/WebSocket";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WebSocketProvider>
      <Component {...pageProps} />
    </WebSocketProvider>
  );
}

export default MyApp;
