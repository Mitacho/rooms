import type { People } from "types";
import styles from "./People.module.css";
import PersonListItem from "./PersonListItem";

type Props = {
  people?: People;
};

function PeopleList({ people }: Props): JSX.Element {
  return (
    <ul className={styles.peopleList}>
      {people?.map((person) => (
        <PersonListItem key={person.username} person={person} />
      ))}
    </ul>
  );
}

export default PeopleList;
