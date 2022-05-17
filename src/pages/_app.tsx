import NextApp from 'next/app';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import i18n from '@/locales/i18n';
import '@/styles/main.scss';
import queryClient from '@/shared/utils/queryClient';

const App = ({ Component, pageProps }): React.ReactElement => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Hydrate>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

App.getInitialProps = async (props) => {
  const appProps = await NextApp.getInitialProps(props);
  if (props.Component && props.Component.getInitialProps) appProps.pageProps = await props.Component.getInitialProps(props.ctx);
  return appProps;
};

export default App;
