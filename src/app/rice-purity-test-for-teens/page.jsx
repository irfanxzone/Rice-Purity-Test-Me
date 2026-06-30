import TeensRicePurityTestClient from "./TeensRicePurityTestClient";

export const metadata = {
  title: "Rice Purity Test for Teens 2026",
  description: "The Rice Purity Test for teens is an age-specific version of the famous Purity Test, which young people take for fun, curiosity, and self-reflection.",
  alternates: { canonical: "https://www.ricepuritytestme.com/rice-purity-test-for-teens" },
};

export default function RicePurityTestForTeensPage() {
  return <TeensRicePurityTestClient />;
}
