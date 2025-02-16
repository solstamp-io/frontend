import type { Metadata } from "next";
import config from "@/config";
import { ASSETS } from "./constants";

export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
}: Metadata & {
  canonicalUrlRelative?: string;
  extraTags?: Record<string, unknown>;
} = {}) => {
  return {
    // up to 50 characters (what does your app do for the user?) > your main should be here
    title: title || config.appName,
    // up to 160 characters (how does your app help the user?)
    description: description || config.appDescription,
    icons: {
      icon: [
        {
          url: ASSETS.logos.favicon.small,
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: ASSETS.logos.favicon.medium,
          sizes: "32x32",
          type: "image/png",
        },
      ],
      shortcut: "logos/favicon/favicon.ico",
      apple: ASSETS.logos.favicon.apple,
      other: [
        {
          rel: "icon",
          url: ASSETS.logos.favicon.small,
          sizes: "16x16",
          type: "image/png",
        },
        {
          rel: "icon",
          url: ASSETS.logos.favicon.medium,
          sizes: "32x32",
          type: "image/png",
        },
      ],
    },
    // some keywords separated by commas. by default it will be your app name
    keywords: keywords || [
      config.appName,
      "Solana",
      "Token Creator",
      "Token Minter",
      "NFT Creator",
      "NFT Minter",
      "NFT",
      "Token Minting",
      "Blockchain",
      "Crypto",
      "Web3",
      "DeFi",
      "Digital Assets",
      "Phantom Wallet",
      "Backpack",
    ],
    applicationName: config.appName,
    // set a base URL prefix for other fields that require a fully qualified URL (.e.g og:image: og:image: 'https://yourdomain.com/share.png' => '/share.png')
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : `https://${config.domainName}/`,
    ),

    openGraph: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      url: openGraph?.url || `https://${config.domainName}/`,
      siteName: openGraph?.title || config.appName,
      // If you add an opengraph-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
      // images: [
      //   {
      //     url: `https://${config.domainName}/share.png`,
      //     width: 1200,
      //     height: 660,
      //   },
      // ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      // If you add an twitter-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
      // images: [openGraph?.image || defaults.og.image],
      card: "summary_large_image",
      creator: "philipkrueck",
    },

    // If a canonical URL is given, we add it. The metadataBase will turn the relative URL into a fully qualified URL
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),

    other: {
      "web3-action": "token-minting",
      "blockchain-network": "solana",
      "dapp-category": "finance",
    },

    // If you want to add extra tags, you can pass them here
    ...extraTags,
  };
};

// Strctured Data for Rich Results on Google. Learn more: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
// Find your type here (SoftwareApp, Book...): https://developers.google.com/search/docs/appearance/structured-data/search-gallery
// Use this tool to check data is well structure: https://search.google.com/test/rich-results
// You don't have to use this component, but it increase your chances of having a rich snippet on Google.
// I recommend this one below to your /page.js for software apps: It tells Google your AppName is a Software, and it has a rating of 4.8/5 from 12 reviews.
// Fill the fields with your own data
// See https://shipfa.st/docs/features/seo
export const renderSchemaTags = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "SoftwareApplication",
          name: config.appName,
          description: config.appDescription,
          image: `https://${config.domainName}/icon.png`,
          url: `https://${config.domainName}/`,
          author: {
            "@type": "Person",
            name: "Philip Krück",
          },
          datePublished: "2025-02-21",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0.05",
            priceCurrency: "SOL",
          },
          requirements: "Phantom Wallet or other Solana-compatible wallet",
          featureList: [
            "Solana Token Minting",
            "NFT Creator",
            "Wallet Integration",
          ],
          permissions: [
            "wallet.connect",
            "wallet.signTransaction",
            "wallet.signAndSendTransaction",
          ],
        }),
      }}
    ></script>
  );
};
