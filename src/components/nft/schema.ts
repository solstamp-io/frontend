import { z } from "zod";

const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB
const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
] as const;

export const networkSchema = z.union([
  z.literal("mainnet"),
  z.literal("devnet"),
]);

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  file: z
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
  external_url: z
    .string()
    .url("Must be a valid URL if specified")
    .or(z.literal("")),
  attributes: z
    .array(
      z
        .object({
          trait_type: z.string().max(64),
          value: z.string().max(64),
        })
        .strict(),
    )
    .max(10),
  network: networkSchema,
});

export type NetworkType = z.infer<typeof networkSchema>;

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
