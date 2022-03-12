import { memo } from "react";
import type { People as PeopleType } from "types";
import styles from "./People.module.css";
import PeopleList from "./PeopleList";

type Props = {
  people?: PeopleType;
};

function People({ people }: Props): JSX.Element {
  return (
    <aside className={styles.aside}>
      <header className={styles.header}>
        <h3>People</h3>
      </header>
      <PeopleList people={people} />
    </aside>
  );
}

export default memo(People);
