"use client";

import {
  Accordion,
  ActionIcon,
  Badge,
  Button,
  Card,
  CopyButton,
  Grid,
  Group,
  Image,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
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
  IconPackage,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { faker as fakerEN } from "@faker-js/faker/locale/en";
import { faker as fakerPTBR } from "@faker-js/faker/locale/pt_BR";
import { faker as fakerES } from "@faker-js/faker/locale/es";

type Locale = "pt_BR" | "en" | "es";

interface FakeAttribute {
  name: string;
  value: string;
}

interface FakeProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  currency: string;
  sku: string;
  ean: string;
  brand: string;
  category: string;
  subcategory: string;
  attributes: FakeAttribute[];
  stock: number;
  weight: number;
  width: number;
  height: number;
  depth: number;
  images: string[];
  condition: string;
  status: string;
  createdAt: string;
}

const CATEGORIES: Record<string, { subcategories: string[]; imageKeyword: string }> = {
  Eletrônicos: {
    subcategories: ["Smartphones", "Notebooks", "Tablets", "Fones de Ouvido", "Smartwatches", "Câmeras"],
    imageKeyword: "electronics",
  },
  Roupas: {
    subcategories: ["Camisetas", "Calças", "Vestidos", "Jaquetas", "Shorts", "Saias"],
    imageKeyword: "clothing",
  },
  "Casa e Decoração": {
    subcategories: ["Móveis", "Iluminação", "Tapetes", "Cortinas", "Quadros", "Almofadas"],
    imageKeyword: "furniture",
  },
  Esportes: {
    subcategories: ["Tênis", "Bicicletas", "Acessórios Fitness", "Bolas", "Mochilas", "Luvas"],
    imageKeyword: "sports",
  },
  Beleza: {
    subcategories: ["Perfumes", "Maquiagem", "Cuidados com a Pele", "Cabelos", "Unhas"],
    imageKeyword: "beauty",
  },
  Brinquedos: {
    subcategories: ["Jogos de Tabuleiro", "Bonecas", "Carrinhos", "Lego", "Pelúcias", "Quebra-cabeças"],
    imageKeyword: "toys",
  },
  Alimentos: {
    subcategories: ["Snacks", "Bebidas", "Orgânicos", "Suplementos", "Doces", "Cereais"],
    imageKeyword: "food",
  },
  Livros: {
    subcategories: ["Ficção", "Não-Ficção", "Técnicos", "Infantis", "Biografias", "Autoajuda"],
    imageKeyword: "books",
  },
};

const COLORS = ["Preto", "Branco", "Azul", "Vermelho", "Verde", "Amarelo", "Rosa", "Cinza", "Marrom", "Roxo"];
const SIZES = ["PP", "P", "M", "G", "GG", "XGG"];
const MATERIALS = ["Algodão", "Poliéster", "Couro", "Nylon", "Aço Inox", "Plástico ABS", "Madeira", "Vidro", "Silicone", "Borracha"];
const CONDITIONS = ["Novo", "Usado - Como novo", "Usado - Bom", "Recondicionado"];
const STATUSES = ["Ativo", "Pausado", "Em revisão"];

const FAQ_ITEMS = [
  {
    value: "o-que-e",
    question: "O que é o Gerador de Produtos Fake?",
    answer: "É uma ferramenta gratuita que cria dados fictícios de produtos completos — incluindo título, descrição, preço, SKU, EAN, atributos, imagens e dimensões — para serem usados em testes de sistemas de e-commerce, marketplaces e lojas virtuais.",
  },
  {
    value: "para-que-serve",
    question: "Para que serve gerar produtos fictícios?",
    answer: "Produtos fake são essenciais para desenvolvedores, QAs e designers que precisam popular ambientes de teste, validar integrações com ERPs e marketplaces, testar fluxos de checkout, criar protótipos de lojas e demonstrar funcionalidades sem expor dados reais.",
  },
  {
    value: "dados-realistas",
    question: "Os dados gerados são realistas?",
    answer: "Sim. Utilizamos a biblioteca Faker.js para gerar nomes de produtos, marcas, descrições e preços que se assemelham a dados reais. Os códigos EAN-13 possuem dígito verificador válido, e os SKUs seguem padrões comuns do mercado.",
  },
  {
    value: "imagens",
    question: "De onde vêm as imagens dos produtos?",
    answer: "As imagens são geradas automaticamente através da API LoremFlickr, que retorna fotos reais do Flickr com base na categoria ou palavra-chave informada. Cada produto recebe 5 imagens diferentes.",
  },
  {
    value: "idiomas",
    question: "Posso gerar produtos em outros idiomas?",
    answer: "Sim. A ferramenta suporta três locales: Português (Brasil), English e Español. Ao trocar o idioma, títulos, descrições e a formatação de moeda se adaptam automaticamente.",
  },
  {
    value: "exportar",
    question: "Como exportar os produtos gerados?",
    answer: "Após gerar os produtos, você pode exportá-los em formato JSON ou CSV clicando nos respectivos botões. O JSON mantém a estrutura completa com atributos aninhados, enquanto o CSV é ideal para importação em planilhas e sistemas legados.",
  },
  {
    value: "ean-valido",
    question: "O código EAN gerado é válido para uso comercial?",
    answer: "O código EAN-13 gerado possui dígito verificador matematicamente correto, porém não está registrado em nenhuma organização GS1. Ele deve ser usado exclusivamente para testes e desenvolvimento, nunca em produtos reais à venda.",
  },
  {
    value: "quantidade",
    question: "Quantos produtos posso gerar de uma vez?",
    answer: "Você pode gerar de 1 a 50 produtos por vez. Cada produto é gerado com dados únicos, incluindo IDs, SKUs e EANs diferentes.",
  },
  {
    value: "atributos",
    question: "Quais atributos são gerados para cada produto?",
    answer: "Cada produto recebe atributos contextualmente relevantes à sua categoria, como cor, material e modelo. Categorias específicas incluem atributos extras — por exemplo, Eletrônicos geram voltagem, garantia e memória; Roupas geram tamanho e gênero; Alimentos geram peso e validade.",
  },
  {
    value: "gratis",
    question: "A ferramenta é gratuita?",
    answer: "Sim, completamente gratuita e sem necessidade de cadastro. Todos os dados são gerados diretamente no seu navegador, sem envio de informações para servidores externos.",
  },
];

function getFaker(locale: Locale) {
  switch (locale) {
    case "pt_BR":
      return fakerPTBR;
    case "es":
      return fakerES;
    default:
      return fakerEN;
  }
}

function generateEAN13(): string {
  const digits = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
  const checksum =
    digits.reduce((sum, d, i) => sum + d * (i % 2 === 0 ? 1 : 3), 0) % 10;
  const checkDigit = checksum === 0 ? 0 : 10 - checksum;
  return [...digits, checkDigit].join("");
}

function generateAttributes(category: string, f: typeof fakerEN): FakeAttribute[] {
  const attrs: FakeAttribute[] = [];

  attrs.push({
    name: "Cor",
    value: COLORS[Math.floor(Math.random() * COLORS.length)],
  });

  if (["Roupas", "Esportes"].includes(category)) {
    attrs.push({
      name: "Tamanho",
      value: SIZES[Math.floor(Math.random() * SIZES.length)],
    });
  }

  attrs.push({
    name: "Material",
    value: MATERIALS[Math.floor(Math.random() * MATERIALS.length)],
  });

  if (category === "Eletrônicos") {
    attrs.push(
      { name: "Voltagem", value: f.helpers.arrayElement(["110V", "220V", "Bivolt"]) },
      { name: "Garantia", value: f.helpers.arrayElement(["6 meses", "1 ano", "2 anos"]) },
      { name: "Memória", value: f.helpers.arrayElement(["64GB", "128GB", "256GB", "512GB"]) }
    );
  }

  if (["Roupas", "Beleza"].includes(category)) {
    attrs.push({
      name: "Gênero",
      value: f.helpers.arrayElement(["Masculino", "Feminino", "Unissex"]),
    });
  }

  if (category === "Alimentos") {
    attrs.push(
      { name: "Peso", value: f.helpers.arrayElement(["100g", "250g", "500g", "1kg"]) },
      { name: "Validade", value: f.date.future({ years: 1 }).toLocaleDateString("pt-BR") }
    );
  }

  attrs.push({
    name: "Modelo",
    value: f.string.alphanumeric(6).toUpperCase(),
  });

  return attrs;
}

function generateProduct(
  locale: Locale,
  category: string | null,
  imageKeyword: string
): FakeProduct {
  const f = getFaker(locale);

  const categoryKeys = Object.keys(CATEGORIES);
  const chosenCategory = category || categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
  const catConfig = CATEGORIES[chosenCategory];
  const subcategory = catConfig.subcategories[Math.floor(Math.random() * catConfig.subcategories.length)];
  const keyword = imageKeyword || catConfig.imageKeyword;

  const price = parseFloat(f.commerce.price({ min: 15, max: 5000, dec: 2 }));
  const discountPercent = f.helpers.arrayElement([0, 5, 10, 15, 20, 25, 30]);
  const originalPrice =
    discountPercent > 0
      ? parseFloat((price / (1 - discountPercent / 100)).toFixed(2))
      : price;

  const productName = f.commerce.productName();
  const brand = f.company.name();
  const sanitizedName = productName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").substring(0, 10).toUpperCase();
  const sku = `${sanitizedName}-${f.string.alphanumeric(4).toUpperCase()}`;

  const timestamp = Date.now();
  const images = Array.from({ length: 5 }, (_, i) =>
    `https://loremflickr.com/640/640/${encodeURIComponent(keyword)}?lock=${timestamp + i}`
  );

  return {
    id: f.string.uuid(),
    title: `${productName} ${brand} - ${subcategory}`,
    description: f.commerce.productDescription(),
    price,
    originalPrice,
    currency: locale === "en" ? "USD" : locale === "es" ? "EUR" : "BRL",
    sku,
    ean: generateEAN13(),
    brand,
    category: chosenCategory,
    subcategory,
    attributes: generateAttributes(chosenCategory, f),
    stock: f.number.int({ min: 0, max: 500 }),
    weight: parseFloat((Math.random() * 10 + 0.1).toFixed(2)),
    width: parseFloat((Math.random() * 80 + 5).toFixed(1)),
    height: parseFloat((Math.random() * 80 + 5).toFixed(1)),
    depth: parseFloat((Math.random() * 60 + 2).toFixed(1)),
    images,
    condition: CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)],
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    createdAt: f.date.recent({ days: 60 }).toISOString(),
  };
}

function formatCurrency(value: number, currency: string): string {
  const localeMap: Record<string, string> = { BRL: "pt-BR", USD: "en-US", EUR: "es-ES" };
  return new Intl.NumberFormat(localeMap[currency] || "pt-BR", {
    style: "currency",
    currency,
  }).format(value);
}

export function FakeProductGenerator() {
  const [locale, setLocale] = useState<Locale>("pt_BR");
  const [category, setCategory] = useState<string | null>(null);
  const [imageKeyword, setImageKeyword] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<FakeProduct[]>([]);

  const handleGenerate = () => {
    const generated = Array.from({ length: quantity }, () =>
      generateProduct(locale, category, imageKeyword)
    );
    setProducts(generated);
  };

  const exportJson = () => {
    const json = JSON.stringify(products, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fake-products.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => {
    const headers = [
      "id", "title", "description", "price", "originalPrice", "currency",
      "sku", "ean", "brand", "category", "subcategory", "stock",
      "weight", "width", "height", "depth", "condition", "status",
      "createdAt", "image1", "image2", "image3", "image4", "image5",
      "attributes",
    ];
    const rows = products.map((p) => [
      p.id, `"${p.title.replace(/"/g, '""')}"`, `"${p.description.replace(/"/g, '""')}"`,
      p.price, p.originalPrice, p.currency, p.sku, p.ean,
      `"${p.brand.replace(/"/g, '""')}"`, p.category, p.subcategory,
      p.stock, p.weight, p.width, p.height, p.depth,
      p.condition, p.status, p.createdAt,
      ...p.images,
      `"${p.attributes.map((a) => `${a.name}:${a.value}`).join("; ")}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fake-products.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Stack gap="lg" py="xl">
      <Group gap="sm">
        <IconPackage size={32} color="var(--mantine-color-teal-5)" />
        <Title order={1}>Gerador de Produtos Fake</Title>
      </Group>
      <Text c="dimmed">
        Gere produtos fictícios completos para testes de e-commerce. Títulos,
        descrições, preços, atributos, SKU, EAN, imagens e mais — tudo gerado
        automaticamente com dados realistas usando Faker.
      </Text>

      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Idioma / Locale"
                data={[
                  { value: "pt_BR", label: "Português (Brasil)" },
                  { value: "en", label: "English" },
                  { value: "es", label: "Español" },
                ]}
                value={locale}
                onChange={(v) => setLocale((v as Locale) || "pt_BR")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Categoria"
                placeholder="Aleatória"
                data={Object.keys(CATEGORIES).map((c) => ({ value: c, label: c }))}
                value={category}
                onChange={setCategory}
                clearable
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Palavra-chave para Imagens"
                placeholder="Ex: smartphone, shoes, furniture (opcional)"
                description="Palavra em inglês para buscar imagens na LoremFlickr. Se vazio, usa a categoria."
                value={imageKeyword}
                onChange={(e) => setImageKeyword(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Quantidade de Produtos"
                description="Gere de 1 a 50 produtos por vez"
                value={quantity}
                onChange={(v) => setQuantity(Number(v) || 1)}
                min={1}
                max={50}
              />
            </Grid.Col>
          </Grid>

          <Button
            color="teal"
            size="md"
            leftSection={<IconRefresh size={18} />}
            onClick={handleGenerate}
          >
            Gerar Produtos
          </Button>
        </Stack>
      </Paper>

      {products.length > 0 && (
        <>
          <Group justify="space-between">
            <Title order={2}>
              Produtos Gerados ({products.length})
            </Title>
            <Group>
              <Button
                variant="light"
                color="teal"
                leftSection={<IconDownload size={16} />}
                onClick={exportJson}
              >
                Exportar JSON
              </Button>
              <Button
                variant="light"
                color="blue"
                leftSection={<IconDownload size={16} />}
                onClick={exportCsv}
              >
                Exportar CSV
              </Button>
            </Group>
          </Group>

          <Stack gap="xl">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </Stack>
        </>
      )}

      <Paper withBorder p="lg" radius="md">
        <Title order={2} mb="md">Perguntas Frequentes (FAQ)</Title>
        <Accordion variant="separated">
          {FAQ_ITEMS.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Control>{item.question}</Accordion.Control>
              <Accordion.Panel>
                <Text size="sm">{item.answer}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Paper>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </Stack>
  );
}

function ProductCard({ product, index }: { product: FakeProduct; index: number }) {
  return (
    <Paper withBorder p="lg" radius="md">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <div>
            <Group gap="xs" mb={4}>
              <Badge color="teal" variant="light">
                #{index + 1}
              </Badge>
              <Badge color={product.status === "Ativo" ? "green" : product.status === "Pausado" ? "yellow" : "blue"} variant="light">
                {product.status}
              </Badge>
              <Badge color="gray" variant="light">
                {product.condition}
              </Badge>
            </Group>
            <Title order={3}>{product.title}</Title>
          </div>
          <CopyButton value={JSON.stringify(product, null, 2)}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Copiado!" : "Copiar JSON"}>
                <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                  {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {product.description}
        </Text>

        <SimpleGrid cols={{ base: 2, xs: 3, sm: 5 }} spacing="xs">
          {product.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`${product.title} - imagem ${i + 1}`}
              radius="md"
              h={120}
              fit="cover"
              fallbackSrc="https://placehold.co/640x640?text=Imagem"
            />
          ))}
        </SimpleGrid>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Group gap="xs">
                <Text fw={700} size="xl" c="teal">
                  {formatCurrency(product.price, product.currency)}
                </Text>
                {product.originalPrice > product.price && (
                  <Text size="sm" c="dimmed" td="line-through">
                    {formatCurrency(product.originalPrice, product.currency)}
                  </Text>
                )}
              </Group>
              <Table withTableBorder withRowBorders={false}>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td fw={500} w={120}>SKU</Table.Td>
                    <Table.Td ff="monospace">{product.sku}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td fw={500}>EAN</Table.Td>
                    <Table.Td ff="monospace">{product.ean}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td fw={500}>Marca</Table.Td>
                    <Table.Td>{product.brand}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td fw={500}>Categoria</Table.Td>
                    <Table.Td>{product.category} &gt; {product.subcategory}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td fw={500}>Estoque</Table.Td>
                    <Table.Td>{product.stock} un.</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td fw={500}>Criado em</Table.Td>
                    <Table.Td>{new Date(product.createdAt).toLocaleDateString("pt-BR")}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text fw={600} size="sm">Dimensões e Peso</Text>
              <Table withTableBorder withRowBorders={false}>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td fw={500} w={120}>Peso</Table.Td>
                    <Table.Td>{product.weight} kg</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td fw={500}>Largura</Table.Td>
                    <Table.Td>{product.width} cm</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td fw={500}>Altura</Table.Td>
                    <Table.Td>{product.height} cm</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td fw={500}>Profundidade</Table.Td>
                    <Table.Td>{product.depth} cm</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>

              <Space h={4} />
              <Text fw={600} size="sm">Atributos</Text>
              <Group gap="xs">
                {product.attributes.map((attr, i) => (
                  <Badge key={i} variant="outline" color="gray" size="md">
                    {attr.name}: {attr.value}
                  </Badge>
                ))}
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}
