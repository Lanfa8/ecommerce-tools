"use client";

import { Alert, Button, Paper, Space, TextInput, Title, Text, Accordion } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconClipboard, IconClipboardCheck, IconInfoCircle, IconRefresh } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Country, generateGtin13 } from "./_utils/gtin_generation";

export function GtinGeneration() {
  const [gtin, setGtin] = useState(generateGtin13(Country.Brazil));

  return <Paper p="xl">
      <Title order={1}>Gerador de EAN/GTIN-13 Válido Online</Title>
      <Text c="dimmed" mt="xs" mb="md">
        Gere códigos de barras EAN-13 e GTIN válidos instantâneamente com dígito verificador correto. 
        Ideal para testar e-commerces, ERPs, sistemas de logística, marketplace e integrações de catálogo de produtos.
      </Text>
      <Space h="md" />
      <GtinInputExibition value={gtin} />
      <Space h="md" />
      <Button
        color="teal"
        onClick={() => {
          setGtin(generateGtin13(Country.Brazil));
        }}
        size="lg"
      >
        Gerar novo &nbsp;<IconRefresh size={24} />
      </Button>
      <Space h="xl" />
      <AdviceAlert />

      <Space h="xl" />

      <Title order={2} size="h3" mb="md">O que é EAN/GTIN-13?</Title>
      <Text c="dimmed" mb="md">
        O <strong>EAN-13</strong> (European Article Number) é o padrão internacional de código de barras mais utilizado no mundo para identificação de produtos no varejo. 
        O <strong>GTIN</strong> (Global Trade Item Number) é o número global que inclui o EAN-13. Ele é composto por 13 dígitos: o prefixo do país, o código da empresa, 
        o código do produto e um dígito verificador calculado automaticamente.
      </Text>
      <Text c="dimmed" mb="md">
        No Brasil, os códigos EAN-13 começam com o prefixo <strong>789</strong> ou <strong>790</strong>, atribuídos pela GS1 Brasil. 
        Eles são obrigatórios para cadastro de produtos em marketplaces como Mercado Livre, Amazon, Shopee e Magazine Luiza.
      </Text>

      <Space h="lg" />

      <Title order={2} size="h3" mb="md">Perguntas Frequentes</Title>
      <Accordion variant="separated">
        <Accordion.Item value="para-que-serve">
          <Accordion.Control>Para que serve o gerador de EAN/GTIN?</Accordion.Control>
          <Accordion.Panel>
            Este gerador cria códigos EAN-13 válidos (com dígito verificador correto) para fins de <strong>teste e simulação</strong>. 
            É útil para desenvolvedores testando sistemas de e-commerce, ERPs, APIs de marketplaces e integrações de catálogo. 
            Não deve ser usado para produtos reais em comércio.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="digito-verificador">
          <Accordion.Control>O dígito verificador é válido?</Accordion.Control>
          <Accordion.Panel>
            Sim! Todos os códigos gerados possuem o dígito verificador calculado corretamente seguindo o algoritmo oficial do padrão EAN-13/GTIN. 
            Isso garante que passem nas validações de sistemas de e-commerce e leitores de código de barras.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="comercial">
          <Accordion.Control>Posso usar estes códigos comercialmente?</Accordion.Control>
          <Accordion.Panel>
            <strong>Não.</strong> Para uso comercial, é necessário obter códigos oficiais através da <strong>GS1 Brasil</strong> (gs1br.org). 
            Esta ferramenta gera códigos exclusivamente para testes e desenvolvimento de software.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="diferenca">
          <Accordion.Control>Qual a diferença entre EAN e GTIN?</Accordion.Control>
          <Accordion.Panel>
            EAN (European Article Number) é o formato de código de barras visual com 13 dígitos. 
            GTIN (Global Trade Item Number) é o identificador numérico global que engloba vários formatos (GTIN-8, GTIN-12, GTIN-13, GTIN-14). 
            No contexto de produtos de varejo, EAN-13 e GTIN-13 referem-se ao mesmo código de 13 dígitos.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>;
}

function GtinInputExibition({ value }: { value: string }) {    
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setCopied(false);
    }, [value]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(value);
            notifications.show({
                message: 'Copied to clipboard!',
                color: 'green'
              });
              setCopied(true);
        } catch (err) {
            console.error("Failed to copy!", err);
            notifications.show({
                message: 'Failed to copy!',
                color: 'red'
            });
        }
    };
    
    const iconProps = {
      size: 24,
      onClick: copyToClipboard,
      className: "cursor-pointer",
    };

    const iconBefore = <IconClipboard  {...iconProps} />;
    const iconAfter = <IconClipboardCheck {...iconProps} />;

    return (
      <TextInput
        variant="filled"
        size="lg"
        readOnly
        value={value}
        classNames={{
            input: "text-lg py-3 px-4",
          }}
        rightSection={
          !copied ? iconBefore : iconAfter
        }
      />
    );
}

const AdviceAlert = () => {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="yellow" title="Atenção" icon={icon}>
      Esta ferramenta é destinada apenas para fins de teste e simulação. 
      Para obter códigos de barras oficiais e válidos para uso comercial, é necessário registrá-los através da GS1, organização internacional responsável pela emissão e administração de códigos de barras padronizados globalmente.
      Antes de utilizar qualquer código em produtos ou marketplace, consulte o site oficial da GS1 para garantir sua conformidade e validade.
    </Alert>
  );
};