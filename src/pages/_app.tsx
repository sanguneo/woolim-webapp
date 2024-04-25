import { Hydrate, QueryClientProvider } from 'react-query';

import { Global } from '@emotion/react';
import { GlobalStyles } from '@/shared/styles/global';
import Head from 'next/head';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import queryClient from '@/shared/configs/queryClient';

const App = ({ Component, pageProps }): React.ReactElement => {
  const env = process.env.NODE_ENV;
  return (
    <>
      <Head>
        <title>Boilerplate Next</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Global styles={GlobalStyles} />
        {env === 'development' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default App;
