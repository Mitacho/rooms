import { RoomQuery } from "generated/graphql";
import { Fragment } from "react";
import Balloon from "./Balloon";
import styles from "./Chat.module.css";
import TextField from "./TextField";

type Props = {
  room: RoomQuery["room"];
};

function Chat({ room }: Props): JSX.Element {
  if (!room) return <Fragment />;

  return (
    <Fragment>
      <section className={styles.chat}>
        <ul>
          {room.messages.map((message) => (
            <li className={styles.chatListItem} key={message.time.toString()}>
              <Balloon item={message} />
            </li>
          ))}
        </ul>
        <TextField room={room.slug} />
      </section>
    </Fragment>
  );
}

export default Chat;
