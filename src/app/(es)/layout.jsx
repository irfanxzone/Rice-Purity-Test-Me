import SiteDocument from "@/components/SiteDocument";
export { metadata, viewport } from "@/components/SiteDocument";

export default function Layout({ children }) {
  return <SiteDocument lang="es">{children}</SiteDocument>;
}
