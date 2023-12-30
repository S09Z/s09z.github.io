// ** React Imports
import { ReactNode } from "react";

// ** Next Imports
import Head from "next/head";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// ** Third Party Import
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// ** Component Imports
import DefaultLayout from "src/@core/layouts/DefaultLayout";

// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";

// ** React I18n Config
import "src/i18n/config";

// ** react redux
import { Provider } from "react-redux";
import { store } from "src/store";

// ** Global css styles
import "@/app/styles/globals.css";

interface LayoutProps {
  getLayout?: (page: ReactNode) => ReactNode;
}

type NextPageWithLayout = NextPage & LayoutProps;

type ExtendedAppProps = AppProps & {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
};

const queryClient = new QueryClient();

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
});

function MyApp(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>S09Z - Portfolio</title>
        <meta
          name="description"
          content="S098 Portfolio - Ittichai Boonyarakthunya - Full Stack Developer"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {getLayout(<Component {...pageProps} />)}
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
