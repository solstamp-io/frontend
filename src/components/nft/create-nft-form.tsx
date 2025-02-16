"use client";
import { Button, Card, HStack, Spacer, VStack, Badge } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { UploadIndicator } from "@/components/upload-indicator";
import { useNFTForm } from "./hooks/use-nft-minting";
import { FormFields } from "./form-fields";
import SuccessDialog from "./success-dialog";
import { useNetworkStore } from "../select-network-button";

export const CreateNFTForm = () => {
  const { network } = useNetworkStore();

  const {
    form,
    formState,
    transactionInProgress,
    isWalletConnected,
    handleCreateNFT,
    resetForm,
  } = useNFTForm();

  return (
    <Card.Root>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.setValue("network", network);
          form.handleSubmit(handleCreateNFT)(e);
        }}
      >
        <Card.Header>
          <HStack>
            <Card.Title>Create Your NFT</Card.Title>
            <Spacer />
            <Badge>Cost = 0.05 SOL</Badge>
          </HStack>
        </Card.Header>
        <Card.Body width="sm">
          <FormFields form={form} disabled={transactionInProgress} />
        </Card.Body>
        <Card.Footer>
          <VStack width="100%" spaceY={8}>
            <HStack width="100%">
              <Spacer />
              <SelectWalletButton disabled={transactionInProgress} />
              {isWalletConnected && (
                <Button
                  type="submit"
                  variant="solid"
                  disabled={transactionInProgress}
                >
                  Create
                </Button>
              )}
            </HStack>
            {transactionInProgress && (
              <UploadIndicator mintingState={formState} />
            )}
            {formState.kind === "paid" && (
              <SuccessDialog
                {...formState.transactionDetails}
                onClose={() => resetForm()}
              />
            )}
          </VStack>
        </Card.Footer>
      </form>
    </Card.Root>
  );
};

const SelectWalletButton = dynamic(
  () => import("@/components/select-wallet-button"),
  {
    ssr: false,
  },
);
