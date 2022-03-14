import { Form, Layout } from "components";
import { useMeQuery } from "generated/graphql";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Login: NextPage = () => {
  const router = useRouter();
  const { data } = useMeQuery();

  if (data?.me) {
    router.replace("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Rooms - Login</title>
        <meta
          name="description"
          content="Connect to rooms and discuss about anything with people"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page="login">
        <Form.Login />
      </Layout>
    </Fragment>
  );
};

export default Login;
