import { PageWrapper } from "@/components/default_page_wrapper";
import { Container, Title, Text, Stack, Space } from "@mantine/core";
import { ComexstatDisplay } from "./ComexstatDisplay";
import type { Metadata } from "next";

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

export default function ComexstatPage() {
  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}
