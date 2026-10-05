import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ path: "/rice-purity-test-in-spanish" });

import PageClient from "./PageClient";

export default function Page() {
  return <PageClient />;
}
