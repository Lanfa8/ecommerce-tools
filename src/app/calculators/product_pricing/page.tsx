import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { ProductPricingCalculator } from "./ProductPricingCalculator";

export const metadata: Metadata = {
  title:
    "Calculadora de Precificação de Produtos Grátis — Calcule o Preço de Venda Ideal",
  description:
    "Calcule o preço de venda ideal para seus produtos considerando custo, margem de lucro, taxas do marketplace e impostos. Ferramenta gratuita e online para precificação de e-commerce.",
  keywords: [
    "calculadora de precificação",
    "product pricing calculator",
    "calcular preço de venda",
    "precificação de produtos",
    "calculadora de preço ecommerce",
    "markup calculator",
    "calculadora de margem de lucro",
    "preço de venda ideal",
    "precificação marketplace",
    "calcular preço mercado livre",
    "calcular preço shopee",
    "formação de preço de venda",
    "precificação para e-commerce",
    "calculadora markup",
    "ecommerce tools",
  ],
  openGraph: {
    title: "Calculadora de Precificação de Produtos Grátis",
    description:
      "Calcule o preço de venda ideal considerando custo, margem, taxas e impostos. Grátis e online.",
    type: "website",
    url: "https://www.ecommercetools.online/calculators/product_pricing",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de Precificação de Produtos Grátis",
    description:
      "Calcule o preço de venda ideal para seus produtos. Grátis e online.",
  },
  alternates: {
    canonical:
      "https://www.ecommercetools.online/calculators/product_pricing",
  },
};

export default function ProductPricingPage() {
  return (
    <PageWrapper>
      <Container size="lg">
        <ProductPricingCalculator />
      </Container>
    </PageWrapper>
  );
}
