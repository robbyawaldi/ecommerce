import { ChakraProvider, CSSReset } from "@chakra-ui/react"
import '../styles/globals.css'

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
