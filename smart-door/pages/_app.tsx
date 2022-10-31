import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '../components/context/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NextUIProvider>
  )
}

export default MyApp
