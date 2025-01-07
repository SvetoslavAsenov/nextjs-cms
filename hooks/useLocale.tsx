import { getLocaleFromUrl } from "@/utils/locale";
import { usePathname } from "next/navigation";

const useLocale = () => {
  const pathname = usePathname();
  return getLocaleFromUrl(pathname);
};

export default useLocale;
