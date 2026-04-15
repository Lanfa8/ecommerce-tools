import { PageWrapper } from "@/components/default_page_wrapper";
import { Container, Title, Text, Stack, Space } from "@mantine/core";
import { ComexstatDisplay } from "./ComexstatDisplay";
import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "COMEXSTAT — Estatísticas de Comércio Exterior do Brasil (Importação e Exportação)",
  description: "Consulte e analise dados de importação e exportação do Brasil pela API COMEXSTAT do MDIC. Filtre por período, NCM, países de origem/destino. Visualize volumes, valores FOB e tendências do comércio exterior brasileiro.",
  keywords: [
    "comexstat",
    "comércio exterior brasil",
    "importação brasil",
    "exportação brasil",
    "dados importação exportação",
    "ncm",
    "mdic",
    "balança comercial",
    "comex",
    "estatísticas comércio exterior",
    "consulta ncm",
    "exportação por país",
    "importação por produto",
    "valor fob",
    "ecommerce tools",
  ],
  openGraph: {
    title: "COMEXSTAT — Estatísticas de Comércio Exterior do Brasil",
    description: "Visualize dados de importação e exportação do Brasil. Filtre por NCM, período e países.",
    type: "website",
    url: "https://www.ecommercetools.online/comexstat",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "COMEXSTAT — Estatísticas de Comércio Exterior do Brasil",
    description: "Consulte dados de importação e exportação do Brasil pela API COMEXSTAT.",
  },
  alternates: {
    canonical: "https://www.ecommercetools.online/comexstat",
  },
};

const faqItems = [
  {
    question: "O que é o COMEXSTAT?",
    answer: "COMEXSTAT é o sistema oficial de estatísticas de comércio exterior do Brasil, mantido pelo MDIC (Ministério do Desenvolvimento, Indústria, Comércio e Serviços). Ele disponibiliza dados detalhados de importação e exportação do país, incluindo valores FOB, volumes, países de origem/destino e classificação NCM dos produtos.",
  },
  {
    question: "O que é NCM e como usar nos filtros?",
    answer: "NCM (Nomenclatura Comum do Mercosul) é o código de 8 dígitos que classifica todos os produtos comercializados internacionalmente. Você pode usar o código NCM nos filtros para pesquisar dados de importação e exportação de produtos específicos. Por exemplo, NCM 6110.20.00 se refere a pulôveres e suéteres de algodão.",
  },
  {
    question: "Os dados são oficiais e confiáveis?",
    answer: "Sim. Os dados são obtidos diretamente da API oficial do COMEXSTAT/MDIC, que é a fonte oficial de estatísticas de comércio exterior do governo brasileiro. Os dados são os mesmos utilizados em relatórios oficiais e análises de mercado.",
  },
  {
    question: "Para que posso usar esses dados no e-commerce?",
    answer: "Os dados do COMEXSTAT são valiosos para vendedores de e-commerce que desejam entender a dinâmica de importação de produtos que vendem, identificar tendências de mercado, encontrar novos fornecedores internacionais, analisar a concorrência de produtos importados e tomar decisões de precificação baseadas em dados reais de comércio exterior.",
  },
];

export default function ComexstatPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "COMEXSTAT — Estatísticas de Comércio Exterior do Brasil",
            description: "Consulte dados de importação e exportação do Brasil pela API COMEXSTAT do MDIC.",
            url: "https://www.ecommercetools.online/comexstat",
            applicationCategory: "BusinessApplication",
          },
        ]}
      />
      <Container fluid>
        <Stack gap="md">
          <div>
            <Title order={1}>COMEXSTAT — Estatísticas de Comércio Exterior do Brasil</Title>
            <Text c="dimmed" mt="xs">
              Consulte dados oficiais de importação e exportação do Brasil através da API COMEXSTAT do MDIC. 
              Filtre por período, NCM, países de origem/destino e analise volumes, valores FOB e tendências do comércio exterior brasileiro.
            </Text>
          </div>
          <Space h="md" />
          <ComexstatDisplay />
        </Stack>
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
