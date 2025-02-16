const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

export type NetworkType = "devnet" | "mainnet";

const uploadImage = async (
  publicKey: string,
  data: FormData,
  network: NetworkType = "devnet",
): Promise<string> => {
  const response = await fetch(
    `${backendUrl}/upload-image?network=${network}`,
    {
      method: "POST",
      mode: "cors",
      headers: { "public-key": publicKey },
      credentials: "omit",
      body: data,
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  const imageUrl = result.image_url;

  return imageUrl;
};

const createTokenTransaction = async (
  publicKey: string,
  createTokenSchema: unknown, // TODO: type this at some point
  network: NetworkType = "devnet",
): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL!}/create-token?network=${network}`,
    {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/json", "public-key": publicKey },
      credentials: "omit",
      body: JSON.stringify(createTokenSchema),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  const serializedTransaction = result.tx;

  return serializedTransaction;
};

const createNFTTransaction = async (
  publicKey: string,
  metadata: unknown, // TODO: type this at some point
  network: NetworkType = "devnet",
): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL!}/create-nft?network=${network}`,
    {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/json", "public-key": publicKey },
      credentials: "omit",
      body: JSON.stringify({
        metadata,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  const serializedTransaction = result.tx;

  return serializedTransaction;
};

export const Api = {
  uploadImage,
  createNFTTransaction,
  createTokenTransaction,
};
