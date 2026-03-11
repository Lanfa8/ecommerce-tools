import { Container } from "@mantine/core"
import { GtinGeneration } from "./GtinGeneration";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";

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

export default function GenerateGtinPage() {
    return (
        <PageWrapper>
            <GtinGenerationComponent />
        </PageWrapper>
    )
}

function GtinGenerationComponent() {
    return <>
        <Container fluid>            
            <GtinGeneration />
        </Container>
    </>
}
