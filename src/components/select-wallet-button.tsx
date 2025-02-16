import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Image, Button, VStack, HStack, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

interface SelectWalletButtonProps {
  disabled?: boolean;
}

const walletKeyShortened = (walletKey: string) =>
  walletKey.slice(0, 3) + "..." + walletKey.slice(-3);

const SelectWalletButton = ({ disabled = false }: SelectWalletButtonProps) => {
  const { publicKey, wallet, connected } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (connected) {
      setIsOpen(false);
    }
  }, [connected]);

  const buttonText =
    publicKey === null
      ? "Connect Wallet"
      : walletKeyShortened(publicKey.toBase58());

  const dialogTitle = "Connect Wallet";

  const image = wallet && (
    <Image src={wallet.adapter.icon} alt={wallet.adapter.name} h={6} w={6} />
  );
  return (
    <HStack wrap="wrap" gap="4" width="150px">
      <DialogRoot
        key="top"
        placement="top"
        motionPreset="slide-in-bottom"
        size="xs"
        open={isOpen}
        onOpenChange={(d) => setIsOpen(d.open)}
      >
        <DialogTrigger asChild>
          <Button variant="outline" disabled={disabled}>
            {image}
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack>
              <Wallets />
            </VStack>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

const Wallets = () => {
  const { select, wallets } = useWallet();

  const installedWallets = wallets.filter(
    (wallet) => wallet.readyState === "Installed",
  );

  if (installedWallets.length === 0) {
    return (
      <Text>No wallet found. Please download a supported Solana wallet</Text>
    );
  }

  return (
    <VStack width="100%">
      {installedWallets.map((wallet) => (
        <Button
          width="100%"
          variant="outline"
          key={wallet.adapter.name}
          justifyContent="flex-start"
          onClick={async () => select(wallet.adapter.name)}
        >
          <Image
            src={wallet.adapter.icon}
            alt={wallet.adapter.name}
            h={6}
            w={6}
          />
          {wallet.adapter.name}
        </Button>
      ))}
    </VStack>
  );
};

export default SelectWalletButton;
