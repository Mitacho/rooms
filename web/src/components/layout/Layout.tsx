import { memo } from "react";
import styles from "./Layout.module.css";

type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props): JSX.Element {
  return <main className={styles.main}>{children}</main>;
}

export default memo(Layout);
