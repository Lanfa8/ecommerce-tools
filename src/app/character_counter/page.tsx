import { Container } from "@mantine/core";
import { CharacterCounter } from "./CharacterCounter";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";

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

export default function CharacterCounterPage() {
  return (
    <PageWrapper>
      <Container fluid>
        <CharacterCounter />
      </Container>
    </PageWrapper>
  );
}
