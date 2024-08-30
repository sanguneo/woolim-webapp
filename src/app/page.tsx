'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import listModule from '@/shared/styles/list.module.scss';

const keys = ['공식호실', '동', '층', '호', '명칭', '대표', '전화', '휴대폰', '기타', 'idx'] as const;
type TKeys = typeof keys[number];

export default function Home() {
  const [woolimfloorList, setWoolimfloorList] = useState<Array<Record<TKeys, string>>>([]);

  const [searchCategory, setSearchCategory] = useState<TKeys>('명칭');
  const [query, setQuery] = useState<string>('');

  const [activeRoom, setActiveRoom] = useState<Record<TKeys, string>|null>(null);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value as TKeys);
  };
  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const getList = ()=> fetch('https://script.google.com/macros/s/AKfycbzyJbYPKQyXzPBn_6py2t5zRIqxLVlt3h19tFSr2Ap1FLn6htvGWq1Wj0IDanB6Lbyh/exec')
    .then(e=> e.json())
    .then((list: any[]) => {
      localStorage.setItem('woolimfloor', JSON.stringify(list));
      return list;
    });

  const onClickRefetch = ()=> getList().then((list: any[]) => {
    setWoolimfloorList(list.map((l, idx) => ({ idx, ...l })));
  });

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('woolimfloor') || '[]');
    (list.length ? Promise.resolve(list) : getList()).then((list: any[]) => {
      setWoolimfloorList(list.map((l, idx) => ({ idx, ...l })));
    });
  }, []);

  const queriedList = useMemo(()=> {
    if (query.trim() === '') return woolimfloorList;
    return woolimfloorList.filter(room => room[searchCategory].includes(query));
  }, [woolimfloorList, query, searchCategory]);

  return (
    <>
      <main className={'h-screen overflow-y-scroll relative flex flex-col items-center'}>
        <nav
          className={'w-full h-12 max-w-[500px] min-w-[320px] sticky top-0 gap-4 flex justify-center py-2 bg-white flex-shrink-0 flex-grow-0'}>
          <button onClick={onClickRefetch} className={'text-xs'}>새로고침 ↺</button>
          <select value={searchCategory} onChange={onChangeCategory} className={'w-20'}>
            {keys.map(key => <option value={key} key={key}>{key}</option>)}
          </select>
          <input type="text" placeholder={'검색어 입력'} onChange={onChangeQuery} value={query}
                 className={'flex-[1] h-8 py-0'}/>
        </nav>
        <ul className={`${listModule.list} ${listModule.head}`}>
          <li>
            <div>{'동'}</div>
            <div>{'층'}</div>
            <div>{'호'}</div>
            <div>{'명칭'}</div>
          </li>
        </ul>
        <ul className={listModule.list}>
          {queriedList.map((room) => <li key={room.idx} data-idx={room.idx} onClick={()=>setActiveRoom(room)}>
            <div>{room['동']}</div>
            <div>{room['층']}</div>
            <div>{room['호']}</div>
            <div>{room['명칭']}</div>
          </li>)}
        </ul>
        {activeRoom && <div className={'h-screen w-full max-w-[500px] min-w-[360px] fixed top-0 bg-white px-4 py-2 flex flex-col justify-center'}>
          <b className="text-3xl absolute top-2 right-4 cursor-pointer" onClick={()=>setActiveRoom(null)}>&times;</b>
          <ul className={'flex flex-col gap-4'}>
            {keys.map(key => key !== 'idx' && <li key={key} className={'flex w-full gap-4'}>
              <div className="label w-20 text-right font-bold">{key}</div>
              <div className="content flex-[1]">{activeRoom[key]}</div>
            </li>)}
          </ul>
        </div>}
      </main>
    </>
  );
}
