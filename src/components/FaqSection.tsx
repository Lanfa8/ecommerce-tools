"use client";

import { Accordion, Box, Container, Text, Title } from "@mantine/core";
import Script from "next/script";

export interface FaqItem {
  question: string;
  answer: string;
}

function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
}

export function FaqSection({
  items,
  title = "Perguntas Frequentes",
}: FaqSectionProps) {
  return (
    <Box mt={60} mb={40}>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(items)),
        }}
      />
      <Container size="md">
        <Title order={2} ta="center" mb="xl">
          {title}
        </Title>
        <Accordion
          variant="separated"
          radius="md"
          styles={{
            item: {
              backgroundColor: "var(--mantine-color-dark-6)",
              border: "1px solid var(--mantine-color-dark-4)",
              "&[data-active]": {
                backgroundColor: "var(--mantine-color-dark-6)",
              },
            },
            control: {
              "&:hover": {
                backgroundColor: "var(--mantine-color-dark-5)",
              },
            },
          }}
        >
          {items.map((item, index) => (
            <Accordion.Item key={index} value={`faq-${index}`}>
              <Accordion.Control>
                <Text fw={500} size="md">
                  {item.question}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text c="dimmed" size="sm" lh={1.6}>
                  {item.answer}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
}
