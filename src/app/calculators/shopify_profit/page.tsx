import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { ShopifyProfitCalculator } from "./ShopifyProfitCalculator";

export const metadata: Metadata = {
  title:
    "Calculadora de Lucro Shopify Grátis — Calcule Margem e Lucro Líquido",
  description:
    "Calcule o lucro líquido e a margem de lucro das suas vendas na Shopify gratuitamente. Considere taxas da plataforma, custo do produto, envio e impostos. Ferramenta online para lojistas Shopify.",
  keywords: [
    "calculadora lucro shopify",
    "shopify profit calculator",
    "calcular lucro shopify",
    "margem de lucro shopify",
    "taxas shopify brasil",
    "calculadora shopify grátis",
    "lucro líquido shopify",
    "custos shopify",
    "calculadora de margem ecommerce",
    "calcular margem de lucro",
    "shopify brasil",
    "lucro por produto shopify",
    "ecommerce tools",
  ],
  openGraph: {
    title: "Calculadora de Lucro Shopify Grátis",
    description:
      "Calcule o lucro líquido e a margem de lucro na Shopify. Considere todas as taxas, custos e impostos.",
    type: "website",
    url: "https://www.ecommercetools.online/calculators/shopify_profit",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de Lucro Shopify Grátis",
    description:
      "Calcule o lucro líquido por produto na Shopify. Grátis e online.",
  },
  alternates: {
    canonical:
      "https://www.ecommercetools.online/calculators/shopify_profit",
  },
};

export default function ShopifyProfitPage() {
  return (
    <PageWrapper>
      <Container size="lg">
        <ShopifyProfitCalculator />
      </Container>
    </PageWrapper>
  );
}
