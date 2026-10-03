import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ path: "/gay-rice-purity-test" });

import PageClient from "./PageClient";

export default function Page() {
  return <PageClient />;
}
