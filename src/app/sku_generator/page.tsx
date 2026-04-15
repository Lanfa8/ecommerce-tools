import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { SkuGenerator } from "./SkuGenerator";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Gerador de SKU Online Grátis — Crie Códigos SKU para Produtos",
  description:
    "Gere códigos SKU padronizados para seus produtos gratuitamente. Adicione nome, atributos como cor e tamanho, e escolha sufixos aleatórios ou sequenciais. Ideal para e-commerce, estoque e logística.",
  keywords: [
    "gerador de sku",
    "sku generator",
    "gerar sku online",
    "sku grátis",
    "gerador de sku online",
    "código sku",
    "sku para produtos",
    "sku e-commerce",
    "criar sku",
    "sku personalizado",
    "gerador de código sku",
    "sku mercado livre",
    "sku shopee",
    "ecommerce tools",
    "sku para estoque",
    "sku sequencial",
    "sku aleatório",
  ],
  openGraph: {
    title: "Gerador de SKU Online Grátis — Crie Códigos SKU para Produtos",
    description:
      "Ferramenta gratuita para gerar códigos SKU padronizados. Adicione atributos, escolha sufixos aleatórios ou sequenciais e exporte em CSV.",
    type: "website",
    url: "https://www.ecommercetools.online/sku_generator",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de SKU Online Grátis",
    description:
      "Crie códigos SKU padronizados para seus produtos. Sufixos aleatórios ou sequenciais, exportação CSV.",
  },
  alternates: {
    canonical: "https://www.ecommercetools.online/sku_generator",
  },
};

const faqItems = [
  {
    question: "O que é SKU e por que é importante?",
    answer: "SKU (Stock Keeping Unit) é um código único usado para identificar e rastrear cada produto no seu estoque. É essencial para gestão de inventário, controle de vendas e organização de catálogos em e-commerce. Marketplaces como Mercado Livre, Shopee e Amazon usam SKU para gerenciar variações de produtos.",
  },
  {
    question: "Como o gerador cria os códigos SKU?",
    answer: "O gerador combina automaticamente o nome do produto com atributos como cor, tamanho e material, gerando abreviações padronizadas. Você pode escolher entre sufixos aleatórios (para garantir unicidade) ou sequenciais (para organização lógica). O resultado é um SKU limpo, fácil de ler e padronizado.",
  },
  {
    question: "Posso exportar os SKUs gerados?",
    answer: "Sim. Você pode copiar os SKUs diretamente ou exportá-los em formato CSV, pronto para importar em ERPs, planilhas de estoque, marketplaces e sistemas de gestão. Isso facilita o cadastro em massa de produtos.",
  },
  {
    question: "Os SKUs gerados seguem algum padrão?",
    answer: "Os SKUs são gerados seguindo boas práticas de nomenclatura: sem espaços, em letras maiúsculas, com separadores claros e legíveis. Eles combinam informações do produto (nome e atributos) com um identificador único, facilitando a busca e organização no estoque.",
  },
  {
    question: "Posso adicionar atributos personalizados ao SKU?",
    answer: "Sim. Além de atributos comuns como cor e tamanho, você pode adicionar atributos personalizados (como material, voltagem, sabor etc.) para criar SKUs que reflitam exatamente as variações dos seus produtos.",
  },
];

export default function SkuGeneratorPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Gerador de SKU Online",
            description: "Gere códigos SKU padronizados para seus produtos gratuitamente. Ideal para e-commerce e controle de estoque.",
            url: "https://www.ecommercetools.online/sku_generator",
            applicationCategory: "BusinessApplication",
          },
        ]}
      />
      <Container size="lg">
        <SkuGenerator />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
