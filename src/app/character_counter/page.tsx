import { Container } from "@mantine/core";
import { CharacterCounter } from "./CharacterCounter";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contador de Caracteres Online",
  description: "Ferramenta simples e gratuita para contar caracteres de um texto.",
  keywords: ["contador caracteres", "contador letras", "online character count"],
};

export default function CharacterCounterPage() {
  return (
    <PageWrapper>
      <Container fluid>
        <CharacterCounter />
      </Container>
    </PageWrapper>
  );
}
