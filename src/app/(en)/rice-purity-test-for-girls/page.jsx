import { buildMetadata } from "@/lib/seo";
import GirlsRicePurityTestClient from "./GirlsRicePurityTestClient";

export const metadata = buildMetadata({ path: "/rice-purity-test-for-girls" });

export default function RicePurityTestForGirlsPage() {
  return <GirlsRicePurityTestClient />;
}
