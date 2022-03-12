import { Button, Input } from "components";
import { Formik } from "formik";
import { Fragment, useCallback, useState } from "react";
import * as Yup from "yup";
import styles from "./New.module.css";

type Props = {
  open: boolean;
  handleOpen: () => void;
};

const NewRoomSchema = Yup.object().shape({
  discussion: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(4, "Too Short!")
    .max(160, "Too Long!")
    .required("Required"),
});

function New({ open, handleOpen }: Props): JSX.Element {
  const [disabled, setDisabled] = useState<boolean>(false);

  const sleep = useCallback(
    (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
    []
  );

  const handleDisabled = (state: boolean) => {
    setDisabled(state);
  };

  const handleCloseDialog = () => {
    if (!disabled) {
      handleOpen();
    }
  };

  return (
    <Fragment>
      {open ? (
        <Fragment>
          <section
            className={`${styles.section} ${
              disabled ? styles.sectionDisabled : undefined
            }`}
            onClick={handleCloseDialog}
          />
          <Formik
            initialValues={{
              discussion: "",
              description: "",
            }}
            validationSchema={NewRoomSchema}
            onSubmit={async (values) => {
              try {
                handleDisabled(true);
                await sleep(3000);
                handleOpen();
                handleDisabled(false);
              } catch (error) {
                handleDisabled(false);
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <header>
                  <h3>Add new room</h3>
                </header>
                <div>
                  <Input
                    fullWidth
                    label="Discussion"
                    name="discussion"
                    disabled={isSubmitting}
                  />
                  <Input
                    fullWidth
                    label="Description"
                    name="description"
                    disabled={isSubmitting}
                  />
                </div>
                <footer>
                  <Button
                    className="w-100"
                    type="submit"
                    text="New room"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  />
                </footer>
              </form>
            )}
          </Formik>
        </Fragment>
      ) : null}
    </Fragment>
  );
}

export default New;
