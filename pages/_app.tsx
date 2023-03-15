import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import { ChakraProvider } from '@chakra-ui/react';

import { env } from "../utils/env";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThirdwebProvider activeChain={env.activeChain}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  );
}
