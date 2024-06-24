import { useEffect, useCallback } from 'react';
import { uuidv7 } from 'uuidv7';
import { useTaskStore } from '@root/src/stores/NewTab/taskStore';
import { DB_STORENAMES } from '@root/src/shared/constants/dbStoreNames';
import { initDB, getDBAll, setDB, deleteDB } from '@root/src/services/db';

export const useTaskDB = <DataType>(
  name: string
): {
  isLoading: boolean;
  setDBData: (key: string, data: DataType) => void;
  addDBData: (data: DataType) => void;
  refreshData: () => void;
  deleteData: (key: string) => void;
} => {
  const setTask = useTaskStore(state => state.setTask);
  const isLoading = useTaskStore(state => state.isLoading);
  const setIsLoading = useTaskStore(state => state.setIsLoading);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await initDB(DB_STORENAMES);
      const initMemoData = await getDBAll(name);
      setTask(initMemoData);
      setIsLoading(false);
      return () => {};
    })();
  }, [name, setIsLoading, setTask]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    const result = await getDBAll(name);
    setTask(result);
    setIsLoading(false);
  }, [name, setIsLoading, setTask]);

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

  return { isLoading, setDBData, refreshData, addDBData, deleteData };
};
