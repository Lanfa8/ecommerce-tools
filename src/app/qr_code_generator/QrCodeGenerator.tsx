"use client";

import { Button, ColorInput, FileInput, Group, Paper, Select, Stack, TextInput, Title, Text, Accordion, Space } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import QRCodeStyling, { DotType } from "qr-code-styling";

export function QrCodeGenerator() {
    const [url, setUrl] = useState("https://example.com");
    const [color, setColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [dotType, setDotType] = useState<DotType>("rounded");
    const [image, setImage] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);

    useEffect(() => {
        const qr = new QRCodeStyling({
            width: 300,
            height: 300,
            image: "",
            dotsOptions: {
                color: "#000000",
                type: "rounded"
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 10
            }
        });
        setQrCode(qr);
        if (ref.current) {
            qr.append(ref.current);
        }
    }, []);

    useEffect(() => {
        if (!qrCode) return;
        qrCode.update({
            data: url,
            dotsOptions: {
                color: color,
                type: dotType
            },
            backgroundOptions: {
                color: bgColor,
            },
            image: image || undefined
        });
    }, [qrCode, url, color, bgColor, dotType, image]);

    const onFileChange = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };

    const onDownloadClick = () => {
        if (!qrCode) return;
        qrCode.download({
            extension: "png"
        });
    };

    return (
        <Paper p="xl">
            <Title order={1}>Gerador de QR Code Online Grátis</Title>
            <Text c="dimmed" mt="xs" mb="md">
                Crie QR Codes personalizados com cores, logotipos e estilos diferentes. 
                Gere QR Codes para links, URLs, textos, contatos e mais. Baixe em PNG de alta qualidade, sem necessidade de cadastro.
            </Text>
            <Group align="flex-start" mt="md">
                <Stack style={{ flex: 1 }}>
                    <TextInput
                        label="Conteúdo (URL ou Texto)"
                        value={url}
                        onChange={(event) => setUrl(event.currentTarget.value)}
                    />
                    <Group grow>
                        <ColorInput
                            label="Cor dos Pontos"
                            value={color}
                            onChange={setColor}
                        />
                        <ColorInput
                            label="Cor de Fundo"
                            value={bgColor}
                            onChange={setBgColor}
                        />
                    </Group>
                    <Select
                        label="Estilo dos Pontos"
                        value={dotType}
                        onChange={(value) => setDotType(value as DotType || "square")}
                        data={[
                            { value: 'rounded', label: 'Arredondado' },
                            { value: 'dots', label: 'Pontos' },
                            { value: 'classy', label: 'Clássico' },
                            { value: 'classy-rounded', label: 'Clássico Arredondado' },
                            { value: 'square', label: 'Quadrado' },
                            { value: 'extra-rounded', label: 'Extra Arredondado' },
                        ]}
                    />
                    <FileInput
                        label="Logo (Opcional)"
                        placeholder="Selecione uma imagem"
                        accept="image/png,image/jpeg"
                        onChange={onFileChange}
                        clearable
                    />
                    <Button leftSection={<IconDownload size={20} />} onClick={onDownloadClick} color="teal">
                        Baixar QR Code
                    </Button>
                </Stack>
                <Paper withBorder p="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 320, minHeight: 320 }}>
                    <div ref={ref} />
                </Paper>
            </Group>

            <Space h="xl" />

            <Title order={2} size="h3" mb="md">O que é um QR Code?</Title>
            <Text c="dimmed" mb="md">
                QR Code (Quick Response Code) é um tipo de código de barras bidimensional que pode armazenar URLs, textos, dados de contato, 
                configurações de Wi-Fi e muito mais. Ele pode ser escaneado pela câmera de qualquer smartphone, tornando-o ideal para 
                marketing digital, embalagens de produtos, cartões de visita, cardápios, ingressos e e-commerce.
            </Text>
            <Text c="dimmed" mb="md">
                Nosso gerador permite personalizar o QR Code com cores da sua marca, adicionar seu logotipo no centro 
                e escolher entre diferentes estilos visuais. O resultado é um QR Code único e profissional, pronto para uso digital ou impresso.
            </Text>

            <Space h="lg" />

            <Title order={2} size="h3" mb="md">Perguntas Frequentes</Title>
            <Accordion variant="separated">
                <Accordion.Item value="como-criar">
                    <Accordion.Control>Como criar um QR Code personalizado?</Accordion.Control>
                    <Accordion.Panel>
                        Digite ou cole o conteúdo (URL, texto, etc.), personalize as cores, escolha o estilo dos pontos e 
                        adicione seu logo se desejar. Clique em &quot;Baixar QR Code&quot; para obter a imagem em PNG de alta qualidade.
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="gratuito">
                    <Accordion.Control>O gerador de QR Code é gratuito?</Accordion.Control>
                    <Accordion.Panel>
                        Sim! É 100% gratuito, sem necessidade de cadastro. Você pode gerar quantos QR Codes quiser, 
                        sem marcas d&apos;água e sem limites de downloads.
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="logo">
                    <Accordion.Control>Posso colocar meu logo no QR Code?</Accordion.Control>
                    <Accordion.Panel>
                        Sim! Basta fazer upload da imagem do seu logo no campo &quot;Logo (Opcional)&quot;. 
                        O logotipo será centralizado no QR Code automaticamente. Recomendamos logos em PNG com fundo transparente para melhor resultado.
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="onde-usar">
                    <Accordion.Control>Onde posso usar QR Codes no e-commerce?</Accordion.Control>
                    <Accordion.Panel>
                        QR Codes são versáteis para e-commerce: embalagens de produtos (link para manual ou avaliações), 
                        cartões de agradecimento com cupom de desconto, etiquetas com rastreamento de envio, 
                        marketing em redes sociais, e links diretos para páginas de produtos.
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Paper>
    );
}
