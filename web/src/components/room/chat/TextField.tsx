import { Button, Input } from "components";
import { Formik } from "formik";
import { useMeQuery } from "generated/graphql";
import { Fragment } from "react";
import socket from "socket";
import * as Yup from "yup";
import styles from "./TextField.module.css";

type Props = {
  room: string;
};

const NewRoomSchema = Yup.object().shape({
  message: Yup.string().max(150, "Too Long!").required("Required"),
});

function TextField({ room }: Props): JSX.Element {
  const { data } = useMeQuery();

  return (
    <Fragment>
      <Formik
        initialValues={{
          message: "",
        }}
        validationSchema={NewRoomSchema}
        onSubmit={async ({ message }, { resetForm }) => {
          socket.emit("message", data?.me, room, message);
          resetForm();
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              placeholder="Message"
              name="message"
              disabled={isSubmitting}
              centered
              hideErrors
              fullWidth
              noMargin
              style={{
                backgroundColor: "var(--fg-color)",
              }}
            />
            <Button
              className="w-50 p-i blue"
              type="submit"
              text="Send"
              loading={isSubmitting}
              disabled={isSubmitting}
              style={{
                height: "100%",
                marginLeft: "0.5rem",
              }}
            />
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default TextField;
