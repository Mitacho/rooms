import { Room } from "generated/graphql";
import { memo } from "react";
import { RoomList } from "types";
import List from "./List";
import styles from "./RoomList.module.css";

type Props = {
  rooms?: Array<Room>;
  handleOpen: () => void;
};

function RoomList({ rooms, handleOpen }: Props): JSX.Element {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h3>Room list</h3>
        <button onClick={handleOpen} className="notExpand">
          New room
        </button>
      </header>
      <List rooms={rooms} />
    </section>
  );
}

export default memo(RoomList);
