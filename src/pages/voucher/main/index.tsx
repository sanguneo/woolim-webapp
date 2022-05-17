import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { useQuery } from 'react-query';
import QUERY_KEYS from '@/shared/apis/queryKeys/example';
import { voucherApi } from '@/shared/apis/voucher';

const Main: NextPage = (): React.ReactElement => {
  const { isLoading, data } = useQuery([QUERY_KEYS.VOUCHER_MAIN_BANNER], () => voucherApi.get<any>('common/multimedia/MAIN_BANNER'));
  if (isLoading) return <>Loading...</>;
  return (
    <div>
      {data.multimediaFiles.map((item) => (
        <Image key={item.fileLink} src={item.fileLink} width={300} height={250} alt="image" />
      ))}
    </div>
  );
};

export default Main;
