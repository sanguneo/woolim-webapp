import { HomeContainer, getExampleState, setExampleState } from '@/shared/constants/pages';
import React, { useEffect } from 'react';

import Head from 'next/head';
import type { NextPage } from 'next';
import Posts from '@/components/Posts/Posts';
import { dehydrate } from 'react-query';
import queryClient from '@/shared/configs/queryClient';
import { useExampleStore } from '@/stores/useExampleStore';
import useQueryExample from '@/components/Posts/Posts.hook';

export async function getServerSideProps() {
  const quries = [queryClient.prefetchQuery(useQueryExample.getKeys(), () => useQueryExample.fetcher())];
  await Promise.all(quries);
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

const Home: NextPage = (): React.ReactElement => {
  const example = useExampleStore(getExampleState);
  const setExample = useExampleStore(setExampleState);
  useEffect(() => setExample('Durian NEXT exmaple'), []);

  return (
    <>
      <Head>
        <title>Boilerplate Next</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeContainer>
        <h1>{example}</h1>
        <Posts />
      </HomeContainer>
    </>
  );
};

export default Home;
