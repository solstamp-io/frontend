"use client";
import { useNetworkStore } from "@/components/select-network-button";
import { Api, NetworkType, NFT } from "@/lib/api";
import {
  Card,
  Image,
  Center,
  Text,
  SimpleGrid,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { LuExternalLink } from "react-icons/lu";
import { create } from "zustand";

interface NFTGalleryStore {
  items?: NFT[];
  isLoading: boolean;
  error?: Error;
  fetchItems: (network: NetworkType) => void;
}

const useStore = create<NFTGalleryStore>((set) => ({
  items: undefined,
  isLoading: false,
  error: undefined,

  fetchItems: async (network: NetworkType) => {
    set({ isLoading: true, error: undefined });
    try {
      const listNFTSResponse = await Api.listNFTs(network);

      set({
        items: listNFTSResponse.items,
        isLoading: false,
        error: undefined,
      });
    } catch (error) {
      console.log("error", error);
      set({
        items: undefined,
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  },
}));

export default function NFTGallery() {
  const { network } = useNetworkStore();
  const { items, isLoading, error, fetchItems } = useStore();

  useEffect(() => {
    fetchItems(network);
  }, [fetchItems, network]);

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  if (items) {
    return (
      <Center>
        <SimpleGrid columns={3} gap={4} maxWidth="3xl">
          {items.map((nft) => (
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
      <Image src={imageUrl} alt="NFT image" />
      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Link href={solscanURL} target="_blank">
          Show on SolScan <LuExternalLink />
        </Link>
      </Card.Footer>
    </Card.Root>
  );
};
