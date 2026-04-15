import { Container } from "@mantine/core";
import { CharacterCounter } from "./CharacterCounter";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Contador de Caracteres Online Grátis — Conte Letras, Palavras e Espaços",
  description: "Ferramenta gratuita para contar caracteres, letras, palavras e espaços de um texto online. Ideal para otimizar títulos de anúncios, meta descriptions, posts em redes sociais e listagens de e-commerce no Mercado Livre, Shopee e Amazon.",
  keywords: [
    "contador de caracteres",
    "contador de caracteres online",
    "contar caracteres",
    "contar letras",
    "contar palavras",
    "character counter",
    "contador de texto",
    "limite de caracteres",
    "contador de caracteres grátis",
    "contar caracteres mercado livre",
    "contar caracteres título anúncio",
    "contador de caracteres SEO",
    "meta description caracteres",
    "ecommerce tools",
  ],
  openGraph: {
    title: "Contador de Caracteres Online Grátis",
    description: "Conte caracteres, letras e palavras do seu texto. Ideal para anúncios, SEO, redes sociais e e-commerce.",
    type: "website",
    url: "https://www.ecommercetools.online/character_counter",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Contador de Caracteres Online Grátis",
    description: "Conte caracteres, letras e palavras do seu texto online e grátis.",
  },
  alternates: {
    canonical: "https://www.ecommercetools.online/character_counter",
  },
};

const faqItems = [
  {
    question: "O que o contador de caracteres contabiliza?",
    answer: "O contador exibe em tempo real a quantidade de caracteres (com e sem espaços), número de palavras, número de linhas e parágrafos do texto inserido. Isso é essencial para otimizar títulos de produtos em marketplaces que possuem limite de caracteres.",
  },
  {
    question: "Qual o limite de caracteres para títulos no Mercado Livre?",
    answer: "O Mercado Livre permite até 60 caracteres no título do anúncio. Use nosso contador para garantir que seu título não ultrapasse esse limite e aproveite ao máximo os caracteres disponíveis com palavras-chave relevantes.",
  },
  {
    question: "Posso usar o contador para otimizar meta descriptions SEO?",
    answer: "Sim. Meta descriptions ideais têm entre 150 e 160 caracteres. Com nosso contador, você pode escrever e ajustar suas meta descriptions para ficarem no tamanho ideal, maximizando a taxa de clique nos resultados do Google.",
  },
  {
    question: "A ferramenta conta caracteres especiais e emojis?",
    answer: "Sim. O contador reconhece todos os tipos de caracteres, incluindo acentos, caracteres especiais, emojis e caracteres de outros idiomas. Cada caractere é contado individualmente, exatamente como os marketplaces e plataformas fazem.",
  },
  {
    question: "Preciso de cadastro para usar o contador?",
    answer: "Não. O contador de caracteres é totalmente gratuito, funciona online diretamente no navegador e não requer nenhum tipo de cadastro, login ou instalação.",
  },
];

export default function CharacterCounterPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Contador de Caracteres Online",
            description: "Conte caracteres, letras, palavras e espaços do seu texto. Ideal para anúncios e SEO.",
            url: "https://www.ecommercetools.online/character_counter",
            applicationCategory: "UtilitiesApplication",
          },
        ]}
      />
      <Container fluid>
        <CharacterCounter />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
