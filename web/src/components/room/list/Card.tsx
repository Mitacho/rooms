import { Room } from "generated/graphql";
import Link from "next/link";
import styles from "./RoomList.module.css";

type Props = {
  room: Room;
};

function Card({ room }: Props): JSX.Element {
  return (
    <Link href={`/room/${room.slug}`} passHref>
      <article title="Join this room" className={styles.card}>
        <header>
          <h2>{room.discussion}</h2>
          <div className={styles.usersIndicator}>
            <div className="onlineDot sm"></div>
            <span>{room.members.length}</span>
          </div>
        </header>
        <p>{room.description}</p>
      </article>
    </Link>
  );
}

export default Card;
