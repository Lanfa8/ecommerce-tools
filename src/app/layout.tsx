import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider, DEFAULT_THEME, mantineHtmlProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { mantineTheme } from "./theme";

export const metadata: Metadata = {
  title: "E-commerce tools",
  description: "Handy e-commerce tools for developers and testers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
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
      </body>
    </html>
  );
}

