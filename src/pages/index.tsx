// eslint-disable-next-line @next/next/no-img-element
import Link from 'next/link';
import { useRouter } from 'next/router';
import BlankLayout from 'src/layouts/BlankLayout';
import { NextPageWithLayout } from './page';

import {
  Grid,
  Avatar
} from '@mui/material'

const assetPrefix = '.';

const Home: NextPageWithLayout = () => {
  const { locale } = useRouter();

  return (
    <Grid container className="flex flex-col items-center gap-y-5 mt-12 sm:mt-36">
      <Grid item xs={12}>
        <img
          src={`${assetPrefix}/next.svg`}
          alt="NextJS Logo"
          width={272}
          height={92}
        />
      </Grid>
      <Grid item xs={12}>
        <p>
          Google offered in:{' '}
          <Link href="/" locale={locale === 'en' ? 'fr' : 'en'}>
            {'Français'}
          </Link>
        </p>
      </Grid>
    </Grid>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <BlankLayout>{page}</BlankLayout>;
};