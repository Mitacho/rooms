import Button from "components/button/Button";
import Input from "components/input/Input";
import { Formik } from "formik";
import { useFindGitHubUserMutation, useLoginMutation } from "generated/graphql";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { toErrorMap } from "utils/toErrorMap";
import * as Yup from "yup";
import styles from "./Form.module.css";

const FindUserSchema = Yup.object().shape({
  login: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = (): JSX.Element => {
  const [login] = useLoginMutation();
  const [findGitHubUser] = useFindGitHubUserMutation();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        login: "",
      }}
      validationSchema={FindUserSchema}
      onSubmit={async (values, { setErrors }) => {
        // find github user
        const response = await findGitHubUser({
          variables: {
            ...values,
          },
        });

        if (response.data?.findGitHubUser.errors) {
          setErrors(toErrorMap(response.data.findGitHubUser.errors));
        } else if (response.data?.findGitHubUser.user) {
          // login using github user
          const user = response.data?.findGitHubUser.user;
          delete user.__typename;
          const loginResponse = await login({
            variables: {
              options: {
                ...user,
              },
            },
          });
          if (loginResponse.data?.login.errors) {
            setErrors(toErrorMap(loginResponse.data.login.errors));
          }

          if (loginResponse.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        } else if (response.data?.findGitHubUser.user === null) {
          setErrors(
            toErrorMap([
              {
                field: "login",
                message: "User not found",
              },
            ])
          );
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2 className="text-secondary-color mb-200 font-size-120 break-word">
            Introduce your GitHub username
          </h2>
          <Input name="login" label="Username" />
          <Button
            className="w-50"
            type="submit"
            text="Login"
            style={{ marginTop: "1rem" }}
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </form>
      )}
    </Formik>
  );
};

const Form = () => <Fragment />;

Form.Login = Login;

export default Form;
