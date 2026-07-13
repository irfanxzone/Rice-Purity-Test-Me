import BYURicePurityTestClient from "./BYURicePurityTestClient";

export const metadata = {
  title: "BYU Rice Purity Test",
  description: "The BYU Rice Purity Test is an updated and a customized version of the original Rice Purity Test.",
  alternates: { canonical: "https://www.ricepuritytestme.com/byu-rice-purity-test" },
};

export default function BYURicePurityTestPage() {
  return <BYURicePurityTestClient />;
}
