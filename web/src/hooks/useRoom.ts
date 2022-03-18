import { useMeQuery } from "generated/graphql";
import { useMemo, useState } from "react";
import socket from "socket";
import { People } from "types";

type RoomState = {
  users: People;
};

export default function useRoom(room: string): RoomState {
  const initialState = useMemo<RoomState>(
    () => ({
      users: [],
    }),
    []
  );

  const { data } = useMeQuery();
  const [state, setState] = useState<RoomState>(initialState);

  const listAllUsers = (users: People) => {
    if (!data?.me) return;
    console.log("%cUSEEERS: ", "color: orange; font-weight: 500;", users);
    const filteredUsers = users.filter((user) => user.login !== data.me?.login);
    setState((currentState) => ({ ...currentState, users: filteredUsers }));
  };

  if (!data?.me) return initialState;

  socket.auth = { user: data.me };
  socket.connect();

  socket.on("users", listAllUsers);

  socket.emit("join", room);

  return {
    ...state,
  };
}
