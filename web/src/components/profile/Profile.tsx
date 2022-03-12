import { memo } from "react";
import type { Person } from "types";
import Card from "./Card";
import styles from "./Profile.module.css";

type Props = {
  user?: Person;
};

function Profile({ user }: Props): JSX.Element {
  return (
    <aside className={styles.aside}>
      <header className={styles.header}>
        <h3>Profile</h3>
      </header>
      {user ? <Card user={user} /> : null}
    </aside>
  );
}

export default memo(Profile);
