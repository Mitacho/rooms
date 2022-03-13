import { Layout, People, Profile, Room } from "components";
import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, useCallback, useMemo, useState } from "react";
import type { People as PeopleList, RoomList } from "types";
import useIsAuth from "utils/useIsAuth";

const Home: NextPage = () => {
  useIsAuth();

  const people: PeopleList = useMemo<PeopleList>(
    () => [
      {
        name: "Mitacho",
        username: "mitacho",
        image: "https://avatars.githubusercontent.com/u/50084167?v=4",
        isOnline: true,
      },
      {
        name: "Ben Awad",
        username: "benawad",
        image: "https://avatars.githubusercontent.com/u/7872329?v=4",
        isOnline: false,
      },
      {
        name: "Hasherezade",
        username: "hasherezade",
        image: "https://avatars.githubusercontent.com/u/3115348?v=4",
        isOnline: false,
      },
    ],
    []
  );

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
        <People people={people} />
        <Room.List handleOpen={handleToggleForm} rooms={rooms} />
        <Profile />
      </Layout>
      <Room.New open={open} handleOpen={handleToggleForm} />
    </Fragment>
  );
};

export default Home;
