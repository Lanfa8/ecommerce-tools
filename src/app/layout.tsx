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
    default: 'Ecommerce Tools - Gerador de GTIN, QR Code e Removedor de Fundo',
  },
  description: "Ferramentas gratuitas para e-commerce e desenvolvedores. Gere códigos GTIN/EAN válidos, crie QR Codes personalizados e remova fundo de imagens com IA.",
  keywords: ["gerador gtin", "gerador ean", "qr code", "remover fundo", "ecommerce", "ferramentas", "gratis"],
  openGraph: {
    title: 'Ecommerce Tools - Ferramentas Gratuitas para E-commerce',
    description: 'Acesse ferramentas essenciais: Gerador de GTIN/EAN, QR Code Generator e Removedor de Fundo de Imagens. Tudo gratuito e online.',
    url: 'https://www.ecommercetools.online/',
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

