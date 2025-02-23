"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function Test() {
  return (
    <div className="pb-2 border-bottom-solid">
      <Breadcrumbs
        items={[
          { label: "лорем ипсум", href: "/users" },
          { label: "сит долор" },
          { label: "лорем ипсум", href: "/test" },
          { label: "сит долор" },
        ]}
      />
    </div>
  );
}
