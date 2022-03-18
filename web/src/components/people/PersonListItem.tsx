import { Person } from "types";
import styles from "./People.module.css";

type Props = {
  person: Person;
};

function PersonListItem({ person }: Props): JSX.Element {
  return (
    <li className={`${styles.personListItem} ${styles.personListItemOnline}`}>
      <a
        href={`https://github.com/${person.login}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Visit this user's GitHub profile"
      >
        <picture>
          <img src={person.avatarUrl} alt={`${person.login} profile picture`} />
        </picture>
        <span>{person.name || person.login}</span>
      </a>
    </li>
  );
}

export default PersonListItem;
