import { PageWrapper } from "@/components/default_page_wrapper";
import { Container } from "@mantine/core";
import { TrendsDisplay } from "./TrendsDisplay";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tendências do Mercado Livre",
  description: "Visualize as tendências de busca mais populares no Mercado Livre.",
  keywords: ["trends", "mercado livre", "tendências", "busca"],
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
