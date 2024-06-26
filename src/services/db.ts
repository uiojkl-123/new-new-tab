import db64 from '@root/src/services/db64/db64';

export const initDB = async (storeNames: string[]) => {
  await db64.create('nnt', storeNames);
};

export const getDBAll = async (name: string) => {
  const data = await db64.use('nnt', name).getAll();
  return data;
};

export const getDB = async (name: string, key: string) => {
  const data = await db64.use('nnt', name).get(key);
  return data;
};

export const setDB = async (name: string, key: string, data: unknown) => {
  await db64.use('nnt', name).set(key, data);
};

export const deleteDB = async (name: string, key: string) => {
  await db64.use('nnt', name).delete(key);
};
