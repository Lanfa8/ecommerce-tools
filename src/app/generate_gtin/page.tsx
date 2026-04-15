import { Container } from "@mantine/core"
import { GtinGeneration } from "./GtinGeneration";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Gerador de EAN/GTIN-13 Válido Online Grátis — Para Testes de E-commerce",
  description: "Gere códigos de barras EAN-13 e GTIN válidos gratuitamente para testar seu e-commerce, ERP, marketplace ou sistema de logística. Ferramenta online com geração instantânea de códigos válidos com dígito verificador correto.",
  keywords: [
    "gerador ean",
    "gerador gtin",
    "gerador ean-13",
    "gerador gtin-13",
    "gerar ean válido",
    "gerar gtin válido",
    "código de barras teste",
    "ean para teste",
    "gtin para teste",
    "gerador código de barras",
    "ean-13 generator",
    "gtin generator",
    "código ean grátis",
    "dígito verificador ean",
    "ecommerce tools",
    "código de barras e-commerce",
    "testar ean mercado livre",
    "gerar código ean online",
  ],
  openGraph: {
    title: "Gerador de EAN/GTIN-13 Válido Online Grátis",
    description: "Gere códigos EAN-13 e GTIN válidos instantâneamente para testar e-commerce, ERP e sistemas de logística.",
    type: "website",
    url: "https://www.ecommercetools.online/generate_gtin",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Gerador de EAN/GTIN-13 Válido Online Grátis",
    description: "Gere códigos EAN-13 e GTIN válidos para testes de e-commerce gratuitamente.",
  },
  alternates: {
    canonical: "https://www.ecommercetools.online/generate_gtin",
  },
};

const faqItems = [
  {
    question: "O que é um código EAN/GTIN-13?",
    answer: "EAN-13 (European Article Number) é um padrão internacional de código de barras com 13 dígitos, usado para identificar produtos no varejo e e-commerce. O GTIN-13 (Global Trade Item Number) é o mesmo formato, mas sob a nomenclatura da GS1. Ele é obrigatório para cadastrar produtos em marketplaces como Mercado Livre, Amazon e Shopee.",
  },
  {
    question: "Os códigos gerados podem ser usados em produtos reais?",
    answer: "Não. Os códigos gerados por esta ferramenta são válidos em termos de estrutura e dígito verificador, mas são destinados exclusivamente para testes de sistemas, ERPs, marketplaces e aplicações de e-commerce. Para uso comercial real, você deve adquirir códigos oficiais através da GS1 Brasil.",
  },
  {
    question: "O dígito verificador é calculado corretamente?",
    answer: "Sim. Nosso gerador calcula o dígito verificador seguindo o algoritmo oficial da GS1, que usa um cálculo de módulo 10 baseado nos 12 primeiros dígitos. Isso garante que o código gerado seja aceito por leitores de código de barras e sistemas de validação EAN.",
  },
  {
    question: "Posso gerar múltiplos códigos EAN de uma vez?",
    answer: "Sim. A ferramenta permite gerar vários códigos EAN/GTIN-13 simultaneamente, cada um com dígito verificador válido. Isso é ideal para popular bases de dados de teste, testar importações em massa em ERPs ou simular catálogos de produtos.",
  },
  {
    question: "É necessário cadastro para usar o gerador?",
    answer: "Não. O gerador de EAN/GTIN-13 é 100% gratuito, online e não requer nenhum tipo de cadastro, login ou instalação. Basta acessar a página e gerar seus códigos instantaneamente.",
  },
];

export default function GenerateGtinPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Gerador de EAN/GTIN-13 Válido Online",
            description: "Gere códigos de barras EAN-13 e GTIN válidos gratuitamente para testar seu e-commerce, ERP, marketplace ou sistema de logística.",
            url: "https://www.ecommercetools.online/generate_gtin",
            applicationCategory: "UtilitiesApplication",
          },
        ]}
      />
      <Container fluid>
        <GtinGeneration />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
