import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ path: "/mps-meaning-rice-purity-test" });

import PageClient from "./PageClient";

export default function Page() {
  return <PageClient />;
}
