import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { HomeContainer, getExampleState, setExampleState } from '@/shared/constants/pages';
import { useExampleStore } from '@/stores/useExampleStore';
import { searchAndScrape } from '../../cr';


export async function getServerSideProps() {
  const doc = await searchAndScrape();
  console.log(doc);
  return { props: { doc } };
}

const Home = ({ doc }: {doc: any}): React.ReactElement => {
  const example = useExampleStore(getExampleState);
  const setExample = useExampleStore(setExampleState);
  useEffect(() => setExample('Durian NEXT exmaple'), []);

  return (
    <HomeContainer>
      <h1>플레이스 순위</h1>
      <div style={{ display: 'flex', width: '500px', gap: '50px' }}>
        {doc.map(pl => <div key={pl[0]} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2>{pl[0]}</h2>
          <h3 style={{ textAlign: 'right' }}>{pl[1].rank}번째</h3>
          <ol style={{ listStyle: 'decimal', listStylePosition: 'inside' }}>{pl[1].list.map(item => <li key={item} style={{ overflow: 'hidden', whiteSpace: 'pre', textOverflow: 'ellipsis', width: '100%', marginBottom: '3px' }}>{item}</li>)}</ol>
        </div>)}
      </div>
    </HomeContainer>
  );
};

export default Home;
