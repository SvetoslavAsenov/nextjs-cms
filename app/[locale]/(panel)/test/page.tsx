"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import TestTable from "./TestTable";

export default function Test() {
  return (
    <>
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
      <TestTable />
      <div className="flex justify-center pt-4 pb-2">
        <Pagination type="query_param" totalPages={30} />
      </div>
    </>
  );
}
