import { NextPage } from 'next';
import React from 'react';
import { useLoginStore } from '@/stores/common/useLoginStore';

const Voucher: NextPage = (): React.ReactElement => {
  const { loginPath, setLoginPath } = useLoginStore();
  const handleClickLoginPath = () => {
    setLoginPath('click!');
  };

  return <div onClick={handleClickLoginPath}>{loginPath}</div>;
};

export default Voucher;
