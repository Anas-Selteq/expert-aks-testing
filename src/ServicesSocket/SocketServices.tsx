// SocketService.js

import { enqueueSnackbar } from "notistack";
import { io } from "socket.io-client";

let socket: any;

const connectSocket = () => {
  socket = io(`https://expertchatapi.findanexpert.net/chat_svc`, {
    reconnectionDelay: 1000,
    reconnection: true,
    query: {
      userId: 194,
    },
    reconnectionAttempts: 100,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  socket.on("connect", () => {
    console.log("Socket connected successfully");
    // enqueueSnackbar('We are ready to chat', { variant: 'success' });
    // console.log("UserID sent to the server:", socket.io.opts.query.userId);


    // You can perform any actions after successful socket connection here
  });

  socket.on("connect_error", (error: any) => {
    console.error("Connection error:", error);
    enqueueSnackbar('Not connected to server!', { variant: 'error' });
    // You can add any custom error handling logic here
  });

  socket.on("ios_prv_message", (message: any) => {
    console.log("Received message:", message);

    // setChatting(true);
    // Update the UI with the message
    // You can use the payload properties here to update the UI as needed
  });

  return socket;
};

const getSocket = () => {
  return socket;
};

export { connectSocket, getSocket };
