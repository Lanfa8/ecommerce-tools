"use client";

import {
  Accordion,
  ActionIcon,
  Button,
  CopyButton,
  Group,
  NumberInput,
  Paper,
  Select,
  Space,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconCheck,
  IconCopy,
  IconDownload,
  IconPlus,
  IconTag,
  IconTrash,
} from "@tabler/icons-react";
import { useCallback, useState } from "react";

interface Attribute {
  id: number;
  name: string;
  value: string;
}

type SuffixMode = "none" | "random" | "sequential";

export function SkuGenerator() {
  const [productName, setProductName] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([
    { id: 1, name: "", value: "" },
  ]);
  const [separator, setSeparator] = useState("-");
  const [suffixMode, setSuffixMode] = useState<SuffixMode>("none");
  const [randomLength, setRandomLength] = useState<number>(4);
  const [sequentialStart, setSequentialStart] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [generatedSkus, setGeneratedSkus] = useState<string[]>([]);
  const [uppercase, setUppercase] = useState<string>("true");
  const [nextAttrId, setNextAttrId] = useState(2);

  const addAttribute = () => {
    setAttributes((prev) => [...prev, { id: nextAttrId, name: "", value: "" }]);
    setNextAttrId((prev) => prev + 1);
  };

  const removeAttribute = (id: number) => {
    setAttributes((prev) => prev.filter((attr) => attr.id !== id));
  };

  const updateAttribute = (
    id: number,
    field: "name" | "value",
    value: string
  ) => {
    setAttributes((prev) =>
      prev.map((attr) => (attr.id === id ? { ...attr, [field]: value } : attr))
    );
  };

  const sanitize = (str: string) =>
    str
      .trim()
      .replace(/\s+/g, separator)
      .replace(/[^a-zA-Z0-9\-_]/g, "");

  const generateRandomString = useCallback(
    (length: number) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const array = new Uint32Array(length);
      crypto.getRandomValues(array);
      return Array.from(array, (v) => chars[v % chars.length]).join("");
    },
    []
  );

  const generateSkus = () => {
    const parts: string[] = [];

    const sanitizedName = sanitize(productName);
    if (sanitizedName) parts.push(sanitizedName);

    for (const attr of attributes) {
      const sanitizedValue = sanitize(attr.value);
      if (sanitizedValue) parts.push(sanitizedValue);
    }

    const baseSku = parts.join(separator);

    const skus: string[] = [];
    const qty = suffixMode === "none" ? 1 : quantity;

    for (let i = 0; i < qty; i++) {
      let sku = baseSku;

      if (suffixMode === "random") {
        const rand = generateRandomString(randomLength);
        sku = sku ? `${sku}${separator}${rand}` : rand;
      } else if (suffixMode === "sequential") {
        const seq = String(sequentialStart + i).padStart(4, "0");
        sku = sku ? `${sku}${separator}${seq}` : seq;
      }

      sku = uppercase === "true" ? sku.toUpperCase() : sku.toLowerCase();
      skus.push(sku);
    }

    setGeneratedSkus(skus);
  };

  const exportCsv = () => {
    const csv = ["SKU", ...generatedSkus].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "skus.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Stack gap="lg" maw={800} mx="auto" py="xl">
      <Group gap="sm">
        <IconTag size={32} color="var(--mantine-color-teal-5)" />
        <Title order={1}>Gerador de SKU</Title>
      </Group>
      <Text c="dimmed">
        Crie códigos SKU padronizados para seus produtos. Adicione nome,
        atributos e escolha entre sufixos aleatórios ou sequenciais.
      </Text>

      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <TextInput
            label="Nome do Produto"
            placeholder="Ex: Camiseta, Tenis, Notebook"
            value={productName}
            onChange={(e) => setProductName(e.currentTarget.value)}
          />

          <Text fw={500} size="sm">
            Atributos
          </Text>
          {attributes.map((attr) => (
            <Group key={attr.id} grow align="end">
              <TextInput
                label="Nome do Atributo"
                placeholder="Ex: Cor, Tamanho"
                value={attr.name}
                onChange={(e) =>
                  updateAttribute(attr.id, "name", e.currentTarget.value)
                }
              />
              <TextInput
                label="Valor"
                placeholder="Ex: Azul, GG, 128GB"
                value={attr.value}
                onChange={(e) =>
                  updateAttribute(attr.id, "value", e.currentTarget.value)
                }
              />
              <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => removeAttribute(attr.id)}
                disabled={attributes.length === 1}
                mt={24}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          ))}
          <Button
            variant="light"
            color="teal"
            leftSection={<IconPlus size={16} />}
            onClick={addAttribute}
            w="fit-content"
          >
            Adicionar Atributo
          </Button>

          <Group grow>
            <TextInput
              label="Separador"
              placeholder="-"
              value={separator}
              onChange={(e) => setSeparator(e.currentTarget.value)}
              maxLength={3}
            />
            <Select
              label="Caixa"
              data={[
                { value: "true", label: "MAIÚSCULAS" },
                { value: "false", label: "minúsculas" },
              ]}
              value={uppercase}
              onChange={(v) => setUppercase(v || "true")}
            />
          </Group>

          <Select
            label="Sufixo"
            data={[
              { value: "none", label: "Nenhum" },
              { value: "random", label: "String Aleatória" },
              { value: "sequential", label: "Número Sequencial" },
            ]}
            value={suffixMode}
            onChange={(v) => setSuffixMode((v as SuffixMode) || "none")}
          />

          {suffixMode === "random" && (
            <Group grow>
              <NumberInput
                label="Comprimento da String Aleatória"
                value={randomLength}
                onChange={(v) => setRandomLength(Number(v) || 4)}
                min={2}
                max={20}
              />
              <NumberInput
                label="Quantidade de SKUs"
                value={quantity}
                onChange={(v) => setQuantity(Number(v) || 1)}
                min={1}
                max={500}
              />
            </Group>
          )}

          {suffixMode === "sequential" && (
            <Group grow>
              <NumberInput
                label="Início da Sequência"
                value={sequentialStart}
                onChange={(v) => setSequentialStart(Number(v) || 1)}
                min={0}
              />
              <NumberInput
                label="Quantidade de SKUs"
                value={quantity}
                onChange={(v) => setQuantity(Number(v) || 1)}
                min={1}
                max={500}
              />
            </Group>
          )}

          <Button color="teal" size="md" onClick={generateSkus}>
            Gerar SKU
          </Button>
        </Stack>
      </Paper>

      {generatedSkus.length > 0 && (
        <Paper withBorder p="lg" radius="md">
          <Group justify="space-between" mb="md">
            <Title order={3}>
              SKUs Gerados ({generatedSkus.length})
            </Title>
            <Button
              variant="light"
              color="teal"
              leftSection={<IconDownload size={16} />}
              onClick={exportCsv}
            >
              Exportar CSV
            </Button>
          </Group>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={60}>#</Table.Th>
                <Table.Th>SKU</Table.Th>
                <Table.Th w={60}>Copiar</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {generatedSkus.map((sku, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>
                    <Text ff="monospace" fw={500}>
                      {sku}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <CopyButton value={sku}>
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copiado!" : "Copiar"}
                          withArrow
                        >
                          <ActionIcon
                            color={copied ? "teal" : "gray"}
                            variant="subtle"
                            onClick={copy}
                          >
                            {copied ? (
                              <IconCheck size={16} />
                            ) : (
                              <IconCopy size={16} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      )}

      <Title order={2} size="h3" mb="md">Perguntas Frequentes</Title>
      <Accordion variant="separated">
        <Accordion.Item value="o-que-e-sku">
          <Accordion.Control>O que é um SKU?</Accordion.Control>
          <Accordion.Panel>
            SKU (Stock Keeping Unit) é um código alfanumérico único usado para identificar e rastrear cada produto ou variação no seu estoque.
            Ele facilita o controle de inventário, a gestão de pedidos e a organização do catálogo em plataformas de e-commerce como
            <strong> Mercado Livre, Shopee, Amazon</strong> e lojas virtuais próprias.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="como-criar-sku">
          <Accordion.Control>Como criar um bom SKU?</Accordion.Control>
          <Accordion.Panel>
            Um bom SKU deve ser <strong>curto, legível e padronizado</strong>. Comece com uma abreviação do produto,
            seguida por atributos relevantes como cor, tamanho ou modelo. Use separadores consistentes (como traço ou underline)
            e evite caracteres especiais. Por exemplo: <strong>CAM-AZL-GG</strong> para uma camiseta azul tamanho GG.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="sku-ean">
          <Accordion.Control>Qual a diferença entre SKU e EAN/GTIN?</Accordion.Control>
          <Accordion.Panel>
            O <strong>SKU</strong> é um código interno da sua empresa, definido por você, para controle de estoque e catálogo.
            Já o <strong>EAN/GTIN</strong> é um código universal padronizado pela GS1, usado globalmente para identificar produtos no varejo.
            Um mesmo produto pode ter um EAN fixo e SKUs diferentes em cada loja ou armazém.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="sufixo-aleatorio-sequencial">
          <Accordion.Control>Quando usar sufixo aleatório ou sequencial?</Accordion.Control>
          <Accordion.Panel>
            Use <strong>sufixo sequencial</strong> quando precisar de códigos previsíveis e ordenados, ideal para lotes de produção
            ou cadastro em massa. Use <strong>sufixo aleatório</strong> quando quiser evitar que terceiros adivinhem seus códigos
            ou quando não houver necessidade de ordenação — comum em marketplaces e sistemas com múltiplos operadores.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="quantos-caracteres">
          <Accordion.Control>Quantos caracteres um SKU deve ter?</Accordion.Control>
          <Accordion.Panel>
            Não existe um padrão universal, mas a maioria dos marketplaces aceita SKUs de até <strong>40-50 caracteres</strong>.
            O ideal é manter entre <strong>8 e 20 caracteres</strong> para facilitar a leitura e evitar erros.
            Nosso gerador permite configurar o comprimento do sufixo para ajustar ao tamanho desejado.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="gratuito">
          <Accordion.Control>O gerador de SKU é gratuito?</Accordion.Control>
          <Accordion.Panel>
            Sim! Nosso gerador de SKU é <strong>100% gratuito</strong>, sem necessidade de cadastro ou instalação.
            Você pode gerar quantos SKUs quiser, copiar individualmente ou exportar todos em CSV.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Space h="xl" />
    </Stack>
  );
}
