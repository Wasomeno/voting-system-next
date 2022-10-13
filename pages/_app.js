import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import AppContext from "../context/AppContext";
import { useState } from "react";
import useToast, { Toast } from "../components/modal/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const basePath = router.pathname.split("/");
  const [success, error, text, show] = useToast();
  const [account, setAccount] = useState([]);
  const queryClient = new QueryClient();
  return (
    <AnimatePresence>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </AnimatePresence>
  );
}

export default MyApp;
