import { useMeQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useIsAuth() {
  const router = useRouter();
  const { data, loading, client } = useMeQuery();
  useEffect(() => {
    if (!loading && !data?.me) {
      client.clearStore();
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, loading, router]);
}
