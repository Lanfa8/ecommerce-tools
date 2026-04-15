import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { BreakEvenCalculator } from "./BreakEvenCalculator";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

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

const faqItems = [
  {
    question: "O que é ponto de equilíbrio (break even)?",
    answer: "O ponto de equilíbrio é o momento em que a receita total do seu negócio iguala todos os custos (fixos e variáveis). A partir desse ponto, cada venda adicional gera lucro real. Saber seu break even é fundamental para entender a viabilidade financeira do seu e-commerce.",
  },
  {
    question: "Qual a diferença entre custos fixos e variáveis?",
    answer: "Custos fixos são aqueles que não mudam independente da quantidade vendida, como aluguel, mensalidade da plataforma, salários e ferramentas. Custos variáveis mudam conforme o volume de vendas, como custo do produto, frete, comissão do marketplace e embalagem.",
  },
  {
    question: "O que é margem de contribuição?",
    answer: "Margem de contribuição é a diferença entre o preço de venda e os custos variáveis por unidade. Por exemplo, se você vende um produto por R$ 100 e os custos variáveis são R$ 60, a margem de contribuição é R$ 40. Esse valor é o que 'contribui' para cobrir os custos fixos e gerar lucro.",
  },
  {
    question: "Como interpretar o resultado do break even?",
    answer: "O resultado mostra quantas unidades você precisa vender por mês para cobrir todos os custos. Se o break even for 100 unidades e você vende 150, as 50 unidades excedentes são lucro puro. Se vende menos de 100, está operando no prejuízo.",
  },
  {
    question: "Como posso diminuir meu ponto de equilíbrio?",
    answer: "Existem três estratégias principais: aumentar o preço de venda (se o mercado permitir), reduzir custos variáveis (negociar melhor com fornecedores, otimizar logística) ou reduzir custos fixos (trocar ferramentas por alternativas mais baratas, renegociar contratos). A calculadora permite simular diferentes cenários.",
  },
];

export default function BreakEvenPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Calculadora de Ponto de Equilíbrio (Break Even)",
            description: "Calcule o ponto de equilíbrio do seu e-commerce. Descubra quantas unidades precisa vender para cobrir custos.",
            url: "https://www.ecommercetools.online/calculators/break_even",
            applicationCategory: "BusinessApplication",
          },
        ]}
      />
      <Container size="lg">
        <BreakEvenCalculator />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
