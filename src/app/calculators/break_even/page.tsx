import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { BreakEvenCalculator } from "./BreakEvenCalculator";

export const metadata: Metadata = {
  title:
    "Calculadora de Ponto de Equilíbrio (Break Even) Grátis — E-commerce",
  description:
    "Calcule o ponto de equilíbrio do seu e-commerce gratuitamente. Descubra quantas unidades você precisa vender para cobrir todos os custos fixos e variáveis e comece a lucrar. Ferramenta online para lojistas.",
  keywords: [
    "calculadora ponto de equilíbrio",
    "break even calculator",
    "ponto de equilíbrio ecommerce",
    "calcular break even",
    "ponto de equilíbrio e-commerce",
    "calculadora break even grátis",
    "margem de contribuição",
    "quantas unidades preciso vender",
    "ponto de equilíbrio loja virtual",
    "break even point",
    "calculadora de viabilidade",
    "custos fixos e variáveis ecommerce",
    "ecommerce tools",
  ],
  openGraph: {
    title: "Calculadora de Ponto de Equilíbrio (Break Even) Grátis",
    description:
      "Descubra quantas unidades precisa vender para cobrir seus custos. Calculadora de break even gratuita para e-commerce.",
    type: "website",
    url: "https://www.ecommercetools.online/calculators/break_even",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de Ponto de Equilíbrio (Break Even) Grátis",
    description:
      "Calcule quantas unidades você precisa vender para atingir o break even no e-commerce.",
  },
  alternates: {
    canonical:
      "https://www.ecommercetools.online/calculators/break_even",
  },
};

export default function BreakEvenPage() {
  return (
    <PageWrapper>
      <Container size="lg">
        <BreakEvenCalculator />
      </Container>
    </PageWrapper>
  );
}
