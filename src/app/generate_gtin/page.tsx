import { Container } from "@mantine/core"
import { GtinGeneration } from "./GtinGeneration";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de EAN/GTIN-13 Válido para Testes",
  description: "Gere códigos de barras EAN-13 e GTIN válidos para testar seu e-commerce, ERP ou sistema de logística. Ferramenta gratuita.",
  keywords: ["gerador ean", "gerador gtin", "codigo de barras teste", "ecommerce tools"],
};

export default function GenerateGtinPage() {
    return (
        <PageWrapper>
            <GtinGenerationComponent />
        </PageWrapper>
    )
}

function GtinGenerationComponent() {
    return <>
        <Container fluid>            
            <GtinGeneration />
        </Container>
    </>
}
