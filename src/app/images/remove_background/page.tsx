import { PageWrapper } from "@/components/default_page_wrapper"
import { Container } from "@mantine/core"
import { RemoveBackground } from "./RemoveBackground"
import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
    title: "Remover Fundo de Imagens Online Gratuitamente com IA — PNG Transparente",
    description: "Remova o fundo de imagens online e grátis com inteligência artificial. Obtenha PNG com fundo transparente em segundos. Ideal para fotos de produtos de e-commerce, marketing digital, design gráfico e redes sociais.",
    keywords: [
        "remover fundo imagem",
        "remover fundo online",
        "remover fundo grátis",
        "fundo transparente",
        "remover background",
        "remove background",
        "background remover",
        "tirar fundo imagem",
        "remover fundo foto produto",
        "fundo branco produto",
        "remover fundo e-commerce",
        "png transparente",
        "remover fundo com ia",
        "remover fundo inteligência artificial",
        "ecommerce tools",
        "ferramenta remover fundo",
        "editor de imagem online",
        "recortar fundo imagem",
    ],
    openGraph: {
        title: "Remover Fundo de Imagens Online Gratuitamente com IA",
        description: "Remova o fundo de suas imagens com IA. Obtenha PNG transparente em segundos. Ideal para e-commerce e marketing.",
        type: "website",
        url: "https://www.ecommercetools.online/images/remove_background",
        siteName: "Ecommerce Tools",
        locale: "pt_BR",
    },
    twitter: {
        card: "summary_large_image",
        title: "Remover Fundo de Imagens Online Grátis com IA",
        description: "Remova o fundo de imagens online e grátis. PNG transparente em segundos.",
    },
    alternates: {
        canonical: "https://www.ecommercetools.online/images/remove_background",
    },
};

const faqItems = [
  {
    question: "Como funciona a remoção de fundo com IA?",
    answer: "Nossa ferramenta utiliza inteligência artificial avançada que roda diretamente no seu navegador para identificar e separar o objeto principal do fundo da imagem. O processamento acontece localmente no seu dispositivo — nenhuma imagem é enviada para servidores externos, garantindo total privacidade.",
  },
  {
    question: "Quais formatos de imagem são aceitos?",
    answer: "A ferramenta aceita os formatos mais comuns: PNG, JPG, JPEG e WebP. A imagem resultante é sempre gerada em formato PNG com fundo transparente, pronta para uso em e-commerce, marketplaces e materiais de marketing.",
  },
  {
    question: "A qualidade da imagem é preservada após remover o fundo?",
    answer: "Sim. A IA preserva a qualidade original da imagem ao remover o fundo. O resultado é um PNG de alta qualidade com fundo transparente, ideal para fotos de produtos em marketplaces como Mercado Livre, Shopee, Amazon e lojas virtuais.",
  },
  {
    question: "Minhas imagens são enviadas para algum servidor?",
    answer: "Não. Todo o processamento acontece diretamente no seu navegador usando WebAssembly e modelos de IA locais. Suas imagens nunca saem do seu dispositivo, garantindo total privacidade e segurança dos seus dados.",
  },
  {
    question: "É necessário instalar algo para usar a ferramenta?",
    answer: "Não. A ferramenta funciona inteiramente no navegador, sem necessidade de instalar plugins, extensões ou softwares. Basta acessar a página, fazer upload da sua imagem e baixar o resultado com fundo removido. É 100% gratuito e sem cadastro.",
  },
];

export default function RemoveBackgroundPage() {
    return (
        <PageWrapper>
            <SchemaMarkup
                schemas={[
                    {
                        type: "SoftwareApplication",
                        name: "Removedor de Fundo de Imagens com IA",
                        description: "Remova o fundo de imagens online e grátis com inteligência artificial. PNG transparente em segundos.",
                        url: "https://www.ecommercetools.online/images/remove_background",
                        applicationCategory: "MultimediaApplication",
                    },
                ]}
            />
            <Container fluid>
                <RemoveBackground />
            </Container>
            <FaqSection items={faqItems} />
        </PageWrapper>
    )
}