import { PageWrapper } from "@/components/default_page_wrapper";
import { Container } from "@mantine/core";
import { TrendsDisplay } from "./TrendsDisplay";
import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Tendências do Mercado Livre — Produtos Mais Buscados Hoje",
  description: "Descubra as tendências de busca mais populares do Mercado Livre em tempo real. Veja os produtos e termos mais procurados e encontre oportunidades de vendas para seu e-commerce. Atualizado diariamente.",
  keywords: [
    "tendências mercado livre",
    "trends mercado livre",
    "produtos mais buscados mercado livre",
    "mais vendidos mercado livre",
    "o que vender no mercado livre",
    "tendências de busca mercado livre",
    "mercado livre trends",
    "palavras mais buscadas mercado livre",
    "oportunidades mercado livre",
    "pesquisas populares mercado livre",
    "produtos em alta mercado livre",
    "o que está vendendo no mercado livre",
    "ecommerce tools",
    "nicho mercado livre",
  ],
  openGraph: {
    title: "Tendências do Mercado Livre — Produtos Mais Buscados Hoje",
    description: "Veja os termos mais buscados no Mercado Livre em tempo real e encontre oportunidades de vendas.",
    type: "website",
    url: "https://www.ecommercetools.online/trends/mercadolivre",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Tendências do Mercado Livre Hoje",
    description: "Descubra os produtos e termos mais buscados no Mercado Livre em tempo real.",
  },
  alternates: {
    canonical: "https://www.ecommercetools.online/trends/mercadolivre",
  },
};

const faqItems = [
  {
    question: "De onde vêm os dados de tendências do Mercado Livre?",
    answer: "Os dados são obtidos diretamente da API oficial do Mercado Livre, que disponibiliza os termos e categorias mais buscados na plataforma. As informações são atualizadas regularmente para refletir as tendências mais recentes do marketplace.",
  },
  {
    question: "Com que frequência as tendências são atualizadas?",
    answer: "As tendências são atualizadas diariamente, acompanhando as mudanças nas buscas dos consumidores no Mercado Livre. Isso permite que vendedores identifiquem rapidamente oportunidades emergentes e ajustem seus catálogos.",
  },
  {
    question: "Como posso usar as tendências para melhorar minhas vendas?",
    answer: "Use as tendências para identificar produtos em alta e ajustar seus títulos e descrições para incluir os termos mais buscados. Acompanhar as tendências ajuda a antecipar demandas, escolher nichos lucrativos e otimizar seus anúncios para aparecer nas buscas mais populares.",
  },
  {
    question: "As tendências são específicas para o Brasil?",
    answer: "Sim. Os dados exibidos são das tendências de busca do Mercado Livre Brasil (MLB), refletindo o comportamento de compra dos consumidores brasileiros. Isso garante que as informações sejam relevantes para vendedores que atuam no mercado nacional.",
  },
];

export default function TrendsPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Tendências do Mercado Livre",
            description: "Descubra os produtos e termos mais buscados no Mercado Livre em tempo real. Atualizado diariamente.",
            url: "https://www.ecommercetools.online/trends/mercadolivre",
            applicationCategory: "BusinessApplication",
          },
        ]}
      />
      <Container fluid>
        <TrendsDisplay />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
