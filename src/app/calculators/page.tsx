import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { CalculatorsHub } from "./CalculatorsHub";

export const metadata: Metadata = {
  title:
    "Calculadoras para E-commerce Grátis — Lucro, Precificação, FBA e Break Even",
  description:
    "Calculadoras gratuitas para e-commerce: calcule o lucro no Shopify, custos FBA Amazon, ponto de equilíbrio e preço de venda ideal. Ferramentas online e sem cadastro para lojistas e vendedores.",
  keywords: [
    "calculadora ecommerce",
    "calculadora lucro shopify",
    "calculadora fba amazon",
    "calculadora ponto de equilíbrio",
    "calculadora precificação",
    "calculadora de lucro e-commerce",
    "calcular margem de lucro",
    "calculadora de preço de venda",
    "break even ecommerce",
    "calculadora de custos ecommerce",
    "ferramentas ecommerce grátis",
    "ecommerce tools",
  ],
  openGraph: {
    title: "Calculadoras para E-commerce Grátis",
    description:
      "Calcule lucro Shopify, custos FBA Amazon, ponto de equilíbrio e preço de venda ideal. Tudo gratuito e online.",
    type: "website",
    url: "https://www.ecommercetools.online/calculators",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Calculadoras para E-commerce Grátis",
    description:
      "Calcule lucro Shopify, custos FBA Amazon, ponto de equilíbrio e preço ideal.",
  },
  alternates: {
    canonical: "https://www.ecommercetools.online/calculators",
  },
};

export default function CalculatorsPage() {
  return (
    <PageWrapper>
      <Container size="lg">
        <CalculatorsHub />
      </Container>
    </PageWrapper>
  );
}
