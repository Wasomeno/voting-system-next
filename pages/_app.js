import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";
import AppContext from "../context/AppContext";
import { useState } from "react";
import useToast, { Toast } from "../components/modal/Toast";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const basePath = router.pathname.split("/");
  const [success, error, text, show] = useToast();
  const [account, setAccount] = useState([]);
  return (
    <AppContext.Provider
      value={{
        user: account[0],
        setAccount: setAccount,
        toast: {
          success: success,
          error: error,
          text: text,
          show: show,
        },
      }}
    >
      <Layout path={basePath[1]}>
        <Component {...pageProps} />
        <Toast />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
