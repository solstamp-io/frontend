import { z } from "zod";
import { networkSchema } from "../nft/schema";

const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
] as const;

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(32, "Maximum length is 32 characters"),
  symbol: z.string().min(1, "Symbol is required"),
  decimals: z
    .number()
    .min(1, "Must have at least one decimal")
    .max(9, "Can have a max of 9 decimals"),
  supply: z
    .number()
    .min(1, "Must have a minimum supply of 1")
    .max(
      Number.MAX_SAFE_INTEGER,
      `Can't have more than ${Number.MAX_SAFE_INTEGER} tokens`,
    ), // actual max is: 2n ** 64n - 1n
  description: z.string().min(1, "Description is required"),
  // .max(8, "Maximum length is 8 characters"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than 30MB`,
    )
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(
          file.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
        ),
      "File must be a supported image format (.png, .jpg, .jpeg, .gif, or .webp)",
    ),
  revokeMintAuthority: z.boolean().default(false),
  revokeUpdateAuthority: z.boolean().default(false),
  revokeFreezeAuthority: z.boolean().default(false),
  network: networkSchema,
});

export type FormValues = z.infer<typeof formSchema>;

export type MintingState =
  | { kind: "initial" }
  | { kind: "uploading" }
  | { kind: "preparing" }
  | { kind: "paying" }
  | { kind: "confirming" }
  | {
      kind: "paid";
      transactionDetails: { assetId: string; transactionId: string };
    }
  | { kind: "error" };
