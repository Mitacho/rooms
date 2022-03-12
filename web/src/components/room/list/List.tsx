import type { RoomList } from "types";
import Card from "./Card";

type Props = {
  rooms?: RoomList;
};

function List({ rooms }: Props): JSX.Element {
  return (
    <ul>
      {rooms?.map((room) => (
        <Card key={room.id} room={room} />
      ))}
    </ul>
  );
}

export default List;
