import { NetworkType } from "@/lib/api";
import { Select, createListCollection, Portal } from "@chakra-ui/react";
import { useEffect } from "react";
import { create } from "zustand";

interface NetworkStore {
  network: NetworkType;
  setNetwork: (network: NetworkType) => void;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  network: "mainnet",
  setNetwork: (network) => set({ network }),
}));

const frameworks = createListCollection({
  items: [
    {
      label: "Mainnet",
      value: "mainnet",
    },
    {
      label: "Devnet",
      value: "devnet",
    },
  ],
});

const SelectNetworkButton = () => {
  const { network, setNetwork } = useNetworkStore();

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("network", network);
    window.history.replaceState({}, "", url); // update actual URI
  }, [network]);

  return (
    <Select.Root
      collection={frameworks}
      size="md"
      width="150px"
      value={[network]}
      onValueChange={(d) => {
        setNetwork(d.value[0] as NetworkType);
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger cursor="pointer">
          <Select.ValueText placeholder="Select plan" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner width="150px">
          <Select.Content width="100%">
            {frameworks.items.map((framework) => (
              <Select.Item
                item={framework}
                key={framework.value}
                style={{ cursor: "pointer" }}
              >
                <Select.ItemText>{framework.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectNetworkButton;
