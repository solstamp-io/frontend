"use client";
import { Provider } from "@/components/ui/provider";
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { Flex, Container, Spacer } from "@chakra-ui/react";
import { NavbarMenu } from "@/components/navbar";
import { useNetworkStore } from "@/components/select-network-button";

const devnetEndpoint = process.env.NEXT_PUBLIC_DEVNET_SOLANA_RPC_BACKEND!;
const mainnetEndpoint = process.env.NEXT_PUBLIC_MAINNET_SOLANA_RPC_BACKEND!;

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wallets = useMemo(() => [], []);
  const { network } = useNetworkStore();
  const endpoint = network === "devnet" ? devnetEndpoint : mainnetEndpoint;

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <Provider>
          <Flex flexDirection="column" minHeight="100vh">
            <NavbarMenu />
            <Container mt={24}>{children}</Container>
            <Spacer />
          </Flex>
        </Provider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
