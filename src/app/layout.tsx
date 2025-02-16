// import "./globals.css";
import { getSEOTags, renderSchemaTags } from "@/lib/seo";
import { ClientLayout } from "./client-layout";

export const metadata = getSEOTags({
  title: "solstamp | Solana Token Creator",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {renderSchemaTags()}
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
