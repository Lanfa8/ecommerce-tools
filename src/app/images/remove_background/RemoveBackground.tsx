"use client";

import { useImageBackgroundRemoval } from "@/hooks/useRemoveImageBackground";
import { 
  Button, 
  FileInput, 
  Paper, 
  Title, 
  Image, 
  Stack, 
  Group, 
  Text, 
  Box, 
  Overlay, 
  Center, 
} from "@mantine/core";
import { IconCheck, IconDownload, IconRefresh, IconUpload, IconX } from "@tabler/icons-react";
import { useState } from "react";

export function RemoveBackground() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resultingImageUrl, setResultingImageUrl] = useState<string | null>(null);
  const { mutateAsync, isPending } = useImageBackgroundRemoval();

  const [hovered, setHovered] = useState(false);

  const handleRemoveBackground = async () => {
    if (uploadedFile) {
      try {
        const response = await mutateAsync(uploadedFile);
        setResultingImageUrl(response.parsed_image_url);
      } catch (error) {
        console.error('Error removing background:', error);
      }
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setResultingImageUrl(null);
  };

  const handleDownload = () => {
    if (resultingImageUrl) {
      const link = document.createElement('a');
      link.href = resultingImageUrl;
      link.download = `removed-bg-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const checkerboardPattern = {
    backgroundImage: `
      linear-gradient(45deg, #e0e0e0 25%, transparent 25%), 
      linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), 
      linear-gradient(45deg, transparent 75%, #e0e0e0 75%), 
      linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)
    `,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    backgroundColor: '#ffffff'
  };

  return (
    <Center style={{ minHeight: '90vh' }}>
      <Paper p="xl" radius="md" shadow="sm" w={500} withBorder>
        
        <Stack gap="xs" mb="xl" align="center">
          <Title order={2} ta="center">Remover Fundo</Title>
          <Text c="dimmed" size="sm" ta="center">
            {resultingImageUrl 
              ? "Sua imagem está pronta para download" 
              : "Faça upload de uma imagem para remover o fundo automaticamente."}
          </Text>
        </Stack>

        {!resultingImageUrl && (
          <Stack>
            <FileInput
              leftSection={<IconUpload size={18} />}
              label="Escolha a imagem"
              description="Formatos suportados: PNG, JPG, WEBP"
              placeholder="Clique para selecionar"
              value={uploadedFile}
              onChange={setUploadedFile}
              accept="image/*"
              clearable
            />

            <Button
              color="teal"
              fullWidth
              onClick={handleRemoveBackground}
              size="md"
              loading={isPending}
              disabled={!uploadedFile}
              leftSection={!isPending && <IconCheck size={18} />}
              mt="md"
            >
              Remover Fundo Agora
            </Button>
          </Stack>
        )}

        {resultingImageUrl && (
          <Stack>
            <Box
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #dee2e6',
                ...checkerboardPattern
              }}
            >
              <Image
                src={resultingImageUrl}
                fit="contain"
                h={300}
                w="100%"
                alt="Imagem processada"
              />

              {hovered && (
                <Overlay 
                  color="#000" 
                  backgroundOpacity={0.6} 
                  blur={2}
                  zIndex={5}
                >
                  <Center h="100%">
                    <Button 
                      color="teal" 
                      variant="filled" 
                      size="lg" 
                      radius="xl"
                      leftSection={<IconDownload size={20} />}
                      onClick={handleDownload}
                    >
                      Baixar PNG
                    </Button>
                  </Center>
                </Overlay>
              )}
            </Box>

            <Group grow mt="sm">
              <Button 
                variant="light" 
                color="red" 
                onClick={handleReset}
                leftSection={<IconX size={16} />}
              >
                Descartar
              </Button>
              <Button 
                variant="outline" 
                onClick={handleReset}
                leftSection={<IconRefresh size={16} />}
              >
                Nova Imagem
              </Button>
            </Group>
          </Stack>
        )}
      </Paper>
    </Center>
  );
}