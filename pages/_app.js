/** @format */
import { SessionProvaider } from "../context/sessionContext";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvaider>
      <Component {...pageProps} />
    </SessionProvaider>
  );
}

export default MyApp;
