import { cookies as serverCookies } from "next/headers";

type ReturnedCookieValue = string | null;
type CookieValuesMap<T extends readonly string[]> = {
  [K in T[number]]: ReturnedCookieValue;
};
type SetCookiesItem = [key: string, value: string];
type SetCookiesParam = SetCookiesItem[];

// Fetch multiple cookie values by their keys
export const getCookieValuesByKeys = async <T extends readonly string[]>(
  namesArray: T
): Promise<CookieValuesMap<T>> => {
  const cookies = await serverCookies();
  const cookieValues: CookieValuesMap<T> = {} as CookieValuesMap<T>;
  namesArray.forEach((key) => {
    const cookie = cookies.get(key);
    cookieValues[key as T[number]] = cookie?.value ?? null;
  });

  return cookieValues;
};

// Fetch a single cookie value by its key
export const getCookieValueByKey = async (
  key: string
): Promise<ReturnedCookieValue> => {
  const result = await getCookieValuesByKeys([key]);
  return result[key];
};

// Set multiple cookies on the server
export const setCookies = async (arr: SetCookiesParam) => {
  const cookies = await serverCookies();

  for (const [key, value] of arr) {
    cookies.set(key, value);
  }
};

// Set a single cookie on the server
export const setCookie = async (key: string, value: string) => {
  await setCookies([[key, value]]);
};
