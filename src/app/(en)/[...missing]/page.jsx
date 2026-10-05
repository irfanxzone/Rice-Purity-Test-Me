import { notFound } from "next/navigation";

// Route unknown URLs through the English document and the existing branded 404.
export default function MissingPage() {
  notFound();
}
