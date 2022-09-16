import type { NextPage } from 'next';
import Posts from '@/components/Posts/Posts';
import React from 'react';
import { dehydrate } from 'react-query';
import queryClient from '@/shared/utils/queryClient';
import styled from '@emotion/styled';
import useQueryExample from '@/components/Posts/Posts.hook';

const HomeContainer = styled.main<React.CSSProperties>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export async function getServerSideProps() {
  const quries = [queryClient.prefetchQuery(useQueryExample.getKeys(), () => useQueryExample.fetcher())];
  await Promise.all(quries);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

const Home: NextPage = (): React.ReactElement => {
  return (
    <HomeContainer>
      <Posts />
    </HomeContainer>
  );
};

export default Home;
