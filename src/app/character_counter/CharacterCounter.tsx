"use client";

import { Paper, Space, Textarea, Title, Text, Group, Accordion } from "@mantine/core";
import { useState } from "react";

export function CharacterCounter() {
  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split(/\n/).length : 0;
  const charNoSpaces = text.replace(/\s/g, "").length;

  return (
    <Paper p="xl">
      <Title order={1}>Contador de Caracteres Online Grátis</Title>
      <Text c="dimmed" mt="xs" mb="md">
        Conte caracteres, letras, palavras e linhas do seu texto de forma rápida e gratuita.
        Ideal para otimizar títulos de anúncios em marketplaces como Mercado Livre, Shopee e Amazon, 
        meta descriptions para SEO, posts em redes sociais e descrições de produtos em e-commerce.
      </Text>
      <Space h="md" />
      <Textarea
        placeholder="Digite ou cole seu texto aqui para contar os caracteres..."
        label="Texto"
        autosize
        minRows={4}
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <Space h="md" />
      <Group gap="xl">
        <Text>
          Caracteres (com espaços): <strong>{text.length}</strong>
        </Text>
        <Text>
          Caracteres (sem espaços): <strong>{charNoSpaces}</strong>
        </Text>
        <Text>
          Palavras: <strong>{wordCount}</strong>
        </Text>
        <Text>
          Linhas: <strong>{lineCount}</strong>
        </Text>
      </Group>

      <Space h="xl" />

      <Title order={2} size="h3" mb="md">Por que contar caracteres é importante?</Title>
      <Text c="dimmed" mb="md">
        A contagem de caracteres é essencial para diversas atividades do dia a dia de quem trabalha com e-commerce, marketing digital e SEO. 
        Muitas plataformas impõem limites de caracteres em títulos, descrições e anúncios:
      </Text>
      <Text c="dimmed" mb="xs">• <strong>Mercado Livre</strong>: títulos de anúncios têm limite de 60 caracteres</Text>
      <Text c="dimmed" mb="xs">• <strong>Google (SEO)</strong>: meta titles devem ter até 60 caracteres e meta descriptions até 160 caracteres</Text>
      <Text c="dimmed" mb="xs">• <strong>Instagram</strong>: legendas suportam até 2.200 caracteres</Text>
      <Text c="dimmed" mb="xs">• <strong>Twitter/X</strong>: posts limitados a 280 caracteres</Text>
      <Text c="dimmed" mb="md">• <strong>Shopee e Amazon</strong>: títulos de produtos com limites variáveis por categoria</Text>

      <Space h="lg" />

      <Title order={2} size="h3" mb="md">Perguntas Frequentes</Title>
      <Accordion variant="separated">
        <Accordion.Item value="como-usar">
          <Accordion.Control>Como usar o contador de caracteres?</Accordion.Control>
          <Accordion.Panel>
            Basta digitar ou colar seu texto na caixa acima. A contagem de caracteres, palavras e linhas é atualizada automaticamente em tempo real, 
            sem necessidade de clicar em nenhum botão.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="espacos">
          <Accordion.Control>Espaços contam como caracteres?</Accordion.Control>
          <Accordion.Panel>
            Sim, espaços são contados como caracteres. Por isso, exibimos duas contagens: com e sem espaços. 
            A maioria das plataformas (como Google e redes sociais) conta espaços no limite total de caracteres.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="limite-titulo">
          <Accordion.Control>Qual o limite de caracteres para títulos de anúncios?</Accordion.Control>
          <Accordion.Panel>
            Depende da plataforma: Mercado Livre aceita até 60 caracteres, Google exibe até 60 caracteres nos resultados de busca, 
            e marketplaces como Shopee e Amazon possuem limites variáveis por categoria. Use nosso contador para garantir que seus textos estejam dentro do limite.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
}
