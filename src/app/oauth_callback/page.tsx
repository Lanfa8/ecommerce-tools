'use client'

import { PageWrapper } from "@/components/default_page_wrapper";
import { Container, Title, TextInput, ActionIcon, CopyButton, Tooltip, Stack, Paper } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OAuthCallbackPage() {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    const searchParams = useSearchParams();
    const code = searchParams?.get('code');

    const handleAuth = async (authCode: string) => {
        try {
            const response = await axios.post('/api/auth/mercadolivre', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: authCode,
                    redirectUri: process.env.NEXT_PUBLIC_MERCADOLIVRE_REDIRECT_URI
                }),
                endpoint: '/api/auth/mercadolivre',
            });
            const data = response.data;
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    }

    useEffect(() => {
        if (code) {
            handleAuth(code);
        }
    }, [code]);

    return (
        <PageWrapper>
            <Container fluid>
                {(!accessToken || !refreshToken) && (
                    <Title order={2} ta="center">Estamos processando a autenticação...</Title>
                )}
                {accessToken && refreshToken && (
                    <Stack gap="lg" maw={800} mx="auto" mt="xl">
                        <Title order={2} ta="center" mb="md">Autenticação bem-sucedida!</Title>
                        
                        <Paper p="md" withBorder radius="md">
                            <TextInput
                                label="Access Token"
                                value={accessToken}
                                readOnly
                                rightSection={
                                    <CopyButton value={accessToken} timeout={2000}>
                                        {({ copied, copy }) => (
                                            <Tooltip label={copied ? 'Copiado' : 'Copiar'} withArrow position="right">
                                                <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                                </ActionIcon>
                                            </Tooltip>
                                        )}
                                    </CopyButton>
                                }
                            />
                        </Paper>

                        <Paper p="md" withBorder radius="md">
                            <TextInput
                                label="Refresh Token"
                                value={refreshToken}
                                readOnly
                                rightSection={
                                    <CopyButton value={refreshToken} timeout={2000}>
                                        {({ copied, copy }) => (
                                            <Tooltip label={copied ? 'Copiado' : 'Copiar'} withArrow position="right">
                                                <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                                </ActionIcon>
                                            </Tooltip>
                                        )}
                                    </CopyButton>
                                }
                            />
                        </Paper>
                    </Stack>
                )}
            </Container>
        </PageWrapper>
    )
}