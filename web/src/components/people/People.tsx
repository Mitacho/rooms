import { Room } from "generated/graphql";
import { memo } from "react";
import { People } from "types";
import styles from "./People.module.css";
import PeopleList from "./PeopleList";

type Props = {
  users: Room["members"] | undefined;
};

function People({ users }: Props): JSX.Element {
  return (
    <aside className={styles.aside}>
      <header className={styles.header}>
        <h3>People</h3>
      </header>
      {users ? <PeopleList users={users} /> : null}
    </aside>
  );
}

export default memo(People);
