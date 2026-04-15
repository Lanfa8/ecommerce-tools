import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { BarcodeGenerator } from "./BarcodeGenerator";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

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

const faqItems = [
  {
    question: "Quais formatos de código de barras são suportados?",
    answer: "Nossa ferramenta suporta os principais formatos: EAN-13, EAN-8, UPC-A, UPC-E, CODE 128, CODE 39, ITF-14, MSI, Pharmacode e Codabar. Cada formato atende a necessidades específicas — EAN-13 é o padrão para produtos no varejo brasileiro, CODE 128 é usado em logística, e ITF-14 em embalagens de transporte.",
  },
  {
    question: "Posso personalizar a aparência do código de barras?",
    answer: "Sim. Você pode personalizar a cor das barras, a cor de fundo, a largura e altura do código, a margem, e se deseja exibir o texto do número abaixo do código. Todas as personalizações são refletidas em tempo real na pré-visualização.",
  },
  {
    question: "Em que formato posso baixar o código de barras?",
    answer: "Os códigos de barras são gerados e podem ser baixados em formato PNG de alta qualidade, pronto para uso em etiquetas, embalagens, listagens de produtos em marketplaces e materiais impressos.",
  },
  {
    question: "Os códigos de barras gerados são válidos para uso comercial?",
    answer: "Os códigos de barras são gerados com a estrutura e dígito verificador corretos. No entanto, para uso comercial, o número do código deve ser um EAN/GTIN registrado na GS1. Esta ferramenta é ideal para testes, protótipos e geração visual de barras a partir de números que você já possui.",
  },
  {
    question: "Preciso instalar algum software para gerar códigos de barras?",
    answer: "Não. A ferramenta funciona inteiramente no navegador. Não é necessário instalar nenhum software, plugin ou extensão. Basta acessar a página, inserir o número desejado, personalizar e baixar o código de barras gratuitamente.",
  },
];

export default function BarcodeGeneratorPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Gerador de Código de Barras Online",
            description: "Crie códigos de barras personalizados nos formatos EAN-13, CODE 128, UPC e mais. Grátis e online.",
            url: "https://www.ecommercetools.online/barcode_generator",
            applicationCategory: "UtilitiesApplication",
          },
        ]}
      />
      <Container fluid>
        <BarcodeGenerator />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
