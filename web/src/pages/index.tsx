import { Layout, People, Profile, Room } from "components";
import { useRoomsQuery } from "generated/graphql";
import useRoom from "hooks/useRoom";
import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, useCallback, useState } from "react";
import useIsAuth from "utils/useIsAuth";

const Home: NextPage = () => {
  useIsAuth();
  const { users } = useRoom("ubuntu");

  const { data: roomsData } = useRoomsQuery();
  const rooms = roomsData?.rooms || [];

  const [open, setOpen] = useState<boolean>(false);

  const handleToggleForm = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Rooms</title>
        <meta
          name="description"
          content="Connect to rooms and discuss about anything with people"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <People users={users} />
        <Room.List handleOpen={handleToggleForm} rooms={rooms} />
        <Profile />
      </Layout>
      <Room.New open={open} handleOpen={handleToggleForm} />
    </Fragment>
  );
};

export default Home;
