import { RoomsQuery } from "generated/graphql";
import Card from "./Card";

type Props = {
  rooms?: RoomsQuery["rooms"];
};

function List({ rooms }: Props): JSX.Element {
  return (
    <ul>
      {rooms?.map((room) => (
        <Card key={room.slug} room={room} />
      ))}
    </ul>
  );
}

export default List;
