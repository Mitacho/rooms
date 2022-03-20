import { Room, RoomQuery, useMeQuery, useRoomQuery } from "generated/graphql";
import { useEffect, useMemo, useState } from "react";
import socket from "socket";
import { People } from "types";

type RoomState = {
  users: People;
  room: Partial<RoomQuery["room"]>;
};

export default function useRoom(room: string): RoomState {
  const { data: roomData } = useRoomQuery({ variables: { slug: room } });
  const initialState = useMemo<RoomState>(
    () => ({
      users: [],
      room: null,
    }),
    []
  );

  const { data } = useMeQuery();
  const [state, setState] = useState<RoomState>(initialState);

  const listAllUsers = (users: People) => {
    if (!data?.me) return;
    console.log("%cUSEEERS: ", "color: orange; font-weight: 500;", users);
    const filteredUsers = users.filter((user) => user.login !== data.me?.login);
    setState((prevState) => ({ ...prevState, users: filteredUsers }));
  };

  // TODO: fix rendering the same many times
  const handleNewMessage = (data: Room["messages"][0]) => {
    const messageFound = state.room?.messages?.find(
      (message) => message.id === data.id
    );

    if (messageFound) return;

    setState((prevState) => ({
      ...prevState,
      room: {
        ...prevState.room,
        messages: [...(prevState.room?.messages || []), data],
      },
    }));
  };

  useEffect(() => {
    setState((currentState) => ({
      ...currentState,
      room: roomData?.room,
    }));
  }, [roomData]);

  if (!data?.me) return initialState;

  socket.auth = { user: data.me };
  socket.connect();

  socket.on("users", listAllUsers);
  socket.on("newMessage", handleNewMessage);

  socket.emit("join", room);

  return {
    ...state,
  };
}
