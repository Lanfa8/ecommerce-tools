import { Container } from "@mantine/core";
import { PageWrapper } from "@/components/default_page_wrapper";
import type { Metadata } from "next";
import { QrCodeGenerator } from "./QrCodeGenerator";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

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

const faqItems = [
  {
    question: "O QR Code gerado é realmente gratuito?",
    answer: "Sim. O gerador de QR Code é 100% gratuito, sem limites de uso e sem necessidade de cadastro. Você pode gerar quantos QR Codes quiser, personalizar cores e logos, e baixar em alta qualidade sem pagar nada.",
  },
  {
    question: "Posso adicionar meu logotipo ao QR Code?",
    answer: "Sim. Você pode fazer upload do logo da sua marca ou loja e ele será posicionado no centro do QR Code. O sistema ajusta automaticamente a correção de erro para garantir que o QR Code continue funcionando mesmo com o logo sobreposto.",
  },
  {
    question: "Para que posso usar os QR Codes gerados?",
    answer: "Os QR Codes podem ser usados para diversos fins: direcionar clientes para seu site ou loja online, compartilhar links de produtos, adicionar informações em embalagens, criar cartões de visita digitais, configurar redes Wi-Fi, e muito mais. São ideais para e-commerce, marketing digital e materiais impressos.",
  },
  {
    question: "Posso personalizar as cores do QR Code?",
    answer: "Sim. Você pode escolher a cor dos quadrados (dots) e a cor de fundo do QR Code. Também pode selecionar diferentes estilos de dots (quadrados, arredondados, pontos) e estilos dos cantos para criar um QR Code que combine com a identidade visual da sua marca.",
  },
  {
    question: "O QR Code gerado tem validade ou expira?",
    answer: "Não. Os QR Codes gerados são estáticos e permanentes — o conteúdo é codificado diretamente no QR Code. Isso significa que eles nunca expiram e funcionarão para sempre, independentemente de nossa plataforma. Basta que o link ou conteúdo de destino continue ativo.",
  },
];

export default function QrCodeGeneratorPage() {
  return (
    <PageWrapper>
      <SchemaMarkup
        schemas={[
          {
            type: "SoftwareApplication",
            name: "Gerador de QR Code Online Personalizável",
            description: "Crie QR Codes personalizados com cores, logos e estilos. Totalmente grátis e online.",
            url: "https://www.ecommercetools.online/qr_code_generator",
            applicationCategory: "UtilitiesApplication",
          },
        ]}
      />
      <Container fluid>
        <QrCodeGenerator />
      </Container>
      <FaqSection items={faqItems} />
    </PageWrapper>
  );
}
