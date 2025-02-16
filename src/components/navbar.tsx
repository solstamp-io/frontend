import {
  HStack,
  Box,
  Link as ChakraLink,
  Image,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ColorModeButton } from "@/components/ui/color-mode";
import { usePathname } from "next/navigation";
import SelectWalletButton from "./select-wallet-button";
import SelectNetworkButton from "./select-network-button";

export const NavbarMenu = () => {
  const pathname = usePathname();

  return (
    <Box as="nav" position="fixed" display="block" width="100%">
      <HStack marginY={4} marginX={8}>
        <NextLink href="/" passHref>
          <Image src="icon.png" height="48px" alt="" cursor="pointer" />
        </NextLink>
        <Spacer maxW={8} />
        <HStack spaceX={4}>
          <ChakraLink
            asChild
            variant={pathname === "/" ? "underline" : "plain"}
          >
            <NextLink href="/">Tokens</NextLink>
          </ChakraLink>
          <ChakraLink
            asChild
            variant={pathname === "/nft" ? "underline" : "plain"}
          >
            <NextLink href="/nft">NFTs</NextLink>
          </ChakraLink>
          <ChakraLink
            asChild
            variant={pathname === "/faq" ? "underline" : "plain"}
          >
            <NextLink href="/faq">FAQ</NextLink>
          </ChakraLink>
        </HStack>
        <Spacer />
        <HStack>
          <SelectNetworkButton />
          <SelectWalletButton />
          <ColorModeButton />
        </HStack>
      </HStack>
    </Box>
  );
};
