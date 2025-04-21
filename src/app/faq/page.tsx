"use client";
import { Center } from "@chakra-ui/react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <Center>
      <AccordionRoot
        collapsible
        defaultValue={[]}
        variant="enclosed"
        maxWidth="2xl"
      >
        {items.map((item, index) => (
          <AccordionItem key={index} value={item.value}>
            <AccordionItemTrigger cursor="pointer">
              {item.title}
            </AccordionItemTrigger>
            <AccordionItemContent>{item.content}</AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </Center>
  );
}

const items = [
  {
    value: "a",
    title: "How much does it cost to create an NFT on solstamp?",
    content:
      "The cost is 0.05 SOL. There are no other fees imposed by solstamp. Your wallet may charge a small network processing fee (approximately 0.00001 SOL) when confirming this transaction. This is separate from the main transaction fee which is being covered for you.",
  },
  {
    value: "b",
    title: "How long does it take until I receive my NFT?",
    content:
      "Once you have paid and signed the transaction using your connected wallet, you will receive the NFT almost instantly in your wallet.",
  },
  {
    value: "c",
    title: "Will I be able to sell my NFT?",
    content:
      "Yes, the NFT will be entirely owned by you. You have all the rights to list it on any exchanges like Tensor.",
  },
  {
    value: "d",
    title: "How can I mint a NFT collection?",
    content:
      "solstamp currently doesn't offer creating collections. If you are interested in hiring me for a custom solution, please reach out at hi@philipkrueck.com",
  },
  {
    value: "e",
    title: "Which NFT token standard is used to create the NFT?",
    content:
      "solstamp uses the Metaplex Core token standard, the most widely adopted standard on Solana.",
  },
  {
    value: "f",
    title: "Where is the offchain metadata stored?",
    content:
      "solstamp uses Irys, a datachain designed for decentralized data storage.",
  },
  {
    value: "x",
    title: "Who is behind solstamp?",
    content:
      "Just a single engineer pouring all his passion and free time into this project.",
  },
  {
    value: "y",
    title: "Do you have any other question?",
    content:
      "Feel free to reach out to hi@philipkrueck.com, and I will personally respond as fast as possible.",
  },
];
