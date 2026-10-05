import { buildMetadata } from "@/lib/seo";
import PerformativeRicePurityTestClient from "./PerformativeRicePurityTestClient";

export const metadata = buildMetadata({ path: "/performative-rice-purity-test" });

export default function PerformativeRicePurityTestPage() {
  return <PerformativeRicePurityTestClient />;
}
