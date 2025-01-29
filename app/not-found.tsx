"use client";
import useLocaleFromUrl from "@/hooks/useLocaleFromUrl";
import { getTranslation } from "@/utils/translations";

export default function NotFound() {
  const locale = useLocaleFromUrl();

  return (
    <html>
      <body>
        <div className="flex items-center justify-center h-screen flex-col text-center">
          <h1 className="text-4xl font-bold mb-8 ">
            {getTranslation("page_not_found", locale)}
          </h1>
          <p>{getTranslation("the_page_does_not_exist", locale)}</p>
        </div>
      </body>
    </html>
  );
}
