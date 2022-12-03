import "styles/globals.scss";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "../components/context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "store";
import { getCookieUserJWT } from "utils/users.utils";
import { useRouter } from "next/router";
import { MQTTProvider } from "@/components/context/MQTTProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <Provider store={store}>      
      <NextUIProvider>
        <AuthProvider>
          <MQTTProvider>
            <Component {...pageProps} />
          </MQTTProvider>
        </AuthProvider>
      </NextUIProvider>
    </Provider>
  );
}

export default MyApp;
