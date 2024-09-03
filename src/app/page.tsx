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

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

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
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);  // 이벤트를 상태로 저장
      setIsInstallable(true);  // 설치 가능한 상태로 설정

    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);



    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  useEffect(() => {
    if (!isInstallable) return;
    setTimeout(()=> {
      let event = new MouseEvent('click', {
        'view' : window,
        'bubbles' : true,
        'cancelable' : true
      });
      (document.querySelector('#install') as HTMLButtonElement).dispatchEvent(event);
    }, 500);
  }, [isInstallable]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();  // 설치 프롬프트 표시
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);  // 프롬프트 사용 후 초기화
      setIsInstallable(false);  // 설치 가능 상태 해제
    }
  };

  const queriedList = useMemo(()=> {
    if (query.trim() === '') return woolimfloorList;
    return woolimfloorList.filter(room => room[searchCategory].includes(query));
  }, [woolimfloorList, query, searchCategory]);

  return (
    <>
      <main className={'h-screen overflow-y-scroll relative flex flex-col items-center'}>
        <nav className={'w-full h-12 max-w-[500px] min-w-[300px] sticky top-0 gap-4 flex justify-center py-2 bg-white flex-shrink-0 flex-grow-0'}>
          {isInstallable && <button onClick={handleInstallClick} id="install" className={'absolute l-[-20px] top-[-20px] w-[10px] h-[10px]'}>설치</button>}
          <button onClick={onClickRefetch} className={'text-xs whitespace-pre w-16'}>새로고침 ↺</button>
          <select value={searchCategory} onChange={onChangeCategory} className={'w-16 whitespace-pre'}>
            {keys.map(key => key !== 'idx' && <option value={key} key={key}>{key}</option>)}
          </select>
          <input type="text" placeholder={'검색어 입력'} onChange={onChangeQuery} value={query} className={'w-[calc(100%-12rem)] h-8 py-0'} />
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
        {activeRoom && <div className={'h-screen w-full max-w-[500px] min-w-[300px] fixed top-0 bg-white px-4 py-2 flex flex-col justify-center'}>
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
