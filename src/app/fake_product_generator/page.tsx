import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { FakeProductGenerator } from "./FakeProductGenerator";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

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

const faqItems = [
  {
    question: "Para que serve o gerador de produtos fake?",
    answer: "O gerador cria dados fictícios realistas de produtos para testes de sistemas de e-commerce, ERPs, marketplaces e aplicações web. Desenvolvedores e QAs usam para popular ambientes de teste, prototipar interfaces e validar integrações sem precisar de dados reais.",
  },
  {
    question: "Quais dados são gerados para cada produto?",
    answer: "Cada produto fictício inclui: título realista, descrição detalhada, preço, preço promocional, SKU, código EAN/GTIN, categoria, marca, atributos (cor, tamanho, material), peso, dimensões e URLs de imagens. Todos os dados são gerados de forma coerente e realista.",
  },
  {
    question: "Os dados gerados podem ser exportados?",
    answer: "Sim. Você pode copiar os dados gerados em formato JSON, pronto para importar em sistemas, APIs e bancos de dados. O formato JSON é compatível com a maioria dos ERPs, plataformas de e-commerce e ferramentas de desenvolvimento.",
  },
  {
    question: "É necessário cadastro para usar o gerador?",
    answer: "Não. O gerador de produtos fake é 100% gratuito, funciona online no navegador e não requer cadastro, login ou instalação. Os dados são gerados instantaneamente no seu dispositivo.",
  },
];

export default function FakeProductGeneratorPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Gerador de Produtos Fake para Testes",
            description: "Gere produtos fictícios completos com dados realistas para testes de e-commerce. Grátis e online.",
            url: "https://www.ecommercetools.online/fake_product_generator",
            applicationCategory: "DeveloperApplication",
          },
        ]}
      />
      <Container size="lg">
        <FakeProductGenerator />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
