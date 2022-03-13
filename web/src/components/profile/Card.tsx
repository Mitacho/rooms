import Button from "components/button/Button";
import { useLogoutMutation, useMeQuery, User } from "generated/graphql";
import { useRouter } from "next/router";
import { useCallback } from "react";
import isServer from "utils/isServer";
import styles from "./Profile.module.css";

type Props = {};

function Card(props: Props): JSX.Element {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { data } = useMeQuery({
    skip: isServer(),
  });

  let user: User | null = null;

  if (data?.me) {
    user = data?.me;
  }

  const handleLogout = useCallback(async () => {
    await logout();
    router.reload();
  }, [router, logout]);

  return (
    <div className={styles.card}>
      <header>
        <picture>
          <img src={user?.avatarUrl} alt={`Profile picture`} />
        </picture>
        <div className={styles.cardUsername}>
          <h3>{user?.name || user?.login}</h3>
          <h4>{user?.login}</h4>
        </div>
      </header>
      <div>
        <Button text="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Card;
