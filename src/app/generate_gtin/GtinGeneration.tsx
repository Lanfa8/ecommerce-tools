"use client";

import { Alert, Button, Paper, Space, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconClipboard, IconClipboardCheck, IconInfoCircle, IconRefresh } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Country, generateGtin13 } from "./_utils/gtin_generation";

export function GtinGeneration() {
  const [gtin, setGtin] = useState(generateGtin13(Country.Brazil));

  return <Paper p="xl">
      <Title order={1}>Gerador de EAN/GTIN-13</Title>
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