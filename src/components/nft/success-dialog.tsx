import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

import { ClipboardRoot, ClipboardIconButton } from "@/components/ui/clipboard";

import { HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

interface SuccessDialogProps {
  transactionId: string;
  assetId: string;
  onClose: () => void;
}

const SuccessDialog = ({
  transactionId,
  assetId,
  onClose,
}: SuccessDialogProps) => {
  const transactionIdShortened = transactionId.slice(0, 12) + "...";
  const assetIdShortened = assetId.slice(0, 12) + "...";
  const [isOpen, setIsOpen] = useState(true);

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot
        key="top"
        placement="top"
        motionPreset="slide-in-bottom"
        size="xs"
        open={isOpen}
        onOpenChange={(d) => {
          setIsOpen(d.open);
          if (!d.open) onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🎉 Your NFT is created!</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack alignItems="flex-start" width="100%">
              <p>Your fresh NFT should appear in your wallet.</p>
              <Spacer height={12}></Spacer>
              <HStack width="100%">
                <Text fontWeight="bold">Transaction Id:</Text>
                <Spacer />
                <Text>{transactionIdShortened}</Text>
                <ClipboardRoot value={transactionId}>
                  <ClipboardIconButton />
                </ClipboardRoot>
              </HStack>
              <HStack width="100%">
                <Text fontWeight="bold">Asset Id:</Text>
                <Spacer />
                <Text>{assetIdShortened}</Text>
                <ClipboardRoot value={assetId}>
                  <ClipboardIconButton />
                </ClipboardRoot>
              </HStack>
            </VStack>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

export default SuccessDialog;
