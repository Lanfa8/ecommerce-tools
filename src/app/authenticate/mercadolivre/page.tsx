'use client'

import { PageWrapper } from "@/components/default_page_wrapper";
import { Button, Center, Container } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import Link from "next/link";

const MERCADOLIVRE_OAUTH_URL = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_MERCADOLIVRE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_MERCADOLIVRE_REDIRECT_URI!)}`;

export default function AuthenticatePage() {
    return (
        <PageWrapper>
            <Container fluid>
                <Center>
                    <AuthenticatePageComponent />
                </Center>
            </Container>
        </PageWrapper>
    )
}

function AuthenticatePageComponent() {
    return <Button
        size="lg"
        color="teal"
        component={Link}
        href={MERCADOLIVRE_OAUTH_URL}
        rightSection={<IconLink size={20} />}
    >
        Conectar com Mercado Livre
    </Button>;
}