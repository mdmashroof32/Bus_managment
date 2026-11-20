const STORAGE_KEY = 'bus-passenger-live-count';

export function getPassengerCount() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function publishPassengerCount(count) {
  const value = { count, updatedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // The in-tab event still keeps the dashboards in sync if storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent('bus-passenger-count', { detail: value }));
}

export function subscribePassengerCount(callback) {
  const handleUpdate = (event) => {
    const value = event.type === 'storage'
      ? getPassengerCount()
      : event.detail;
    if (value && Number.isInteger(value.count)) callback(value);
  };

  window.addEventListener('bus-passenger-count', handleUpdate);
  window.addEventListener('storage', handleUpdate);
  return () => {
    window.removeEventListener('bus-passenger-count', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}
