import "styles/globals.scss";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "../components/context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "store";
import { getCookieUserJWT } from "utils/users.utils";
import { useRouter } from "next/router";
import { MQTTProvider } from "@/components/context/MQTTProvider";
// import { Connector } from "mqtt-react-hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <MQTTProvider>
        <NextUIProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </NextUIProvider>
      </MQTTProvider>
    </Provider>
  );
}

export default MyApp;
