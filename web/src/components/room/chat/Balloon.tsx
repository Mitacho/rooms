/* eslint-disable @next/next/no-img-element */
import { formatDistanceToNow } from "date-fns";
import { Room, useMeQuery } from "generated/graphql";
import { useEffect, useState } from "react";
import { ONE_MINUTE } from "../../../constants";
import styles from "./Balloon.module.css";

type Props = {
  item: Room["messages"][0];
};

function Balloon({ item }: Props): JSX.Element {
  const { data } = useMeQuery();
  const { from, message, time } = item;
  const [distanceTime, setDistanceTime] = useState(
    formatDistanceToNow(new Date(time))
  );

  useEffect(() => {
    function updateDistanceTime() {
      setDistanceTime(formatDistanceToNow(new Date(time)));
    }

    setInterval(updateDistanceTime, ONE_MINUTE);
  }, []);

  return (
    <article
      className={`${styles.container} ${
        from.login === data?.me?.login ? styles.darker : undefined
      }`}
    >
      <img
        src={from.avatarUrl}
        alt={from.login}
        className={from.login === data?.me?.login ? styles.right : undefined}
      />
      <p>{message}</p>
      <time
        className={`${styles.time} ${
          from.login === data?.me?.login ? styles.timeLeft : styles.timeRight
        }`}
      >
        {distanceTime}
      </time>
    </article>
  );
}

export default Balloon;
