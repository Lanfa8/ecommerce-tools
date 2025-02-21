import { Container } from "@mantine/core"
import { GtinGeneration } from "./GtinGeneration";
import { PageWrapper } from "@/components/default_page_wrapper";

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
