import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { Api } from "@/lib/api";
import { formSchema, FormValues, MintingState } from "../schema";

const createImageFormData = (file: File): FormData => {
  const imageData = new FormData();
  imageData.append("image", file);
  return imageData;
};

const createTokenSchema = (formValues: FormValues, imageUrl: string) => {
  return {
    metadata: {
      name: formValues.name,
      symbol: formValues.symbol,
      description: formValues.description,
      image: imageUrl,
      attributes: [],
    },
    decimals: formValues.decimals,
    supply: formValues.supply,
    revokeMintAuthority: formValues.revokeMintAuthority,
    revokeUpdateAuthority: formValues.revokeUpdateAuthority,
    revokeFreezeAuthority: formValues.revokeFreezeAuthority,
  };
};

export const useTokenForm = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [formState, setFormState] = useState<MintingState>({ kind: "initial" });

  const form: UseFormReturn<FormValues> = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const isWalletConnected =
    publicKey !== null && signTransaction !== undefined && sendTransaction;
  const transactionInProgress =
    formState.kind === "uploading" ||
    formState.kind === "preparing" ||
    formState.kind === "paying" ||
    formState.kind === "confirming" ||
    formState.kind === "paid";

  const resetForm = () => setFormState({ kind: "initial" });

  const handleCreateToken = async (data: FormValues) => {
    if (!isWalletConnected) return;

    try {
      setFormState({ kind: "uploading" });
      const imageUrl = await Api.uploadImage(
        publicKey.toBase58(),
        createImageFormData(data.image),
        data.network,
      );

      setFormState({ kind: "preparing" });
      const tokenSchema = createTokenSchema(data, imageUrl);

      const serializedTransaction = await Api.createTokenTransaction(
        publicKey.toBase58(),
        tokenSchema,
        data.network,
      );

      const swapTransactionBuf = Buffer.from(serializedTransaction, "base64");
      const recoveredTransaction =
        VersionedTransaction.deserialize(swapTransactionBuf);

      const isStillValid = await connection.isBlockhashValid(
        recoveredTransaction.message.recentBlockhash,
      );

      if (!isStillValid) {
        throw new Error("Transaction expired, please retry");
      }

      setFormState({ kind: "paying" });
      const transactionId = await sendTransaction(
        recoveredTransaction,
        connection,
      );

      setFormState({ kind: "confirming" });

      // TODO: replace deprecated method
      const confirmation = await connection.confirmTransaction(transactionId);

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      const transaction = await connection.getTransaction(transactionId, {
        maxSupportedTransactionVersion: 0,
      });
      const assetId = transaction?.meta?.postTokenBalances?.[0]?.mint || "";

      setFormState({
        kind: "paid",
        transactionDetails: {
          transactionId,
          assetId,
        },
      });
    } catch (error) {
      console.error("Minting error:", error);
      setFormState({ kind: "error" });
    }
  };

  return {
    form,
    formState,
    isWalletConnected,
    transactionInProgress,
    handleCreateToken,
    resetForm,
  };
};
