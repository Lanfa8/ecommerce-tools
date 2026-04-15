import Script from "next/script";

interface SoftwareApplicationSchemaProps {
  type: "SoftwareApplication";
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}

interface WebSiteSchemaProps {
  type: "WebSite";
  name: string;
  url: string;
  description: string;
}

interface OrganizationSchemaProps {
  type: "Organization";
  name: string;
  url: string;
  description: string;
  logo?: string;
}

type SchemaProps =
  | SoftwareApplicationSchemaProps
  | WebSiteSchemaProps
  | OrganizationSchemaProps;

function buildSchema(props: SchemaProps) {
  switch (props.type) {
    case "SoftwareApplication":
      return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: props.name,
        description: props.description,
        url: props.url,
        applicationCategory: props.applicationCategory || "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
      };
    case "WebSite":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: props.name,
        url: props.url,
        description: props.description,
        inLanguage: "pt-BR",
      };
    case "Organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: props.name,
        url: props.url,
        description: props.description,
        ...(props.logo ? { logo: props.logo } : {}),
      };
  }
}

export function SchemaMarkup({ schemas }: { schemas: SchemaProps[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`schema-${schema.type}-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildSchema(schema)),
          }}
        />
      ))}
    </>
  );
}
