import RoomList from "./list/RoomList";
import New from "./new/New";
import styles from "./Room.module.css";

type Props = {};

const Room = (props: Props): JSX.Element => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h3>Room</h3>
      </header>
    </section>
  );
};

Room.List = RoomList;
Room.New = New;

export default Room;
