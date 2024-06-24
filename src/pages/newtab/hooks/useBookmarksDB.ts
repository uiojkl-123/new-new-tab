import { useEffect, useCallback } from 'react';
import { uuidv7 } from 'uuidv7';
import { useBookmarkStore } from '@root/src/stores/NewTab/bookmarkStore';
import { DB_STORENAMES } from '@root/src/shared/constants/dbStoreNames';
import { initDB, getDBAll, setDB, deleteDB } from '@root/src/services/db';

export const useBookmarkDB = <DataType>(
  name: string
): {
  isLoading: boolean;
  setDBData: (key: string, data: DataType) => void;
  addDBData: (data: DataType) => void;
  refreshData: () => void;
  deleteData: (key: string) => void;
} => {
  const setBookmark = useBookmarkStore(state => state.setBookmark);
  const isLoading = useBookmarkStore(state => state.isLoading);
  const setIsLoading = useBookmarkStore(state => state.setIsLoading);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await initDB(DB_STORENAMES);
      const initBookmarkData = await getDBAll(name);
      setBookmark(initBookmarkData);
      setIsLoading(false);
      return () => {};
    })();
  }, [name, setIsLoading, setBookmark]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    const result = await getDBAll(name);
    setBookmark(result);
    setIsLoading(false);
  }, [name, setIsLoading, setBookmark]);

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
      console.log('name', name);
      console.log('data', data);

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

  return { isLoading, setDBData, refreshData, addDBData, deleteData };
};
