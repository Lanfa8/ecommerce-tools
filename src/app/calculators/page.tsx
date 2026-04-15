import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { CalculatorsHub } from "./CalculatorsHub";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

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

const faqItems = [
  {
    question: "Quais calculadoras estão disponíveis?",
    answer: "Oferecemos quatro calculadoras especializadas para e-commerce: Calculadora de Lucro Shopify (para calcular margens e lucro líquido), Calculadora FBA Amazon (para estimar custos de fulfillment e comissões), Calculadora de Ponto de Equilíbrio/Break Even (para saber quantas unidades vender para cobrir custos) e Calculadora de Precificação (para encontrar o preço de venda ideal).",
  },
  {
    question: "As calculadoras consideram impostos brasileiros?",
    answer: "Sim. As calculadoras foram projetadas considerando o cenário fiscal brasileiro, incluindo taxas de marketplaces nacionais, custos de frete e impostos comuns no e-commerce brasileiro. Você pode ajustar os percentuais conforme seu regime tributário.",
  },
  {
    question: "Preciso de cadastro para usar as calculadoras?",
    answer: "Não. Todas as calculadoras são 100% gratuitas, funcionam online no navegador e não requerem nenhum tipo de cadastro, login ou instalação. Os cálculos são feitos instantaneamente no seu dispositivo.",
  },
  {
    question: "Os resultados são confiáveis para tomada de decisão?",
    answer: "As calculadoras fornecem estimativas baseadas nos dados que você insere. Elas são excelentes para ter uma visão geral da rentabilidade dos seus produtos e tomar decisões informadas. Para decisões financeiras críticas, recomendamos consultar também um contador ou consultor financeiro.",
  },
];

export default function CalculatorsPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Calculadoras para E-commerce",
            description: "Calculadoras gratuitas para e-commerce: lucro Shopify, custos FBA Amazon, ponto de equilíbrio e precificação.",
            url: "https://www.ecommercetools.online/calculators",
            applicationCategory: "BusinessApplication",
          },
        ]}
      />
      <Container size="lg">
        <CalculatorsHub />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
