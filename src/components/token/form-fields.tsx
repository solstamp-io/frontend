import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./schema";
import { Field } from "@/components/ui/field";
import { FileUploadRoot } from "@/components/ui/file-upload";
import { useEffect, useState } from "react";
import {
  Image,
  Input,
  Text,
  Stack,
  Textarea,
  VStack,
  FileUpload as ChakraFileUpload,
  Icon,
  NumberInput,
  HStack,
  CheckboxCard,
  CheckboxGroup,
  Flex,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

interface FieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

export const FormFields = ({ form, disabled }: FieldProps) => (
  <Stack gap="4" w="full">
    <HStack>
      <NameField form={form} disabled={disabled} />
      <SymbolField form={form} disabled={disabled} />
    </HStack>
    <HStack>
      <DecimalsField form={form} disabled={disabled} />
      <SupplyField form={form} disabled={disabled} />
    </HStack>
    <HStack align="top">
      <DescriptionField form={form} disabled={disabled} />
      <ImageField form={form} disabled={disabled} />
    </HStack>
    <RevokeAuthorities form={form} disabled={disabled} />
  </Stack>
);

const NameField = ({ form, disabled }: FieldProps) => (
  <Field
    label="Name"
    invalid={!!form.formState.errors.name}
    errorText={form.formState.errors.name?.message}
  >
    <Input
      {...form.register("name", { required: "Name is required" })}
      disabled={disabled}
      name="name"
      placeholder="Name of the Token."
    />
  </Field>
);

const DescriptionField = ({ form, disabled }: FieldProps) => (
  <Field
    invalid={!!form.formState.errors.description}
    errorText={form.formState.errors.description?.message}
    label="Description"
    minHeight="100%"
  >
    <Textarea
      {...form.register("description", {
        required: "Description is required",
      })}
      disabled={disabled}
      name="description"
      variant="outline"
      placeholder="Description of the Token."
      height="100%"
    />
  </Field>
);

const SymbolField = ({ form, disabled }: FieldProps) => (
  <Field
    invalid={!!form.formState.errors.symbol}
    errorText={form.formState.errors.symbol?.message}
    label="Symbol"
  >
    <Input
      {...form.register("symbol", { required: "Symbol is required" })}
      disabled={disabled}
      name="symbol"
      placeholder="Symbol of the Token."
    />
  </Field>
);

const DecimalsField = ({ form, disabled }: FieldProps) => (
  <Field
    invalid={!!form.formState.errors.decimals}
    errorText={form.formState.errors.decimals?.message}
    label="Decimals"
  >
    <NumberInput.Root defaultValue="6" min={1} max={9} width="100%">
      <NumberInput.Control />
      <NumberInput.Input
        {...form.register("decimals", {
          required: "Decimals is required",
          valueAsNumber: true,
        })}
        disabled={disabled}
        name="decimals"
        placeholder="Decimals of the Token."
      />
    </NumberInput.Root>
  </Field>
);

const SupplyField = ({ form, disabled }: FieldProps) => (
  <Field
    invalid={!!form.formState.errors.supply}
    errorText={form.formState.errors.supply?.message}
    label="Supply"
  >
    <NumberInput.Root
      defaultValue="10000000"
      min={1}
      max={Number.MAX_SAFE_INTEGER}
      step={1000}
      width="100%"
    >
      <NumberInput.Control />
      <NumberInput.Input
        {...form.register("supply", {
          required: "Supply is required",
          valueAsNumber: true,
        })}
        disabled={disabled}
        name="supply"
        placeholder="Supply of the Token."
      />
    </NumberInput.Root>
  </Field>
);

const ImageField = ({ form, disabled }: FieldProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const watchFile = form.watch("image");

  useEffect(() => {
    if (watchFile) {
      const objectUrl = URL.createObjectURL(watchFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [watchFile]);

  return (
    <Field
      label="Image"
      invalid={!!form.formState.errors.image}
      errorText={form.formState.errors.image?.message}
    >
      <FileUploadRoot
        invalid={!!form.formState.errors.image}
        disabled={disabled}
        alignItems="stretch"
        maxFiles={1}
        onFileChange={(x) => {
          const file = x.acceptedFiles[0];
          form.setValue("image", file, { shouldValidate: true });
        }}
      >
        <ChakraFileUpload.Dropzone aspectRatio={1} overflow="hidden">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <VStack>
              <Icon fontSize="xl" color="fg.muted">
                <LuUpload />
              </Icon>
              <ChakraFileUpload.DropzoneContent>
                <div>Add your image here.</div>
                {<Text color="fg.muted">An image file up to 30MB</Text>}
              </ChakraFileUpload.DropzoneContent>
            </VStack>
          )}
        </ChakraFileUpload.Dropzone>
      </FileUploadRoot>
    </Field>
  );
};

const RevokeMintAuthorityField = ({ form, disabled }: FieldProps) => {
  const mintAuthorityValue = form.watch("revokeMintAuthority");

  return (
    <Field
      invalid={!!form.formState.errors.revokeMintAuthority}
      errorText={form.formState.errors.revokeMintAuthority?.message}
      disabled={disabled}
    >
      <CheckboxCard.Root
        key="mint"
        disabled={disabled}
        checked={mintAuthorityValue}
        onChange={(e) => {
          const isChecked = (e.target as HTMLInputElement).checked;
          form.setValue("revokeMintAuthority", isChecked, {
            shouldValidate: true,
          });
        }}
      >
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Mint Authority</CheckboxCard.Label>
            <CheckboxCard.Description>
              Revoking this authority permanently removes the ability to create
              additional tokens in the future.
            </CheckboxCard.Description>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </Field>
  );
};

const RevokeUpdateAuthorityField = ({ form, disabled }: FieldProps) => {
  const updateAuthorityValue = form.watch("revokeUpdateAuthority");

  return (
    <Field
      invalid={!!form.formState.errors.revokeUpdateAuthority}
      errorText={form.formState.errors.revokeUpdateAuthority?.message}
      disabled={disabled}
    >
      <CheckboxCard.Root
        key="update"
        disabled={disabled}
        checked={updateAuthorityValue}
        onChange={(e) => {
          const isChecked = (e.target as HTMLInputElement).checked;
          form.setValue("revokeUpdateAuthority", isChecked, {
            shouldValidate: true,
          });
        }}
      >
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Update Authority</CheckboxCard.Label>
            <CheckboxCard.Description>
              Revoking this authority permanently removes the ability to modify
              any token metadata.
            </CheckboxCard.Description>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </Field>
  );
};

const RevokeFreezeAuthorityField = ({ form, disabled }: FieldProps) => {
  const freezeAuthorityValue = form.watch("revokeFreezeAuthority");

  return (
    <Field
      invalid={!!form.formState.errors.revokeFreezeAuthority}
      errorText={form.formState.errors.revokeFreezeAuthority?.message}
      disabled={disabled}
    >
      <CheckboxCard.Root
        key="freeze"
        disabled={disabled}
        checked={freezeAuthorityValue}
        onChange={(e) => {
          const isChecked = (e.target as HTMLInputElement).checked;
          form.setValue("revokeFreezeAuthority", isChecked, {
            shouldValidate: true,
          });
        }}
      >
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Freeze Authority</CheckboxCard.Label>
            <CheckboxCard.Description>
              Revoking this authority permanently removes the ability to freeze
              any holder&apos;s tokens.
            </CheckboxCard.Description>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </Field>
  );
};

const RevokeAuthorities = ({ form, disabled }: FieldProps) => {
  return (
    <CheckboxGroup defaultValue={["next"]}>
      <Text textStyle="sm" fontWeight="medium">
        Revoke Authorities
      </Text>
      <Flex gap="2">
        <RevokeMintAuthorityField form={form} disabled={disabled} />
        <RevokeUpdateAuthorityField form={form} disabled={disabled} />
        <RevokeFreezeAuthorityField form={form} disabled={disabled} />
      </Flex>
    </CheckboxGroup>
  );
};
