import { buildMetadata } from "@/lib/seo";
import FortniteRicePurityTestClient from "./FortniteRicePurityTestClient";

export const metadata = buildMetadata({ path: "/fortnite-rice-purity-test" });

export default function FortniteRicePurityTestPage() {
  return <FortniteRicePurityTestClient />;
}
