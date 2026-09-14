import { useState, useEffect } from 'react';
import { dbInstance } from './database';

export function useDatabase(storeName = null) {
  const [dbStats, setDbStats] = useState(dbInstance.getStats());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to DB connection updates
    const unsubscribe = dbInstance.subscribe((updatedStats) => {
      setDbStats(updatedStats);
    });

    let isMounted = true;

    async function loadStoreData() {
      try {
        setLoading(true);
        await dbInstance.connect();
        if (storeName) {
          const items = await dbInstance.query(storeName);
          if (isMounted) setData(items);
        }
      } catch (err) {
        console.error('Error querying store:', storeName, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStoreData();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [storeName]);

  const upsertItem = async (item) => {
    if (!storeName) return;
    await dbInstance.upsert(storeName, item);
    const updated = await dbInstance.query(storeName);
    setData(updated);
  };

  const deleteItem = async (key) => {
    if (!storeName) return;
    await dbInstance.delete(storeName, key);
    const updated = await dbInstance.query(storeName);
    setData(updated);
  };

  const executeQuery = async (sql) => {
    return await dbInstance.executeSql(sql);
  };

  const resetDb = async () => {
    await dbInstance.resetDatabase();
    if (storeName) {
      const updated = await dbInstance.query(storeName);
      setData(updated);
    }
  };

  return {
    dbStats,
    data,
    loading,
    upsertItem,
    deleteItem,
    executeQuery,
    resetDb,
    dbInstance
  };
}
