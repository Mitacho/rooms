import { memo } from "react";
import Card from "./Card";
import styles from "./Profile.module.css";

type Props = {};

function Profile(props: Props): JSX.Element {
  return (
    <aside className={styles.aside}>
      <header className={styles.header}>
        <h3>Profile</h3>
      </header>
      <Card />
    </aside>
  );
}

export default memo(Profile);
