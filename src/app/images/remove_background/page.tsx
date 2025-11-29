import { PageWrapper } from "@/components/default_page_wrapper"
import { Container } from "@mantine/core"
import { RemoveBackground } from "./RemoveBackground"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Remover Fundo de Imagens Online Gratuitamente",
    description: "Remova o fundo de suas imagens de forma rápida e gratuita com nossa ferramenta online. Ideal para e-commerce, marketing e design gráfico.",
    keywords: ["remover fundo imagem", "fundo transparente", "ferramenta remover fundo", "ecommerce tools"],
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