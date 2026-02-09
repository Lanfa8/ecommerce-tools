import { PageWrapper } from "@/components/default_page_wrapper";
import { Container, Title, Text, Stack, Space } from "@mantine/core";
import { ComexstatDisplay } from "./ComexstatDisplay";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "COMEXSTAT - Estatísticas de Comércio Exterior",
  description: "Visualize e analise dados de importação e exportação do Brasil através da API COMEXSTAT do MDIC.",
  keywords: ["comexstat", "comércio exterior", "importação", "exportação", "ncm", "brasil", "mdic"],
};

export default function ComexstatPage() {
  return (
    <PageWrapper>
      <Container fluid>
        <Stack gap="md">
          <div>
            <Title order={2}>COMEXSTAT - Estatísticas de Comércio Exterior</Title>
            <Text c="dimmed" mt="xs">
              Consulte dados de importação e exportação do Brasil. Filtre por período, NCM e países de origem/destino.
            </Text>
          </div>
          <Space h="md" />
          <ComexstatDisplay />
        </Stack>
      </Container>
    </PageWrapper>
  );
}
