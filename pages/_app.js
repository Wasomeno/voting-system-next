import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(router.locale);
  return (
    <Layout path={router.pathname}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
