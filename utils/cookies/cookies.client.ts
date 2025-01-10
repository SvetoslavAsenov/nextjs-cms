type ReturnedCookieValue = string | null;
type CookieValuesMap<T extends readonly string[]> = {
  [K in T[number]]: ReturnedCookieValue;
};
type SetCookiesItem = [key: string, value: string];
type SetCookiesParam = SetCookiesItem[];

// Function to parse cookies from `document.cookie`
const parseCookies = (): Record<string, string> => {
  return document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = decodeURIComponent(value || "");
    return acc;
  }, {} as Record<string, string>);
};

// Get multiple cookie values by their keys
export const getCookieValuesByKeys = <T extends readonly string[]>(
  namesArray: T
): CookieValuesMap<T> => {
  const cookies = parseCookies();
  const cookieValues: CookieValuesMap<T> = {} as CookieValuesMap<T>;

  namesArray.forEach((key) => {
    cookieValues[key as T[number]] = cookies[key] ?? null;
  });

  return cookieValues;
};

// Get a single cookie value by its key
export const getCookieValueByKey = (key: string): ReturnedCookieValue => {
  const cookies = parseCookies();
  return cookies[key] ?? null;
};

// Set multiple cookies
export const setCookies = (arr: SetCookiesParam) => {
  arr.forEach(([key, value]) => {
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/`;
  });
};

// Set a single cookie
export const setCookie = (key: string, value: string) => {
  setCookies([[key, value]]);
};
