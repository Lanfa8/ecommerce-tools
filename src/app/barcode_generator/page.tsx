import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { BarcodeGenerator } from "./BarcodeGenerator";

export const metadata: Metadata = {
  title: "Gerador de Código de Barras Online Grátis — EAN-13, CODE 128, UPC e mais",
  description:
    "Crie códigos de barras personalizados online e grátis. Suporte a EAN-13, EAN-8, UPC, CODE 128, CODE 39, ITF-14 e outros formatos. Personalize cores, tamanho e baixe em PNG de alta qualidade. Ideal para e-commerce, logística e varejo.",
  keywords: [
    "gerador de código de barras",
    "barcode generator",
    "gerar código de barras online",
    "código de barras grátis",
    "gerador de código de barras online",
    "código de barras EAN-13",
    "código de barras EAN-8",
    "código de barras UPC",
    "código de barras CODE 128",
    "código de barras CODE 39",
    "código de barras ITF-14",
    "criar código de barras",
    "código de barras personalizado",
    "código de barras PNG",
    "código de barras para produtos",
    "código de barras e-commerce",
    "ecommerce tools",
    "barcode generator free",
    "gerador de barcode",
  ],
  openGraph: {
    title: "Gerador de Código de Barras Online Grátis — EAN-13, CODE 128, UPC",
    description:
      "Ferramenta gratuita para gerar códigos de barras nos formatos EAN-13, EAN-8, UPC, CODE 128, CODE 39, ITF-14 e mais. Personalize cores, tamanho e baixe em PNG.",
    type: "website",
    url: "https://www.ecommercetools.online/barcode_generator",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de Código de Barras Online Grátis",
    description:
      "Crie códigos de barras EAN-13, UPC, CODE 128 e mais. Personalize e baixe em PNG gratuitamente.",
  },
  alternates: {
    canonical: "https://www.ecommercetools.online/barcode_generator",
  },
};

export default function BarcodeGeneratorPage() {
  return (
    <PageWrapper>
      <Container fluid>
        <BarcodeGenerator />
      </Container>
    </PageWrapper>
  );
}
