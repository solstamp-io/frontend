import { Progress } from "@chakra-ui/react";
import { MintingState } from "./nft/schema";

type ProgressInfo = [number, string];

const MINTING_PROGRESS_MAP: Record<MintingState["kind"], ProgressInfo> = {
  initial: [0, ""],
  error: [0, ""],
  uploading: [50, "Uploading."],
  preparing: [70, "Preparing."],
  paying: [80, "Paying."],
  confirming: [90, "Confirming."],
  paid: [100, "Complete."],
};

export const UploadIndicator = ({
  mintingState,
}: {
  mintingState: MintingState;
}) => {
  const [progress, label] = MINTING_PROGRESS_MAP[mintingState.kind];

  return (
    <Progress.Root
      width="100%"
      striped={progress !== 100}
      animated
      value={progress}
    >
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
      <Progress.Label mt="2">{label}</Progress.Label>
    </Progress.Root>
  );
};
