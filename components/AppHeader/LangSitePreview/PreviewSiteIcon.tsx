import { Eye } from "lucide-react";
import { SITE_BASE_URL } from "@/config/site";

const PreviewSiteIcon = () => (
  <a href={SITE_BASE_URL} rel="noopener noreferrer" target="_blank">
    <Eye className="hover:text-primary text-foreground" />
  </a>
);

export default PreviewSiteIcon;
