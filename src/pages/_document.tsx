/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ServerStyleSheets } from '@mui/styles';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function MyDocument() {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <div
          id="portals-modal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#f2f4f7',
          }}
        />
        <NextScript />
      </body>
    </Html>
  );
}

// MyDocument.getInitialProps = async (ctx) => {
//   const materialSheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => materialSheets.collect(<App {...props} />),
//     });

//   const initialProps = await Document.getInitialProps(ctx);
//   return {
//     ...initialProps,
//     styles: <>{initialProps.styles}</>,
//   };
// };
