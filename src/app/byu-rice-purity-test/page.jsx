import { buildMetadata } from "@/lib/seo";
import BYURicePurityTestClient from "./BYURicePurityTestClient";

export const metadata = buildMetadata({ path: "/byu-rice-purity-test" });

export default function BYURicePurityTestPage() {
  return <BYURicePurityTestClient />;
}
