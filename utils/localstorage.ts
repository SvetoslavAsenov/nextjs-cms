export const setValue = (key: string, value: unknown): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting value in localStorage: ${error}`);
  }
};

export const getValue = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? (JSON.parse(serializedValue) as T) : null;
  } catch (error) {
    console.error(`Error getting value from localStorage: ${error}`);
    return null;
  }
};
