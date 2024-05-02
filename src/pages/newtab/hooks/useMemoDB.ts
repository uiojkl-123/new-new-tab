import React, { useState, useEffect } from 'react';
import { uuidv7 } from 'uuidv7';
import { useCallback } from 'react';
import { useTaskStore } from '@root/src/stores/NewTab/taskStore';
import db64 from '@root/src/services/db64/db64';
import { DB_STORENAMES } from '@root/src/shared/constants/dbStoreNames';
import { useMemoStore } from '@root/src/stores/NewTab/memoStore';

const initDB = async (storeNames: string[]) => {
  await db64.create('nnt', storeNames);
};

const getDBAll = async (name: string) => {
  const data = await db64.use('nnt', name).getAll();
  return data;
};

const getDB = async (name: string, key: string) => {
  const data = await db64.use('nnt', name).get(key);
  return data;
};

const setDB = async (name: string, key: string, data: unknown) => {
  await db64.use('nnt', name).set(key, data);
};

const deleteDB = async (name: string, key: string) => {
  await db64.use('nnt', name).delete(key);
};

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
    setMemo(result);
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

  return { isLoading, setDBData, refreshData, addDBData, deleteData };
};
