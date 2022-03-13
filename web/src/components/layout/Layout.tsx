import styles from "./Layout.module.css";

type Page = "home" | "login";

type Props = {
  page?: Page;
  children?: React.ReactNode;
};

function Layout({ children, page = "home" }: Props): JSX.Element {
  return <main className={styles[page]}>{children}</main>;
}

export default Layout;
