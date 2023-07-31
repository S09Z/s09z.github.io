import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { NextPageWithLayout } from 'src/pages/page';
// ** Component Imports
import DefaultLayout from "src/@core/layouts/DefaultLayout";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout || ((page) => page);
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default MyApp;