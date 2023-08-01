// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Third Party Import
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// ** Component Imports
import DefaultLayout from "src/@core/layouts/DefaultLayout";

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";

// ** React I18n Config
import "src/i18n/config";

// ** react redux
import { Provider } from "react-redux";
import { store } from "src/store";

// ** Global css styles
import "../../styles/globals.css";

interface LayoutProps {
  getLayout?: (page: ReactNode) => ReactNode;
}

type NextPageWithLayout = NextPage & LayoutProps;

type ExtendedAppProps = AppProps & {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
}

const queryClient = new QueryClient();

const clientSideEmotionCache = createEmotionCache()

function MyApp(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Flow - ระบบจัดการเอกสาร เซ็นออนไลน์ และบริหารเวิร์คโฟลว์การทำงาน
        </title>
        <meta
          name="description"
          content="จากปัญหาในการทำงานเอกสารของบริษัทมหาชนไทยที่มีพนักงานกว่า 1,000 คน สู่การพัฒนาโปรแกรม Flow (BPM Platform) ที่มีระบบจัดการเอกสาร บริหารเวิร์คโฟลว์การทำงาน ช่วยแก้ปัญหาความยุ่งยากและลดเวลาทำงานเอกสารภายในองค์กรได้จริง"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
