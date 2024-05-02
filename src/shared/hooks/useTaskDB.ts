import React, { useState, useEffect } from 'react';
import db64 from '../../services/db64/db64';
import { DB_STORENAMES } from '../constants/dbStoreNames';
import { uuidv7 } from 'uuidv7';
import { useCallback } from 'react';
import { useTaskStore } from '@root/src/stores/NewTab/taskStore';

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

export const useDB = <DataType>(
  name: string
): {
  isLoading: boolean;
  setDBData: (key: string, data: DataType) => Promise<void>;
  addDBData: (data: DataType) => Promise<void>;
  refreshData: () => Promise<void>;
  deleteData: (key: string) => Promise<void>;
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
      await refreshData();
      setIsLoading(false);
    },
    [name, refreshData, setIsLoading]
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
