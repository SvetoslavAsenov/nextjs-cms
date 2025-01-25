import { SiteProvider as Provider } from "@/providers/siteProvider";

import type { SiteSupportedLocale } from "@/types/site/locales";

type SiteProviderProps = {
  initialSiteLocale: SiteSupportedLocale;
  children: React.ReactNode;
};

const SiteProvider = ({ initialSiteLocale, children }: SiteProviderProps) => {
  return <Provider initialSiteLocale={initialSiteLocale}>{children}</Provider>;
};

export default SiteProvider;
