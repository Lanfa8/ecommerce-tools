import { PageWrapper } from "@/components/default_page_wrapper";
import { Container } from "@mantine/core";
import { TrendsDisplay } from "./TrendsDisplay";
import type { Metadata } from "next";

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

export default function TrendsPage() {
  return (
    <PageWrapper>
      <Container fluid>
        <TrendsDisplay />
      </Container>
    </PageWrapper>
  );
}
