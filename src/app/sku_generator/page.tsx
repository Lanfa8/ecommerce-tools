import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { SkuGenerator } from "./SkuGenerator";

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

export default function SkuGeneratorPage() {
  return (
    <PageWrapper>
      <Container size="lg">
        <SkuGenerator />
      </Container>
    </PageWrapper>
  );
}
