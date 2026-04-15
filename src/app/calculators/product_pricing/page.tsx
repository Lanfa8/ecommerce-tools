import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { ProductPricingCalculator } from "./ProductPricingCalculator";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

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

const faqItems = [
  {
    question: "Como calcular o preço de venda ideal?",
    answer: "O preço de venda ideal deve cobrir todos os custos (produto, frete, embalagem), taxas do marketplace, impostos e ainda garantir a margem de lucro desejada. Nossa calculadora faz esse cálculo automaticamente: você informa o custo e a margem desejada, e ela calcula o preço de venda que garante essa margem.",
  },
  {
    question: "O que é markup e qual a diferença para margem de lucro?",
    answer: "Markup é o percentual adicionado sobre o custo para chegar ao preço de venda. Margem de lucro é o percentual do preço de venda que é lucro. Exemplo: um produto de custo R$ 50 vendido por R$ 100 tem markup de 100% mas margem de lucro de 50%. São conceitos diferentes que nossa calculadora calcula simultaneamente.",
  },
  {
    question: "A calculadora considera as taxas dos marketplaces?",
    answer: "Sim. Você pode informar a taxa/comissão do marketplace onde vende (Mercado Livre, Shopee, Amazon, Magazine Luiza etc.) e a calculadora inclui esse custo no cálculo do preço de venda. Cada marketplace tem comissões diferentes que impactam diretamente na sua margem.",
  },
  {
    question: "Posso incluir custos de frete no cálculo?",
    answer: "Sim. A calculadora tem campos para custo de frete/envio ao cliente e custo de embalagem. Se você oferece frete grátis, é essencial incluir esse custo no preço do produto para não comprometer sua margem de lucro.",
  },
  {
    question: "Como precificar para diferentes marketplaces?",
    answer: "Cada marketplace cobra comissões diferentes (Mercado Livre ~11-16%, Shopee ~12-20%, Amazon ~8-15%). Use a calculadora para simular o preço de venda em cada plataforma, ajustando a taxa de comissão. Isso garante que você mantenha a margem desejada independente de onde vende.",
  },
];

export default function ProductPricingPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Calculadora de Precificação de Produtos",
            description: "Calcule o preço de venda ideal considerando custo, margem de lucro, taxas e impostos. Grátis e online.",
            url: "https://www.ecommercetools.online/calculators/product_pricing",
            applicationCategory: "BusinessApplication",
          },
        ]}
      />
      <Container size="lg">
        <ProductPricingCalculator />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
