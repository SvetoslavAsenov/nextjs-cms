import { getLocaleFromUrl } from "@/utils/locale";
import { usePathname } from "next/navigation";

const useLocaleFromUrl = () => {
  const pathname = usePathname();
  return getLocaleFromUrl(pathname);
};

export default useLocaleFromUrl;
