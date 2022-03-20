import { Room as RoomType } from "generated/graphql";
import Chat from "./chat/Chat";
import RoomList from "./list/RoomList";
import New from "./new/New";
import styles from "./Room.module.css";

type Props = {
  room: RoomType | undefined | null;
};

const Room = ({ room }: Props): JSX.Element => {
  return (
    <section className={styles.section}>
      <Chat room={room} />
    </section>
  );
};

Room.List = RoomList;
Room.New = New;

export default Room;
