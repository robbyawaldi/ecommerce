import { ChakraProvider, CSSReset, theme } from "@chakra-ui/react"
import { useMemo } from "react";
import '../styles/globals.css'

function MyApp({ Component, pageProps }: any) {
  const customTheme = useMemo(() => ({
    ...theme,
    shadows: {
      ...theme.shadows,
      outline: 'none'
    },
    colors: {
      gold:  {
        300: "rgba(252, 211, 77, 1)"
      }
    }
  }), [])

  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
