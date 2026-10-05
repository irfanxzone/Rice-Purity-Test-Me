import { buildMetadata } from "@/lib/seo";
import TeensRicePurityTestClient from "./TeensRicePurityTestClient";

export const metadata = buildMetadata({ path: "/rice-purity-test-for-teens" });

export default function RicePurityTestForTeensPage() {
  return <TeensRicePurityTestClient />;
}
