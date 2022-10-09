import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";
import AppContext from "../context/AppContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const basePath = router.pathname.split("/");
  const [account, setAccount] = useState([]);
  return (
    <AppContext.Provider value={{ user: account[0], setAccount: setAccount }}>
      <Layout path={basePath[1]}>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
