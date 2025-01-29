"use client";

import { Eye } from "lucide-react";
import { SITE_BASE_URL } from "@/config/site";
import { useTranslate } from "@/hooks/useTranslate";

const PreviewSiteIcon = () => {
  const { translate } = useTranslate();

  return (
    <a
      href={SITE_BASE_URL}
      rel="noopener noreferrer"
      target="_blank"
      title={translate("preview_site")}
    >
      <Eye className="hover:text-primary text-foreground" />
    </a>
  );
};

export default PreviewSiteIcon;
