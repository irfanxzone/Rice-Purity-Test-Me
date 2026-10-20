import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ path: "/true-asian-rice-purity-test", description: "A parody quiz in the Rice Purity Test format that counts how many Asian upbringing experiences you relate to. 100 items, free and anonymous." });

import PageClient from "./PageClient";

export default function Page() {
  return <PageClient />;
}
