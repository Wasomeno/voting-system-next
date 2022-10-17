import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import AppContext from "../context/AppContext";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loading } from "../components/modal/Loading";
import { Toast } from "../components/modal/Toast";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const basePath = router.pathname.split("/");
  const [account, setAccount] = useState([]);
  const queryClient = new QueryClient();

  useEffect(() => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  return (
    <AnimatePresence>
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            user: account[0],
            setAccount: setAccount,
          }}
        >
          <Layout path={basePath[1]}>
            <Loading />
            <Component {...pageProps} />
            <Toast />
          </Layout>
        </AppContext.Provider>
      </QueryClientProvider>
    </AnimatePresence>
  );
}

export default MyApp;
