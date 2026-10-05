import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ path: "/rice-purity-test-for-14-years-old" });

import PageClient from "./PageClient";

export default function Page() {
  return <PageClient />;
}
