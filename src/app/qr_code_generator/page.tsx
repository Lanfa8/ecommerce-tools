import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { QrCodeGenerator } from "./QrCodeGenerator";

export const metadata: Metadata = {
  title: "Gerador de QR Code Gratuito e Personalizável",
  description: "Crie QR Codes personalizados com cores, logotipos e estilos diferentes. Ferramenta gratuita para gerar QR Codes para links, textos e mais.",
  keywords: ["gerador qr code", "qr code personalizado", "criar qr code", "ecommerce tools"],
};

export default function QrCodeGeneratorPage() {
    return (
        <PageWrapper>
            <Container fluid>
                <QrCodeGenerator />
            </Container>
        </PageWrapper>
    )
}
