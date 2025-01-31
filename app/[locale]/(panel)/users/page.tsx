import Breadcrumbs from "@/components/Breadcrumbs";

import type { SupportedLocale } from "@/types/locales";

export default async function Users({
  params,
}: {
  params: { locale: SupportedLocale };
}) {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "лорем ипсум", href: "/users" },
          { label: "лорем ипсум", href: "/users/test" },
          { label: "сит долор" },
        ]}
      />
    </div>
  );
}
