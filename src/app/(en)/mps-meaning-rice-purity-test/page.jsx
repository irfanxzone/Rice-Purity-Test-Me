import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ path: "/mps-meaning-rice-purity-test", description: "MPS means \"member of the preferred sex\" in the Rice Purity Test. See the 3 questions that use it and how to answer them." });

import PageClient from "./PageClient";

export default function Page() {
  return <PageClient />;
}
