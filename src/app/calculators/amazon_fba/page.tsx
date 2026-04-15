import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { AmazonFbaCalculator } from "./AmazonFbaCalculator";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title:
    "Calculadora FBA Amazon Grátis — Calcule Custos, Lucro e ROI",
  description:
    "Calcule custos de Fulfillment by Amazon (FBA), comissão por categoria, lucro líquido e ROI gratuitamente. Ferramenta online para vendedores Amazon Brasil estimarem a rentabilidade de seus produtos.",
  keywords: [
    "calculadora fba amazon",
    "amazon fba calculator",
    "calcular custos fba",
    "calculadora amazon brasil",
    "comissão amazon por categoria",
    "taxa fba amazon",
    "lucro amazon fba",
    "calculadora de lucro amazon",
    "custos fulfillment amazon",
    "roi amazon fba",
    "fba brasil",
    "vender na amazon brasil",
    "calculadora marketplace",
    "ecommerce tools",
  ],
  openGraph: {
    title: "Calculadora FBA Amazon Grátis — Custos, Lucro e ROI",
    description:
      "Estime custos FBA, comissão por categoria e lucro líquido para vendas na Amazon Brasil. Grátis e online.",
    type: "website",
    url: "https://www.ecommercetools.online/calculators/amazon_fba",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Calculadora FBA Amazon Grátis",
    description:
      "Calcule custos FBA, comissão Amazon e lucro líquido. Grátis e online.",
  },
  alternates: {
    canonical:
      "https://www.ecommercetools.online/calculators/amazon_fba",
  },
};

const faqItems = [
  {
    question: "O que é FBA (Fulfillment by Amazon)?",
    answer: "FBA é o serviço de logística da Amazon onde você envia seus produtos para os centros de distribuição da Amazon, e eles cuidam do armazenamento, embalagem, envio e atendimento ao cliente. Isso permite que seus produtos tenham o selo Prime e entregas mais rápidas, mas envolve custos de fulfillment e armazenamento.",
  },
  {
    question: "Quais custos são considerados no cálculo?",
    answer: "A calculadora considera: custo do produto, taxa de fulfillment FBA (baseada no peso e dimensões), taxa de armazenamento mensal, comissão da Amazon por categoria (que varia de 8% a 15%), custo de frete até o centro de distribuição, e impostos. O resultado mostra o lucro líquido e o ROI por unidade.",
  },
  {
    question: "As comissões por categoria estão atualizadas?",
    answer: "As comissões são baseadas nas tabelas oficiais da Amazon Brasil e são atualizadas periodicamente. As taxas variam por categoria — eletrônicos, moda, livros e outros segmentos têm percentuais diferentes. Recomendamos sempre confirmar na página oficial da Amazon Seller Central.",
  },
  {
    question: "O que é ROI e como interpretar?",
    answer: "ROI (Return on Investment) é o retorno sobre o investimento. Ele mostra quanto lucro você obtém em relação ao capital investido. Um ROI de 50% significa que para cada R$ 100 investidos, você obtém R$ 50 de lucro. No FBA, um ROI acima de 30% é geralmente considerado bom.",
  },
  {
    question: "Vale a pena usar FBA no Brasil?",
    answer: "Depende do seu produto e volume de vendas. O FBA é vantajoso para produtos com boa margem de lucro, alto volume de vendas e que se beneficiam do selo Prime. Use nossa calculadora para simular diferentes cenários e verificar se o FBA é rentável para seus produtos específicos antes de tomar a decisão.",
  },
];

export default function AmazonFbaPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Calculadora FBA Amazon",
            description: "Calcule custos de Fulfillment by Amazon, comissão por categoria, lucro líquido e ROI. Grátis e online.",
            url: "https://www.ecommercetools.online/calculators/amazon_fba",
            applicationCategory: "BusinessApplication",
          },
        ]}
      />
      <Container size="lg">
        <AmazonFbaCalculator />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
