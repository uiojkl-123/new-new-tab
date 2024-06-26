import { useEffect, useCallback } from 'react';
import { uuidv7 } from 'uuidv7';
import { DB_STORENAMES } from '@root/src/shared/constants/dbStoreNames';
import { useMemoStore } from '@root/src/stores/NewTab/memoStore';
import { initDB, getDBAll, setDB, deleteDB } from '@root/src/services/db';
import { useVisibility } from './useVisibility';

export const useMemoDB = <DataType>(
  name: string
): {
  isLoading: boolean;
  setDBData: (key: string, data: DataType) => void;
  addDBData: (data: DataType) => void;
  refreshData: () => void;
  deleteData: (key: string) => void;
} => {
  const setMemo = useMemoStore(state => state.setMemo);
  const isLoading = useMemoStore(state => state.isLoading);
  const setIsLoading = useMemoStore(state => state.setIsLoading);

  const { visibility } = useVisibility();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await initDB(DB_STORENAMES);
      const initMemoData = await getDBAll(name);
      setMemo(initMemoData.memo);
      setIsLoading(false);
      return () => {};
    })();
  }, [name, setIsLoading, setMemo]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    const result = await getDBAll(name);
    setMemo(result.memo);
    setIsLoading(false);
  }, [name, setIsLoading, setMemo]);

  const setDBData = useCallback(
    async (key: string, data: DataType) => {
      setIsLoading(true);
      await setDB(name, key, data);
      setIsLoading(false);
    },
    [name, setIsLoading]
  );

  const addDBData = useCallback(
    async (data: DataType) => {
      setIsLoading(true);
      await setDB(name, uuidv7(), data);
      await refreshData();
      setIsLoading(false);
    },
    [name, refreshData, setIsLoading]
  );

  const deleteData = useCallback(
    async (key: string) => {
      setIsLoading(true);
      await deleteDB(name, key);
      await refreshData();
      setIsLoading(false);
    },
    [name, refreshData, setIsLoading]
  );

  useEffect(() => {
    if (visibility) {
      refreshData();
    }
  }, [visibility, refreshData]);

  return { isLoading, setDBData, refreshData, addDBData, deleteData };
};
