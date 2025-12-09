"use client";

import { Paper, Space, Textarea, Title, Text } from "@mantine/core";
import { useState } from "react";

export function CharacterCounter() {
  const [text, setText] = useState("");

  return (
    <Paper p="xl">
      <Title order={1}>Contador de Caracteres</Title>
      <Space h="md" />
      <Textarea
        placeholder="Digite seu texto aqui..."
        label="Texto"
        autosize
        minRows={4}
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <Space h="md" />
      <Text>
        Caracteres: <strong>{text.length}</strong>
      </Text>
    </Paper>
  );
}
