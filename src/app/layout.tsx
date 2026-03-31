import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider, DEFAULT_THEME, mantineHtmlProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { mantineTheme } from "./theme";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@next/third-parties/google'

const BASE_URL = 'https://www.ecommercetools.online';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Ecommerce Tools',
    default: 'Ecommerce Tools - Ferramentas Gratuitas para E-commerce: GTIN, QR Code, Código de Barras e Mais',
  },
  description: "Ferramentas gratuitas e online para e-commerce e desenvolvedores. Gere códigos GTIN/EAN válidos, crie QR Codes personalizados, gere códigos de barras, remova fundo de imagens com IA, conte caracteres e acompanhe tendências do Mercado Livre.",
  keywords: [
    "ferramentas ecommerce",
    "ferramentas e-commerce grátis",
    "gerador gtin",
    "gerador ean",
    "gerador código de barras",
    "gerador qr code",
    "remover fundo imagem",
    "contador de caracteres",
    "tendências mercado livre",
    "ecommerce tools",
    "ferramentas para lojistas",
    "ferramentas para vendedores online",
    "ferramentas marketplace",
    "código de barras online",
    "barcode generator",
  ],
  openGraph: {
    title: 'Ecommerce Tools - Ferramentas Gratuitas para E-commerce',
    description: 'Acesse ferramentas essenciais: Gerador de GTIN/EAN, Código de Barras, QR Code, Removedor de Fundo de Imagens, Contador de Caracteres e Tendências do Mercado Livre. Tudo gratuito e online.',
    url: BASE_URL,
    siteName: 'Ecommerce Tools',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecommerce Tools - Ferramentas Gratuitas para E-commerce',
    description: 'Gerador de GTIN, QR Code, Código de Barras, Removedor de Fundo e mais. Tudo gratuito e online.',
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
  category: 'technology',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
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
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
    </html>
  );
}

