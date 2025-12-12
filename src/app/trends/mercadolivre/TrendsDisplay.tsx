"use client";

import { useEffect, useState } from 'react';
import { Title, Loader, Alert, Card, Text, SimpleGrid, Badge, Group, Button, Skeleton } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

interface Trend {
  keyword: string;
  url: string;
}

export function TrendsDisplay() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/trends/mercadolivre')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setTrends(data.result);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Falha ao carregar tendências. Tente novamente mais tarde.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Title order={2} mb="lg">Tendências de Busca - Mercado Livre</Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Skeleton height={20} width={50} radius="xl" />
              </Group>

              <Skeleton height={24} mt="sm" width="90%" radius="sm" />
              <Skeleton height={24} mt="xs" width="60%" radius="sm" />

              <Skeleton height={36} mt="lg" radius="md" />
            </Card>
          ))}
        </SimpleGrid>
      </>
    );
  }

  if (error) return <Alert color="red" title="Erro">{error}</Alert>;

  return (
    <>
      <Title order={2} mb="lg">Tendências de Busca - Mercado Livre</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {trends.map((trend, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
             <Group justify="space-between" mb="xs">
                <Badge color="yellow" variant="light">#{index + 1}</Badge>
             </Group>
             
             <Text fw={700} size="lg" lineClamp={2} mb="md" style={{ minHeight: '3.5rem' }}>
                {trend.keyword}
             </Text>

             <Button 
                component="a" 
                href={trend.url} 
                target="_blank" 
                rel="noreferrer" 
                variant="light" 
                color="blue" 
                fullWidth 
                rightSection={<IconExternalLink size={14} />}
             >
                Ver no Mercado Livre
             </Button>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
