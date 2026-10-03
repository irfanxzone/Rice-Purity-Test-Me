import { buildMetadata } from "@/lib/seo";
import BDSMTestClient from "./BDSMTestClient";

export const metadata = buildMetadata({ path: "/bdsm-test" });

export default function BDSMTestPage() {
  return <BDSMTestClient />;
}
