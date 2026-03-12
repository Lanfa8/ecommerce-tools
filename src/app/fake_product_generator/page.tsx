import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { FakeProductGenerator } from "./FakeProductGenerator";

export const metadata: Metadata = {
  title:
    "Gerador de Produtos Fake Online Grátis — Dados Fictícios para Testes de E-commerce",
  description:
    "Gere produtos fictícios completos para testes de e-commerce. Títulos, descrições, preços, atributos, SKU, EAN, imagens e mais — tudo gerado automaticamente com dados realistas. Ideal para desenvolvedores, QA e prototipagem.",
  keywords: [
    "gerador de produtos fake",
    "fake product generator",
    "produtos fictícios para teste",
    "dados de teste e-commerce",
    "mock products",
    "gerar produtos teste",
    "produtos fake para testes",
    "produto fictício",
    "gerador de dados fake",
    "faker produtos",
    "mock data e-commerce",
    "teste de marketplace",
    "dados fictícios para loja",
    "produto de teste",
    "prototipagem e-commerce",
    "ecommerce tools",
    "gerador de produtos para teste",
    "fake data generator",
  ],
  openGraph: {
    title:
      "Gerador de Produtos Fake Online Grátis — Dados Fictícios para Testes",
    description:
      "Ferramenta gratuita para gerar produtos fictícios completos com títulos, descrições, preços, atributos, imagens e mais. Ideal para testes de e-commerce.",
    type: "website",
    url: "https://www.ecommercetools.online/fake_product_generator",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de Produtos Fake Online Grátis",
    description:
      "Gere produtos fictícios completos para testes de e-commerce. Títulos, descrições, preços, atributos e imagens.",
  },
  alternates: {
    canonical: "https://www.ecommercetools.online/fake_product_generator",
  },
};

export default function FakeProductGeneratorPage() {
  return (
    <PageWrapper>
      <Container size="lg">
        <FakeProductGenerator />
      </Container>
    </PageWrapper>
  );
}
