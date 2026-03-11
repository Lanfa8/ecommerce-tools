"use client";

import { Button, ColorInput, Group, NumberInput, Paper, Select, Stack, TextInput, Title, Text } from "@mantine/core";
import { IconDownload, IconBarcode } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";

type BarcodeFormat =
    | "CODE128"
    | "EAN13"
    | "EAN8"
    | "UPC"
    | "CODE39"
    | "ITF14"
    | "MSI"
    | "pharmacode";

const FORMAT_OPTIONS: { value: BarcodeFormat; label: string }[] = [
    { value: "CODE128", label: "CODE 128 (texto livre)" },
    { value: "EAN13", label: "EAN-13 (13 dígitos)" },
    { value: "EAN8", label: "EAN-8 (8 dígitos)" },
    { value: "UPC", label: "UPC (12 dígitos)" },
    { value: "CODE39", label: "CODE 39 (alfanumérico)" },
    { value: "ITF14", label: "ITF-14 (14 dígitos)" },
    { value: "MSI", label: "MSI (numérico)" },
    { value: "pharmacode", label: "Pharmacode (numérico)" },
];

const PLACEHOLDER_MAP: Record<BarcodeFormat, string> = {
    CODE128: "Texto livre",
    EAN13: "7891234567890",
    EAN8: "78912345",
    UPC: "012345678905",
    CODE39: "ABC-1234",
    ITF14: "10012345678902",
    MSI: "123456",
    pharmacode: "1234",
};

export function BarcodeGenerator() {
    const [value, setValue] = useState("1234567890128");
    const [format, setFormat] = useState<BarcodeFormat>("EAN13");
    const [lineColor, setLineColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [width, setWidth] = useState<number>(2);
    const [height, setHeight] = useState<number>(100);
    const [showText, setShowText] = useState<string>("true");
    const [error, setError] = useState<string | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const generateBarcode = useCallback(() => {
        if (!svgRef.current || !value) return;

        try {
            JsBarcode(svgRef.current, value, {
                format,
                lineColor,
                background: bgColor,
                width,
                height,
                displayValue: showText === "true",
                margin: 10,
                fontSize: 16,
                font: "Roboto, sans-serif",
            });
            setError(null);
        } catch {
            setError("Valor inválido para o formato selecionado. Verifique o dado inserido.");
        }
    }, [value, format, lineColor, bgColor, width, height, showText]);

    useEffect(() => {
        generateBarcode();
    }, [generateBarcode]);

    const onDownloadClick = () => {
        if (!svgRef.current) return;

        const svgElement = svgRef.current;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            const scale = 3;
            const canvas = document.createElement("canvas");
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            const link = document.createElement("a");
            link.download = `barcode-${format}-${value}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        };
        img.src = url;
    };

    return (
        <Paper p="xl">
            <Group align="center" mb="md" gap="sm">
                <IconBarcode size={32} />
                <Title order={1}>Gerador de Código de Barras</Title>
            </Group>
            <Text c="dimmed" mb="lg">
                Gere códigos de barras personalizados nos formatos EAN-13, EAN-8, UPC, CODE 128, CODE 39, ITF-14 e mais. Baixe em alta qualidade como PNG.
            </Text>

            <Group align="flex-start" mt="md" wrap="wrap">
                <Stack style={{ flex: 1, minWidth: 280 }}>
                    <Select
                        label="Formato do Código de Barras"
                        value={format}
                        onChange={(val) => {
                            const newFormat = (val as BarcodeFormat) || "CODE128";
                            setFormat(newFormat);
                            setValue(PLACEHOLDER_MAP[newFormat]);
                        }}
                        data={FORMAT_OPTIONS}
                    />
                    <TextInput
                        label="Valor / Dados"
                        placeholder={PLACEHOLDER_MAP[format]}
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        error={error}
                    />
                    <Group grow>
                        <ColorInput
                            label="Cor das Barras"
                            value={lineColor}
                            onChange={setLineColor}
                        />
                        <ColorInput
                            label="Cor de Fundo"
                            value={bgColor}
                            onChange={setBgColor}
                        />
                    </Group>
                    <Group grow>
                        <NumberInput
                            label="Largura das Barras"
                            value={width}
                            onChange={(val) => setWidth(Number(val) || 2)}
                            min={1}
                            max={5}
                            step={0.5}
                        />
                        <NumberInput
                            label="Altura (px)"
                            value={height}
                            onChange={(val) => setHeight(Number(val) || 100)}
                            min={30}
                            max={300}
                            step={10}
                        />
                    </Group>
                    <Select
                        label="Exibir Texto"
                        value={showText}
                        onChange={(val) => setShowText(val || "true")}
                        data={[
                            { value: "true", label: "Sim" },
                            { value: "false", label: "Não" },
                        ]}
                    />
                    <Button
                        leftSection={<IconDownload size={20} />}
                        onClick={onDownloadClick}
                        color="teal"
                        disabled={!!error}
                    >
                        Baixar como PNG
                    </Button>
                </Stack>
                <Paper
                    withBorder
                    p="md"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: 320,
                        minHeight: 200,
                        overflow: "auto",
                    }}
                >
                    <svg ref={svgRef} />
                </Paper>
            </Group>
        </Paper>
    );
}
