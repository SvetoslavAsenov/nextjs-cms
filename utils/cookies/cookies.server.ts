import { cookies as serverCookies } from "next/headers";

type ReturnedCookieValue = string | null;
type CookieValuesMap<T extends readonly string[]> = {
  [K in T[number]]: ReturnedCookieValue;
};
type SetCookiesItem = [key: string, value: string];
type SetCookiesArrayParam = SetCookiesItem[];
type SetCookiesOptionsParam = Partial<{
  httpOnly: boolean;
  sameSite: "strict" | "lax" | "none";
  secure: boolean;
  maxAge: number;
  path: string;
}>;

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
export const setCookies = async (
  cookiesArray: SetCookiesArrayParam,
  options: SetCookiesOptionsParam = {}
) => {
  const cookies = await serverCookies();
  const defaultOptions = {
    httpOnly: true,
    sameSite: "strict" as const, // Типът трябва да бъде строго зададен
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600, // 1 час по подразбиране
    path: "/",
  };

  const finalOptions = { ...defaultOptions, ...options };

  cookiesArray.forEach(([key, value]) => {
    cookies.set(key, value, finalOptions);
  });
};
// Set a single cookie on the server
export const setCookie = async (
  key: string,
  value: string,
  options: SetCookiesOptionsParam = {}
) => {
  await setCookies([[key, value]], options);
};
