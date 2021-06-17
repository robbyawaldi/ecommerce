import { ChakraProvider, CSSReset, theme } from "@chakra-ui/react"
import { useMemo } from "react";
import '../styles/globals.css'
import '../styles/frontend/BottomSheet.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'

function MyApp({ Component, pageProps }: any) {
  const customTheme = useMemo(() => ({
    ...theme,
    shadows: {
      ...theme.shadows,
      outline: 'none'
    },
  }), [])

  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
