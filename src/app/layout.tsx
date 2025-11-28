import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider, DEFAULT_THEME, mantineHtmlProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { mantineTheme } from "./theme";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    template: '%s | Ecommerce Tools',
    default: 'Ecommerce Tools - Utilitários para Desenvolvedores',
  },
  description: "Coleção de ferramentas gratuitas para testar e validar e-commerces. Gerador de GTIN, EAN e mais.",
  openGraph: {
    title: 'Ecommerce Tools',
    description: 'Ferramentas essenciais para desenvolvedores de e-commerce.',
    url: 'https://seu-dominio.com.br',
    siteName: 'Ecommerce Tools',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
          <MantineProvider
            theme={{
              ...mantineTheme,
              fontFamily: 'Roboto, sans-serif',
              fontFamilyMonospace: 'Monaco, Courier, monospace',
              headings: {
                fontFamily: `Roboto, ${DEFAULT_THEME.fontFamily}`,
              },
            }}
            forceColorScheme="dark"
          >
            <Notifications />
            {children}
          </MantineProvider>
          <SpeedInsights />
      </body>
    </html>
  );
}

