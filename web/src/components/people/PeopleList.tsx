import { Room } from "generated/graphql";
import styles from "./People.module.css";
import PersonListItem from "./PersonListItem";

type Props = {
  users: Room["members"];
};

function PeopleList({ users }: Props): JSX.Element {
  return (
    <ul className={styles.peopleList}>
      {users.map((person) => (
        <PersonListItem key={person.login} person={person} />
      ))}
    </ul>
  );
}

export default PeopleList;
