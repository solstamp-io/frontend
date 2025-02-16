"use client";
import { Center } from "@chakra-ui/react";
import { CreateTokenForm } from "@/components/token/create-token-form";

export default function Home() {
  return (
    <Center>
      <CreateTokenForm />
    </Center>
  );
}
