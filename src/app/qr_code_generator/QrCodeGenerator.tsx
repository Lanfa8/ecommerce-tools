"use client";

import { Button, ColorInput, FileInput, Group, Paper, Select, Stack, TextInput, Title } from "@mantine/core";
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
            <Title order={1}>Gerador de QR Code</Title>
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
        </Paper>
    );
}
