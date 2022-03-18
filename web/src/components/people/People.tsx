import { memo } from "react";
import { People } from "types";
import styles from "./People.module.css";
import PeopleList from "./PeopleList";

type Props = {
  users: People;
};

function People({ users }: Props): JSX.Element {
  return (
    <aside className={styles.aside}>
      <header className={styles.header}>
        <h3>People</h3>
      </header>
      <PeopleList users={users} />
    </aside>
  );
}

export default memo(People);
