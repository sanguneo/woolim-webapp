import { Hydrate, QueryClientProvider } from 'react-query';
import React, { useEffect } from 'react';

import { Global } from '@emotion/react';
import { GlobalStyles } from '@/shared/styles/global';
import { I18nextProvider } from 'react-i18next';
import colorSet from '@/shared/configs/colorSet.json';
import cssVars from 'css-vars-ponyfill';
import i18n from '@/locales/i18n';
import queryClient from '@/shared/utils/queryClient';

const App = ({ Component, pageProps }): React.ReactElement => {
  const selectedColor = 'default';

  useEffect(() => {
    cssVars({
      rootElement: document.documentElement,
      variables: { ...colorSet[selectedColor] },
    });
  }, []);

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
