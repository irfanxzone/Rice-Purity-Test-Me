import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ path: "/ao3-rice-purity-test" });

import PageClient from "./PageClient";

export default function Page() {
  return <PageClient />;
}
