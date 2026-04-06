import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { AmazonFbaCalculator } from "./AmazonFbaCalculator";

export const metadata: Metadata = {
  title:
    "Calculadora FBA Amazon Grátis — Calcule Custos, Lucro e ROI",
  description:
    "Calcule custos de Fulfillment by Amazon (FBA), comissão por categoria, lucro líquido e ROI gratuitamente. Ferramenta online para vendedores Amazon Brasil estimarem a rentabilidade de seus produtos.",
  keywords: [
    "calculadora fba amazon",
    "amazon fba calculator",
    "calcular custos fba",
    "calculadora amazon brasil",
    "comissão amazon por categoria",
    "taxa fba amazon",
    "lucro amazon fba",
    "calculadora de lucro amazon",
    "custos fulfillment amazon",
    "roi amazon fba",
    "fba brasil",
    "vender na amazon brasil",
    "calculadora marketplace",
    "ecommerce tools",
  ],
  openGraph: {
    title: "Calculadora FBA Amazon Grátis — Custos, Lucro e ROI",
    description:
      "Estime custos FBA, comissão por categoria e lucro líquido para vendas na Amazon Brasil. Grátis e online.",
    type: "website",
    url: "https://www.ecommercetools.online/calculators/amazon_fba",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Calculadora FBA Amazon Grátis",
    description:
      "Calcule custos FBA, comissão Amazon e lucro líquido. Grátis e online.",
  },
  alternates: {
    canonical:
      "https://www.ecommercetools.online/calculators/amazon_fba",
  },
};

export default function AmazonFbaPage() {
  return (
    <PageWrapper>
      <Container size="lg">
        <AmazonFbaCalculator />
      </Container>
    </PageWrapper>
  );
}
