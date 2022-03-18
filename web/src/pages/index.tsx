import { Layout, People, Profile, Room } from "components";
import useRoom from "hooks/useRoom";
import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, useCallback, useMemo, useState } from "react";
import type { RoomList } from "types";
import useIsAuth from "utils/useIsAuth";

const Home: NextPage = () => {
  useIsAuth();
  const { users } = useRoom("ubuntu");

  const rooms: RoomList = useMemo<RoomList>(
    () => [
      {
        id: "ubuntu",
        discussion: "Ubuntu 21.10",
        description: "Awesome features of the latest version of Ubuntu Linux",
        users: 14,
      },
      {
        id: "reversing",
        discussion: "Reversing",
        description: "Secrets of Reverse Engineering",
        users: 9,
      },
    ],
    []
  );

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
