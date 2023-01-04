import "styles/globals.scss";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "../components/context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "store";
import { useRouter } from "next/router";
import { MQTTProvider } from "@/components/context/MQTTProvider";
import { useEffect } from "react";
import { checkExpiredToken } from "utils/users.utils";
// import { Connector } from "mqtt-react-hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(()=>{
    checkExpiredToken();
  }, [])

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
