import { buildMetadata } from "@/lib/seo";
import AIPurityTestClient from "./AIPurityTestClient";

export const metadata = buildMetadata({ path: "/ai-purity-test" });

export default function AIPurityTestPage() {
  return <AIPurityTestClient />;
}
