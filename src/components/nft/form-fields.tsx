import { useFieldArray, UseFormReturn } from "react-hook-form";
import { FormValues } from "./schema";
import { Field } from "@/components/ui/field";
import { FileUploadRoot } from "@/components/ui/file-upload";
import { useEffect, useState } from "react";
import {
  Image,
  Text,
  Input,
  Stack,
  Textarea,
  VStack,
  FileUpload as ChakraFileUpload,
  Icon,
  Button,
  Grid,
  GridItem,
  IconButton,
  Collapsible,
  Flex,
} from "@chakra-ui/react";
import { LuChevronDown, LuChevronUp, LuTrash, LuUpload } from "react-icons/lu";

interface FieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

export const FormFields = ({ form, disabled }: FieldProps) => (
  <Stack gap="4" w="full">
    <NameField form={form} disabled={disabled} />
    <DescriptionField form={form} disabled={disabled} />
    <ImageField form={form} disabled={disabled} />
    <OptionalFields form={form} disabled={disabled} />
  </Stack>
);

const NameField = ({ form, disabled }: FieldProps) => (
  <Field
    label="Name"
    invalid={!!form.formState.errors.name}
    errorText={form.formState.errors.name?.message ?? ""}
  >
    <Input
      {...form.register("name", { required: "Name is required" })}
      disabled={disabled}
      name="name"
      placeholder="Name of the NFT."
    />
  </Field>
);

const DescriptionField = ({ form, disabled }: FieldProps) => (
  <Field
    invalid={!!form.formState.errors.description}
    errorText={form.formState.errors.description?.message}
    label="Description"
  >
    <Textarea
      {...form.register("description", {
        required: "Description is required",
      })}
      disabled={disabled}
      name="description"
      variant="outline"
      placeholder="Description of the NFT."
    />
  </Field>
);

const ImageField = ({ form, disabled }: FieldProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const watchFile = form.watch("file");

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
      invalid={!!form.formState.errors.file}
      errorText={form.formState.errors.file?.message}
    >
      <FileUploadRoot
        invalid={!!form.formState.errors.file}
        disabled={disabled}
        alignItems="stretch"
        maxFiles={1}
        onFileChange={(x) => {
          const file = x.acceptedFiles[0];
          form.setValue("file", file, { shouldValidate: true });
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

const ExternalUrlField = ({ form, disabled }: FieldProps) => (
  <Field
    label="External URL"
    invalid={!!form.formState.errors.external_url}
    errorText={form.formState.errors.external_url?.message}
  >
    <Input
      {...form.register("external_url")}
      disabled={disabled}
      name="external_url"
      placeholder="(Optional) e.g. main site of NFT."
    />
  </Field>
);

const AttributesField = ({ form, disabled }: FieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  return (
    <Field
      label="Attributes"
      invalid={!!form.formState.errors.attributes}
      errorText={
        form.formState.errors.attributes &&
        "attributes" in form.formState.errors.attributes
          ? form.formState.errors.attributes.message
          : ""
      }
    >
      <VStack width="100%" align="flex-start">
        {fields.map((field, index) => (
          <Grid
            key={field.id}
            templateColumns="1fr 1fr auto"
            gap={2}
            alignItems="center"
          >
            <GridItem>
              <Input
                {...form.register(`attributes.${index}.trait_type` as const)}
                placeholder="Trait (e.g. Color)"
                disabled={disabled}
              />
            </GridItem>
            <GridItem>
              <Input
                {...form.register(`attributes.${index}.value` as const)}
                placeholder="Value (e.g. Blue)"
                disabled={disabled}
              />
            </GridItem>
            <GridItem>
              <IconButton
                aria-label="Remove attribute"
                size="sm"
                variant="ghost"
                colorScheme="red"
                disabled={disabled}
                onClick={() => remove(index)}
              >
                <LuTrash />
              </IconButton>
            </GridItem>
          </Grid>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => append({ trait_type: "", value: "" })}
          disabled={disabled}
        >
          Add Attribute
        </Button>
      </VStack>
    </Field>
  );
};

const OptionalFields = ({ form, disabled }: FieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (details: Collapsible.OpenChangeDetails) => {
    setIsOpen(details.open);
  };

  return (
    <Collapsible.Root
      my={4}
      disabled={disabled}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Collapsible.Trigger
        width="100%"
        textAlign="left"
        fontWeight="medium"
        aria-expanded={isOpen}
        aria-controls="collapsible-content"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <span>{isOpen ? "Optional Fields" : "Optional Fields"}</span>
          {isOpen ? <LuChevronUp /> : <LuChevronDown />}
        </Flex>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Stack gap="4" w="full" mt={4}>
          <ExternalUrlField form={form} disabled={disabled} />
          <AttributesField form={form} disabled={disabled} />
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
