import type { Person } from "types";
import styles from "./People.module.css";

type Props = {
  person: Person;
};

function PersonListItem({ person }: Props): JSX.Element {
  return (
    <li
      className={`${styles.personListItem} ${
        person.isOnline ? styles.personListItemOnline : ""
      }`}
    >
      <a
        href={`https://github.com/${person.username}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Visit this user's GitHub profile"
      >
        <picture>
          <img src={person.image} alt={`${person.username} profile picture`} />
        </picture>
        <span>{person.name}</span>
      </a>
    </li>
  );
}

export default PersonListItem;
