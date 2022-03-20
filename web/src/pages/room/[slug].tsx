import { Layout, People, Profile, Room } from "components";
import useRoom from "hooks/useRoom";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import useIsAuth from "utils/useIsAuth";

const RoomPage: NextPage = () => {
  useIsAuth();
  const router = useRouter();
  const slug = router.query.slug as string;
  const { room } = useRoom(slug);

  const [open, setOpen] = useState<boolean>(false);

  const handleToggleForm = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Room</title>
        <meta
          name="description"
          content="Connect to rooms and discuss about anything with people"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <People users={room?.members} />
        <Room room={room} />
        <Profile />
      </Layout>
      <Room.New open={open} handleOpen={handleToggleForm} />
    </Fragment>
  );
};

export default RoomPage;
