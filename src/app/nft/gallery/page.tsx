"use client";
import {
  Card,
  Button,
  Image,
  Center,
  Text,
  SimpleGrid,
  createListCollection,
  Link,
} from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

const nfts = createListCollection({
  items: [
    {
      name: "Frogana #4338",
      description: "Part of a collection of frogs",
      imageURL:
        "https://gz4t3ov2yjfayip73igk6scdsryol3ut76724lsfmkpntsn2yjya.arweave.net/Nnk9urrCSgwh_9oMr0hDlHDl7pP_v64uRWKe2cm6wnA?ext=png",
      solscanURL:
        "https://solscan.io/token/6ANQYPVb8pDf5NDsSZpUPYCSmKL61yX3B2DyGNLDCWC",
    },
    {
      name: "Fox #4123",
      description: "Part of the Transdimensional Fox Federation",
      imageURL: "https://famousfoxes.com/tff/4123.png",
      solscanURL:
        "https://solscan.io/token/BLNsYF3H3vvJonD6dnceRUivcLLyNU7uCVd3Qi5ZfwJu",
    },
    {
      name: "Banx #6857",
      description: "Part of the Banx collection",
      imageURL: "https://banxnft.s3.amazonaws.com/images/6857.png",
      solscanURL:
        "https://solscan.io/token/HLrSMdkuoJsZAJwzX4GERpTxgFtqnL7NimskcQ22aGEv",
    },
    {
      name: "Okay Bear #3349",
      description: "Part of the Okay Bears Collection.",
      imageURL:
        "https://wumlo33xurctejyx5rsczbzzqkxvjmwzkpztem27yvu42o74kotq.arweave.net/tRi3b3ekRTInF-xkLIc5gq9UstlT8zIzX8VpzTv8U6c",
      solscanURL:
        "https://solscan.io/token/Cbv2iY4tgyGnCXnYqfZ7fbNVQ6rt7AxG5egvvsXkJGBv",
    },
    {
      name: "Generations #161948 (HL_GNR)",
      description: "Part of the Honeyland collection",
      imageURL:
        "https://content.honey.land/images/bees/Honeyland%20Generations/Generational_Bee_Egg_Gen1.jpg",
      solscanURL:
        "https://solscan.io/token/7iffR2C8K5AR2ooN3PooYhUprmECPwvfJLH8jFYpmy33",
    },
    {
      name: "Bored Ape Solana Club #5089",
      description: "Part of the Bored Ape Club collection",
      imageURL: "https://basc.s3.amazonaws.com/img/5089.png",
      solscanURL:
        "https://solscan.io/token/AeUAzgLsU762A7vwvsju16k7GJx8wQLXdP1z8gvCKqeH",
    },
    {
      name: "Marvelous Mare #2254",
      description: "Part of the Marvelous Mare collection",
      imageURL: "https://assets.thirdtimegames.com/pfl-pfp/12254.png",
      solscanURL:
        "https://solscan.io/token/61m2Gr8iWRSFfPFxkghTdeo275YnqsZ6gtvBjy5i5Y6j",
    },
  ],
});

export default function NFTGallery() {
  return (
    <Center>
      <SimpleGrid columns={3} gap={4} maxWidth="3xl">
        {nfts.items.map((nft) => (
          <NFTCard
            key={nft.name}
            name={nft.name}
            description={nft.description}
            imageUrl={nft.imageURL}
            solscanURL={nft.solscanURL}
          />
        ))}
      </SimpleGrid>
    </Center>
  );
}

interface NFTCardProps {
  name: string;
  description: string;
  imageUrl: string;
  solscanURL: string;
}

const NFTCard = ({ name, description, imageUrl, solscanURL }: NFTCardProps) => {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image src={imageUrl} alt="Green double couch with wooden legs" />
      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Link href={solscanURL} target="_blank" rel="noopener noreferrer">
          Show on SolScan <LuExternalLink />
        </Link>
      </Card.Footer>
    </Card.Root>
  );
};
