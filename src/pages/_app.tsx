import { Hydrate, QueryClientProvider } from 'react-query';

import { Global } from '@emotion/react';
import { GlobalStyles } from '@/shared/styles/global';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import i18n from '@/locales/i18n';
import queryClient from '@/shared/utils/queryClient';

const App = ({ Component, pageProps }): React.ReactElement => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Global styles={GlobalStyles} />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default App;
