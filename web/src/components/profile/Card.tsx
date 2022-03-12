import type { Person } from "types";
import styles from "./Profile.module.css";

type Props = {
  user: Person;
};

function Card({ user }: Props): JSX.Element {
  return (
    <div className={styles.card}>
      <header>
        <picture>
          <img src={user.image} alt={`${user.name}'s profile picture`} />
        </picture>
        <div className={styles.cardUsername}>
          <h3>{user.name}</h3>
          <h4>{user.username}</h4>
        </div>
      </header>
      <div>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Card;
