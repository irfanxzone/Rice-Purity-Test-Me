import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ path: "/rice-purity-test-for-virgins" });

import PageClient from "./PageClient";

export default function Page() {
  return <PageClient />;
}
