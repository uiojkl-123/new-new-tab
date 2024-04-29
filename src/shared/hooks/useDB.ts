import React, { useState, useEffect } from 'react';
import db64 from '../../services/db64/db64';

const initDB = async () => {
  await db64.create('nnt', ['memo']);
};

const getDBMemo = async () => {
  const memo = await db64.use('nnt', 'memo').get('memo');
  return memo;
};

const setDBMemo = async (memo: string) => {
  await db64.use('nnt', 'memo').set('memo', memo);
};

// const addMemo = async (title: string, content: string) => {
//   const memo = await getMemo();
//   const newMemo = {
//     id: uuidv4(),
//     title,
//     content,
//   };
//   memo.push(newMemo);
//   await setMemo(memo);
// };

// const deleteMemo = async (id: string) => {
//   const memo = await getMemo();
//   const newMemo = memo.filter((item: { id: string }) => item.id !== id);
//   await setMemo(newMemo);
// };

export const useDB = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [memoData, setMemoData] = useState<string>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await initDB();
      const initMemoData = await getDBMemo();
      setMemoData(initMemoData);
      setIsLoading(false);
      return () => {};
    })();
  }, []);

  const setMemo = (memo: string) => {
    setIsLoading(true);
    setDBMemo(memo)
      .then(() => {
        console.log('아니 뭐냐고');

        setIsLoading(false);
      })
      .catch(e => {
        console.error(e);
        setIsLoading(false);
      });
  };

  return { data: memoData, isLoading, setMemo };
};
