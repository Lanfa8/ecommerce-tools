import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { ShopifyProfitCalculator } from "./ShopifyProfitCalculator";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

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

const faqItems = [
  {
    question: "Quais taxas da Shopify são consideradas no cálculo?",
    answer: "A calculadora considera a taxa de transação da Shopify (que varia conforme o plano: Basic, Shopify ou Advanced), a taxa do gateway de pagamento (processamento de cartão de crédito) e a mensalidade do plano. Você pode ajustar todos os percentuais conforme seu plano atual.",
  },
  {
    question: "Como é calculado o lucro líquido?",
    answer: "O lucro líquido é calculado subtraindo do preço de venda: o custo do produto, custo de frete/envio, taxas da Shopify (transação + gateway), impostos e quaisquer outros custos variáveis que você informar. O resultado mostra exatamente quanto sobra de lucro por unidade vendida.",
  },
  {
    question: "A calculadora funciona para Shopify Brasil?",
    answer: "Sim. A calculadora foi projetada considerando o cenário brasileiro, com campos para impostos nacionais (como ICMS, PIS, COFINS) e custos de frete doméstico. Os valores são em Reais (BRL) e as taxas podem ser ajustadas para o plano Shopify Brasil.",
  },
  {
    question: "Posso calcular o lucro para diferentes produtos de uma vez?",
    answer: "A calculadora é projetada para calcular um produto por vez, permitindo que você ajuste os parâmetros específicos de cada item. Para análise de catálogo completo, recomendamos calcular os produtos principais e usar os resultados como base para precificação.",
  },
  {
    question: "O que é margem de lucro e como interpretar?",
    answer: "A margem de lucro é o percentual do preço de venda que sobra como lucro após todos os custos. Por exemplo, uma margem de 30% significa que a cada R$ 100 vendidos, R$ 30 são lucro. Margens saudáveis no e-commerce brasileiro geralmente ficam entre 15% e 40%, dependendo do nicho.",
  },
];

export default function ShopifyProfitPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Calculadora de Lucro Shopify",
            description: "Calcule o lucro líquido e a margem de lucro das suas vendas na Shopify. Grátis e online.",
            url: "https://www.ecommercetools.online/calculators/shopify_profit",
            applicationCategory: "BusinessApplication",
          },
        ]}
      />
      <Container size="lg">
        <ShopifyProfitCalculator />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
