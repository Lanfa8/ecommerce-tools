import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { QrCodeGenerator } from "./QrCodeGenerator";

export const metadata: Metadata = {
  title: "Gerador de QR Code Online Gratuito e Personalizável — Com Logo e Cores",
  description: "Crie QR Codes personalizados online e grátis com cores, logotipos e estilos diferentes. Gere QR Codes para links, URLs, textos, Wi-Fi e mais. Baixe em PNG de alta qualidade. Ideal para e-commerce, marketing, cartões de visita e embalagens.",
  keywords: [
    "gerador qr code",
    "gerador de qr code",
    "criar qr code",
    "qr code personalizado",
    "qr code online",
    "qr code grátis",
    "qr code generator",
    "qr code com logo",
    "qr code com cores",
    "gerar qr code",
    "qr code para link",
    "qr code para url",
    "qr code png",
    "qr code e-commerce",
    "qr code marketing",
    "qr code cartão de visita",
    "ecommerce tools",
    "criar qr code online grátis",
  ],
  openGraph: {
    title: "Gerador de QR Code Online Gratuito e Personalizável",
    description: "Crie QR Codes com cores, logos e estilos personalizados. Totalmente grátis e sem cadastro.",
    type: "website",
    url: "https://www.ecommercetools.online/qr_code_generator",
    siteName: "Ecommerce Tools",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de QR Code Online Gratuito",
    description: "Crie QR Codes personalizados com cores e logos. Grátis e sem cadastro.",
  },
  alternates: {
    canonical: "https://www.ecommercetools.online/qr_code_generator",
  },
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
