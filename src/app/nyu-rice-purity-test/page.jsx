import NYURicePurityTestClient from "./NYURicePurityTestClient";

export const metadata = {
  title: "NYU rice purity test",
  description: "The NYU Rice Purity Test is specially designed for NYU students.",
  alternates: { canonical: "https://www.ricepuritytestme.com/nyu-rice-purity-test" },
};

export default function NYURicePurityTestPage() {
  return <NYURicePurityTestClient />;
}
