import { PageWrapper } from "@/components/default_page_wrapper"
import { Container } from "@mantine/core"
import { RemoveBackground } from "./RemoveBackground"
import type { Metadata } from "next";

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

export default function RemoveBackgroundPage() {
    return (
        <PageWrapper>
            <RemoveBackgroundComponent />
        </PageWrapper>
    )
}

function RemoveBackgroundComponent() {
    return <>
        <Container fluid>            
            <RemoveBackground />
        </Container>
    </>
}