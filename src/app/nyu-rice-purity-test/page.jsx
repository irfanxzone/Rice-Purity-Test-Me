import { buildMetadata } from "@/lib/seo";
import NYURicePurityTestClient from "./NYURicePurityTestClient";

export const metadata = buildMetadata({ path: "/nyu-rice-purity-test" });

export default function NYURicePurityTestPage() {
  return <NYURicePurityTestClient />;
}
